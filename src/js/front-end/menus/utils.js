/**
 * Util functions for menu JS.
 */

/**
 * Internal dependencies.
 */
import { MENU_OPEN_CLASS_NAME } from './consts';

// Cached overlay DOM element to be shared amongst all menus.
let overlay;

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
 * @description Closes all open menus.
 */
export const closeAllMenus = () => {
	const openClassNames = document.body.classList;

	for ( let i = 0; i < openClassNames.length; i++ ) {
		if ( contains( openClassNames[ i ], MENU_OPEN_CLASS_NAME ) ) {
			document.body.classList.remove( openClassNames[ i ] );
		}
	}

	removeOverlay();

	// Remove focus from any elements inside open menus. Note that the disabled ESLint rule applies only to React elements: https://github.com/WordPress/gutenberg/pull/26810.
	document.activeElement.blur(); // eslint-disable-line @wordpress/no-global-active-element
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
