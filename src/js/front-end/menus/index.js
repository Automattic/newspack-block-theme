/* globals newspackScreenReaderText */

// Prefix for class name to be added to document.body when any menu is open.
const MENU_OPEN_CLASS_NAME = 'menu-open--';

// Constants for commonly used selectors.
const SELECTORS = {
	FOCUSABLE: 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe, object, embed, [contenteditable="true"]',
	CLOSE_BUTTON: '.newspack-icon-close',
	SCREEN_READER_LINK: 'a.screen-reader-text'
};

// Store original positions of menus using WeakMap for better garbage collection.
const menuPositions = new WeakMap();

// Store focus trap cleanup functions.
const focusTrapCleanups = new WeakMap();

// Store the last focused element before opening a menu
let lastFocusedElement;

// Store the currently active focus trap element.
let activeFocusTrapElement = null;

/**
 * Creates an overlay manager for handling menu overlays.
 *
 * @return {Object} Object with show, hide, and cleanup methods for managing overlay visibility.
 */
const createOverlayManager = () => {
	let overlay = null;
	let overlayTimeout = null;
	let handleCloseRef = null;

	// Creates and returns the overlay element.
	const create = () => {
		if ( overlay ) {
			return overlay;
		}

		overlay = document.createElement( 'div' );
		overlay.className = 'overlay-mask';
		overlay.style.display = 'none';
		overlay.style.opacity = '0';

		// Handles overlay click and escape key to close menus.
		const handleClose = ( event ) => {
			if ( event.type === 'keydown' && event.key !== 'Escape' ) {
				return;
			}
			if ( anyMenuIsOpen() ) {
				closeAllMenus();
			}
		};

		overlay.addEventListener( 'click', handleClose );

		// Add document listener for cleanup.
		document.addEventListener( 'keydown', handleClose );
		handleCloseRef = handleClose;

		document.body.appendChild( overlay );

		return overlay;
	};

	// Shows the overlay with fade-in animation.
	const show = ( duration = 500 ) => {
		const element = create();
		element.style.transition = `opacity ${ duration }ms ease-in-out`;
		element.style.display = 'block';
		void element.offsetHeight; // Force reflow.
		requestAnimationFrame( () => {
			element.style.opacity = '1';
		} );
	};

	// Hides the overlay with fade-out animation.
	const hide = ( duration = 500 ) => {
		if ( ! overlay ) {
			return;
		}

		overlay.style.opacity = '0';
		clearTimeout( overlayTimeout );
		overlayTimeout = setTimeout( () => {
			if ( overlay ) {
				overlay.style.display = 'none';
				overlay.remove();
				overlay = null;
			}
		}, duration );
	};

	// Cleanup document event listeners.
	const cleanup = () => {
		if ( handleCloseRef ) {
			document.removeEventListener( 'keydown', handleCloseRef );
			handleCloseRef = null;
		}

		if ( overlay ) {
			overlay.remove();
			overlay = null;
		}
	};

	return { show, hide, cleanup };
};

const overlayManager = createOverlayManager();

/**
 * Helper function to get visible focusable elements within a container.
 *
 * @param {HTMLElement} container The container element to search within.
 * @return {Array} Array of visible focusable elements.
 */
const getVisibleFocusableElements = ( container ) => {
	const focusableElements = container.querySelectorAll( SELECTORS.FOCUSABLE );
	return Array.from( focusableElements ).filter( el => {
		const rect = el.getBoundingClientRect();
		const style = window.getComputedStyle( el );
		return rect.width > 0 && rect.height > 0 &&
			   style.visibility !== 'hidden' &&
			   style.display !== 'none' &&
			   ! el.hasAttribute( 'hidden' );
	} );
};

/**
 * Helper function to remove classes that start with a prefix.
 *
 * @param {HTMLElement} element The element to remove classes from.
 * @param {string}      prefix  The class prefix to match.
 */
const removeClassesWithPrefix = ( element, prefix ) => {
	const classesToRemove = Array.from( element.classList ).filter( className =>
		className.startsWith( prefix )
	);
	classesToRemove.forEach( className => element.classList.remove( className ) );
};

