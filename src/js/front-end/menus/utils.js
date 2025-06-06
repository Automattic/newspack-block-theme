/**
 * Util functions for menu JS.
 */

/**
 * Internal dependencies.
 */
import { MENU_OPEN_CLASS_NAME } from './consts';

// Cached overlay DOM element to be shared amongst all menus.
let overlay;

// Store original positions of menus
const menuPositions = new Map();

/**
 * @description Extracts menu type from a class name
 * @param {string} className The class name to process
 * @return {string} The menu type without the open class prefix
 */
const getMenuTypeFromClassName = ( className ) => {
	return className.replace( MENU_OPEN_CLASS_NAME, '' );
};

/**
 * @description Finds elements with menu-related classes
 * @param {string} selector The selector to use
 * @return {NodeList} The matching elements
 */
const findMenuElements = ( selector ) => {
	return document.querySelectorAll( `[class*=${ selector }]` );
};

/**
 * @description Checks if any menu is open. Can be moved to utils if other menus are added.
 */
export const anyMenuIsOpen = () => {
	const openClassNames = document.body.classList;

	for ( let i = 0; i < openClassNames.length; i++ ) {
		if ( openClassNames[ i ].includes( MENU_OPEN_CLASS_NAME ) ) {
			return true;
		}
	}

	return false;
};

/**
 * @description Moves menu to body root when opened
 * @param {HTMLElement} menuElement The menu element to move
 */
export const moveMenuToRoot = ( menuElement ) => {
	if ( ! menuElement || menuPositions.has( menuElement ) ) {
		return;
	}

	// Store original position
	menuPositions.set( menuElement, {
		parent: menuElement.parentNode,
		nextSibling: menuElement.nextSibling
	} );

	// Move to body
	document.body.appendChild( menuElement );
};

/**
 * @description Restores menu to original position when closed
 * @param {HTMLElement} menuElement The menu element to restore
 */
export const restoreMenuPosition = ( menuElement ) => {
	if ( ! menuElement || ! menuPositions.has( menuElement ) ) {
		return;
	}

	const originalPosition = menuPositions.get( menuElement );

	if ( originalPosition.nextSibling ) {
		originalPosition.parent.insertBefore( menuElement, originalPosition.nextSibling );
	} else {
		originalPosition.parent.appendChild( menuElement );
	}

	menuPositions.delete( menuElement );
};

/**
 * @description Gets the animation duration based on menu type
 * @return {string} The animation duration
 */
const getAnimationDuration = () => {
	const openMenuType = Array.from( document.body.classList )
		.find( className => className.startsWith( MENU_OPEN_CLASS_NAME ) )
		?.replace( MENU_OPEN_CLASS_NAME, '' );

	return openMenuType === 'search-menu' ? '250ms' : '500ms';
};

/**
 * @description Closes all open menus.
 */
export const closeAllMenus = () => {
	const openMenuElements = findMenuElements( MENU_OPEN_CLASS_NAME );
	let lastOpenedMenu = '';

	openMenuElements.forEach( element => {
		const menuClassName = Array.from( element.classList )
			.find( className => className.startsWith( MENU_OPEN_CLASS_NAME ) );
		if ( menuClassName ) {
			lastOpenedMenu = getMenuTypeFromClassName( menuClassName );
		}
		element.classList.remove( menuClassName );
	} );

	findMenuElements( '__contents' ).forEach( element => {
		if ( element.parentNode === document.body && menuPositions.has( element ) ) {
			restoreMenuPosition( element );
		}
	} );

	removeOverlay();

	if ( lastOpenedMenu ) {
		const openButton = document.querySelector(
			`.${ lastOpenedMenu }__toggle:not(.newspack-icon-close) a`
		);
		openButton?.focus();
	}
};

/**
 * @description Creates or updates the overlay element
 * @return {HTMLElement} The overlay element
 */
const getOverlay = () => {
	// Remove existing overlay if it exists
	if ( overlay && overlay.parentNode ) {
		document.body.removeChild( overlay );
	}

	// Create new overlay
	overlay = document.createElement( 'div' );
	overlay.className = 'overlay-mask';
	overlay.style.display = 'none';
	overlay.style.opacity = '0';
	overlay.addEventListener( 'click', closeAllMenus, false );
	document.body.appendChild( overlay );

	return overlay;
};

/**
 * @description Applies fade animation to the overlay
 * @param {string}   targetOpacity The target opacity value
 * @param {Function} onComplete    Optional callback when animation completes
 */
const fadeOverlay = ( targetOpacity, onComplete ) => {
	const overlayElement = getOverlay();
	const duration = getAnimationDuration();

	overlayElement.style.transition = `opacity ${ duration } ease-in-out`;
	overlayElement.style.display = 'block';
	void overlayElement.offsetHeight; // Force reflow
	requestAnimationFrame( () => {
		overlayElement.style.opacity = targetOpacity;
		if ( onComplete ) {
			overlayElement.addEventListener( 'transitionend', onComplete, { once: true } );
		}
	} );
};

/**
 * @description Creates semi-transparent overlay behind menus.
 */
export const createOverlay = () => {
	fadeOverlay( '1' );
};

/**
 * @description Removes semi-transparent overlay behind menus.
 */
export const removeOverlay = () => {
	if ( ! overlay ) {
		return;
	}

	// Always remove the overlay when no menus are open
	if ( ! anyMenuIsOpen() ) {
		const duration = getAnimationDuration();
		overlay.style.transition = `opacity ${ duration } ease-in-out`;
		overlay.style.opacity = '0';

		overlay.addEventListener( 'transitionend', () => {
			if ( overlay && overlay.parentNode ) {
				overlay.style.display = 'none';
				document.body.removeChild( overlay );
				overlay = null;
			}
		}, { once: true } );
	}
};
