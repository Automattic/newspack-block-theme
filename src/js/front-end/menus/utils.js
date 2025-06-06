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
 * Does a string contain another string?
 *
 * @param {string} haystack The string to search.
 * @param {string} needle   The string to search for.
 * @return {boolean} True if the needle is found in the haystack.
 */
export const contains = ( haystack, needle ) => {
	return -1 < haystack.indexOf( needle );
};

/**
 * @description Checks if any menu is open. Can be moved to utils if other menus are added.
 */
export const anyMenuIsOpen = () => {
	const openClassNames = document.body.classList;

	for ( let i = 0; i < openClassNames.length; i++ ) {
		if ( contains( openClassNames[ i ], MENU_OPEN_CLASS_NAME ) ) {
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
 * @description Closes all open menus.
 */
export const closeAllMenus = () => {
	// Find all elements with class names containing MENU_OPEN_CLASS_NAME.
	const openMenuElements = document.querySelectorAll( `[class*=${ MENU_OPEN_CLASS_NAME }]` );

	// Store the last opened menu type before closing
	let lastOpenedMenu = '';
	openMenuElements.forEach( element => {
		const menuClassName = Array.from( element.classList ).find( className =>
			className.startsWith( MENU_OPEN_CLASS_NAME )
		);
		if ( menuClassName ) {
			lastOpenedMenu = menuClassName.replace( MENU_OPEN_CLASS_NAME, '' );
		}
		element.classList.remove( menuClassName );
	} );

	// Find all menu contents elements that have been moved to the body
	const menuContents = document.querySelectorAll( '[class*="__contents"]' );
	menuContents.forEach( element => {
		if ( element.parentNode === document.body && menuPositions.has( element ) ) {
			restoreMenuPosition( element );
		}
	} );

	// Remove overlay.
	removeOverlay();

	// Focus on the appropriate button based on which menu was closed
	if ( lastOpenedMenu ) {
		// Find the open button by looking for the toggle element that doesn't have the close icon class
		const openButton = document.querySelector( `.${ lastOpenedMenu }__toggle:not(.newspack-icon-close) a` );
		if ( openButton ) {
			openButton.focus();
		}
	}
};

/**
 * @description Creates semi-transparent overlay behind menus.
 */
export const createOverlay = () => {
	if ( ! overlay ) {
		overlay = document.createElement( 'div' );
		overlay.className = 'overlay-mask';

		// Add listener to the menu overlay, so it can be closed on click.
		overlay.addEventListener( 'click', closeAllMenus, false );
	}
	document.body.appendChild( overlay );
};

/**
 * @description Removes semi-transparent overlay behind menus.
 */
export const removeOverlay = () => {
	if ( overlay && ! anyMenuIsOpen() ) {
		document.body.removeChild( overlay );
	}
};