/**
 * Global focus monitor to catch escaping focus.
 *
 * @return {Object} Object with startMonitoring and stopMonitoring methods.
 */
const createGlobalFocusMonitor = () => {
	let monitorInterval = null;

	const startMonitoring = () => {
		if ( monitorInterval ) {
			return;
		}

		monitorInterval = setInterval( () => {
			if ( ! anyMenuIsOpen() || ! activeFocusTrapElement ) {
				return;
			}

			const activeElement = activeFocusTrapElement.ownerDocument.activeElement;

			// Check if focus has escaped to browser chrome or outside the menu.
			if ( ! activeFocusTrapElement.contains( activeElement ) &&
				 activeElement !== document.body &&
				 activeElement !== document.documentElement ) {

				// Focus has escaped, bring it back.
				const visibleFocusableElements = getVisibleFocusableElements( activeFocusTrapElement );
				const firstFocusable = visibleFocusableElements[ 0 ];
				if ( firstFocusable ) {
					firstFocusable.focus();
				}
			}
		}, 50 );
	};

	const stopMonitoring = () => {
		if ( monitorInterval ) {
			clearInterval( monitorInterval );
			monitorInterval = null;
		}
	};

	return { startMonitoring, stopMonitoring };
};

const globalFocusMonitor = createGlobalFocusMonitor();

/**
 * Finds elements with menu-related classes.
 *
 * @param {string} selector The selector to use.
 * @return {NodeList} Collection of elements matching the selector pattern.
 */
const findMenuElements = ( selector ) => {
	return document.querySelectorAll( `[class*=${ selector }]` );
};

/**
 * Checks if any menu is open.
 *
 * @return {boolean} True if any menu is currently open, false otherwise.
 */
const anyMenuIsOpen = () => {
	return document.body.className.includes( MENU_OPEN_CLASS_NAME );
};

/**
 * Creates a focus trap for better accessibility.
 *
 * @param {HTMLElement} element The element to trap focus in.
 * @return {Function} Cleanup function to remove the focus trap.
 */
export const createFocusTrap = ( element ) => {
	// Clean up any existing focus trap first.
	const existingCleanup = focusTrapCleanups.get( element );
	if ( existingCleanup ) {
		existingCleanup();
	}

	const focusableElements = element.querySelectorAll( SELECTORS.FOCUSABLE );
	const firstFocusable = focusableElements[ 0 ];
	const lastFocusable = focusableElements[ focusableElements.length - 1 ];

	// Only create focus trap if there are focusable elements.
	if ( ! firstFocusable || ! lastFocusable ) {
		return () => {};
	}

	// Handles tab key navigation to trap focus within the element.
	const handleKeyDown = ( e ) => {
		if ( e.key !== 'Tab' ) {
			return;
		}

		// Only handle tab events when a menu is open.
		if ( ! anyMenuIsOpen() ) {
			return;
		}

		// Refresh focusable elements in case the DOM has changed.
		const visibleFocusableElements = getVisibleFocusableElements( element );
		const currentFirstFocusable = visibleFocusableElements[ 0 ];
		const currentLastFocusable = visibleFocusableElements[ visibleFocusableElements.length - 1 ];

		// Ensure we have valid focusable elements.
		if ( ! currentFirstFocusable || ! currentLastFocusable ) {
			e.preventDefault();
			return;
		}

		// Check if focus is currently within the menu element.
		const activeElement = element.ownerDocument.activeElement;
		if ( ! element.contains( activeElement ) ) {
			// Focus escaped the menu, bring it back.
			e.preventDefault();
			currentFirstFocusable.focus();
			return;
		}

		// Handle tabbing within the menu.
		if ( e.shiftKey ) {
			// Shift+Tab (backwards).
			if ( activeElement === currentFirstFocusable ) {
				e.preventDefault();
				currentLastFocusable.focus();
			}
		} else if ( activeElement === currentLastFocusable ) {
			// Tab (forwards).
			e.preventDefault();
			currentFirstFocusable.focus();
		}
	};

	// Add event listener to document to catch all tab events with capture.
	document.addEventListener( 'keydown', handleKeyDown, true );

	// Also add a fallback listener on the element itself.
	element.addEventListener( 'keydown', handleKeyDown );

	const cleanup = () => {
		document.removeEventListener( 'keydown', handleKeyDown, true );
		element.removeEventListener( 'keydown', handleKeyDown );
		focusTrapCleanups.delete( element );

		// Clear active focus trap if this was it.
		if ( activeFocusTrapElement === element ) {
			activeFocusTrapElement = null;
		}
	};

	// Store cleanup function.
	focusTrapCleanups.set( element, cleanup );

	// Set this as the active focus trap.
	activeFocusTrapElement = element;

	// Start global focus monitoring.
	globalFocusMonitor.startMonitoring();

	return cleanup;
};

/**
 * Adds accessibility features to the menu.
 *
 * @param {HTMLElement} menuElement The menu element to enhance.
 * @param {string}      menuType    The type of menu.
 */
const enhanceMenuAccessibility = ( menuElement, menuType = '' ) => {
	// Store the last focused element.
	lastFocusedElement = menuElement.ownerDocument.activeElement;

	// Add screen reader link if there's no close button.
	const closeButton = menuElement.querySelector( SELECTORS.CLOSE_BUTTON );
	const screenReaderLink = menuElement.querySelector( SELECTORS.SCREEN_READER_LINK );

	if ( ! closeButton && ! screenReaderLink ) {
		const closeText = menuType === 'search-menu' ? newspackScreenReaderText.close_search : newspackScreenReaderText.close_menu;
		const newScreenReaderLink = document.createElement( 'a' );
		newScreenReaderLink.href = '#';
		newScreenReaderLink.className = 'screen-reader-text';
		newScreenReaderLink.textContent = closeText;
		newScreenReaderLink.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			closeAllMenus();
		} );
		menuElement.insertBefore( newScreenReaderLink, menuElement.firstChild );
	}

	// Create focus trap
	createFocusTrap( menuElement );

	// Focus first focusable element
	const firstFocusable = menuElement.querySelector( SELECTORS.FOCUSABLE );
	if ( firstFocusable ) {
		firstFocusable.focus();
	}
};

/**
 * Gets the close button element for a menu.
 *
 * @param {string}      menuType        The type of menu (e.g., 'mobile-menu').
 * @param {HTMLElement} contentsElement The menu contents element.
 * @return {HTMLElement|null} The close button element or null if not found.
 */
const getMenuCloseButton = ( menuType, contentsElement ) => {
	if ( ! contentsElement ) {
		return null;
	}

	const selector = `.${ menuType }__toggle a`;
	return contentsElement.querySelector( selector );
};

/**
 * Moves menu to body root when opened.
 *
 * @param {HTMLElement} menuElement The menu element to move.
 * @param {string}      menuType    The type of menu.
 */
const moveMenuToRoot = ( menuElement, menuType ) => {
	if ( ! menuElement || menuPositions.has( menuElement ) ) {
		return;
	}

	// Store original position.
	menuPositions.set( menuElement, {
		parent: menuElement.parentNode,
		nextSibling: menuElement.nextSibling
	} );

	// Move to body.
	document.body.appendChild( menuElement );

	// Enhance accessibility.
	enhanceMenuAccessibility( menuElement, menuType );
};

/**
 * Restores menu to original position when closed.
 *
 * @param {HTMLElement} menuElement The menu element to restore.
 */
const restoreMenuPosition = ( menuElement ) => {
	if ( ! menuElement || ! menuPositions.has( menuElement ) ) {
		return;
	}

	// Clean up focus trap.
	const cleanup = focusTrapCleanups.get( menuElement );
	if ( cleanup ) {
		cleanup();
	}

	const originalPosition = menuPositions.get( menuElement );

	if ( originalPosition.nextSibling ) {
		originalPosition.parent.insertBefore( menuElement, originalPosition.nextSibling );
	} else {
		originalPosition.parent.appendChild( menuElement );
	}

	menuPositions.delete( menuElement );

	// Restore focus.
	if ( lastFocusedElement ) {
		lastFocusedElement.focus();
	}
};

/**
 * Closes all open menus.
 */
export const closeAllMenus = () => {


	// Stop global focus monitoring.
	globalFocusMonitor.stopMonitoring();

	// Remove menu-open classes from elements and body.
	const openMenuElements = findMenuElements( MENU_OPEN_CLASS_NAME );
	openMenuElements.forEach( element => {
		removeClassesWithPrefix( element, MENU_OPEN_CLASS_NAME );
	} );
	removeClassesWithPrefix( document.body, MENU_OPEN_CLASS_NAME );

	// Restore menu positions.
	findMenuElements( '__contents' ).forEach( element => {
		if ( element.parentNode === document.body && menuPositions.has( element ) ) {
			restoreMenuPosition( element );
		}
	} );

	overlayManager.hide(); // Uses default duration since this closes all menus
};

/**
 * Validates menu configuration object.
 *
 * @param {Object} config The menu configuration to validate.
 * @return {boolean} True if configuration is valid, false otherwise.
 */
const validateMenuConfig = ( config ) => {
	const required = [ 'menuType', 'containerSelector', 'toggleSelector', 'contentsSelector' ];
	return required.every( key => config[ key ] );
};

/**
 * Creates a menu factory for consistent menu behavior.
 *
 * @param {Object}   config                          Menu configuration object.
 * @param {string}   config.menuType                 The type of menu (e.g., 'mobile-menu')
 * @param {string}   config.containerSelector        CSS selector for the menu container
 * @param {string}   config.toggleSelector           CSS selector for the menu toggle buttons
 * @param {string}   config.contentsSelector         CSS selector for the menu contents
 * @param {number}   config.overlayAnimationDuration Animation duration for overlay in milliseconds
 * @param {Function} config.onOpen                   Optional callback function when menu opens (receives contents, container, toggles). If not provided, defaults to focusing the close button.
 * @param {Function} config.onClose                  Callback function when menu closes (receives contents, container, toggles)
 * @param {Function} config.specialHandling          Function for menu-specific setup
 * @return {Object} Object with init method for setting up the menu behavior.
 */
export const createMenu = ( config ) => {
	// Validate configuration.
	if ( ! validateMenuConfig( config ) ) {
		return { init: () => {} }; // Return no-op object.
	}

	const {
		menuType,
		containerSelector,
		toggleSelector,
		contentsSelector,
		overlayAnimationDuration = 500,
		onOpen = null,
		onClose = () => {},
		specialHandling = () => {}
	} = config;

	const openClassName = MENU_OPEN_CLASS_NAME + menuType;

	return {
		init: () => {
			const body = document.body;
			const container = document.querySelector( containerSelector );
			const toggles = document.querySelectorAll( toggleSelector );
			const contents = document.querySelector( contentsSelector );

			if ( ! container || ! toggles.length || ! contents ) {
				return;
			}

			// Apply any special handling (like Jetpack search).
			const shouldContinue = specialHandling( container, toggles, contents );

			// If specialHandling returns false, don't set up the menu.
			if ( shouldContinue === false ) {
				return;
			}

			// Toggles the menu open/closed state.
			const toggleMenu = ( event ) => {
				event.preventDefault();
				if ( body.classList.contains( openClassName ) ) {
					closeAllMenus();
					onClose( contents, container, toggles );
				} else {
					openMenu();
				}
			};

			// Opens the menu and applies necessary styling.
			const openMenu = () => {
				body.classList.add( openClassName );
				contents.classList.add( openClassName );
				moveMenuToRoot( contents, menuType );
				overlayManager.show( overlayAnimationDuration );

				// Handle onOpen callback or default behavior.
				if ( onOpen ) {
					onOpen( contents, container, toggles );
				} else {
					// Default behavior: focus the close button.
					const closeButton = getMenuCloseButton( menuType, contents );
					if ( closeButton ) {
						closeButton.focus();
					}
				}
			};

			toggles.forEach( toggle => {
				toggle.addEventListener( 'click', toggleMenu, false );
			} );
		}
	};
};
