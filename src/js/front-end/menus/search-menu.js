/* globals newspackTranslations */

/**
 * Internal dependencies.
 */
import { domReady } from '../utils'; // Global utils.
import { MENU_OPEN_CLASS_NAME } from './consts'; // Menu constants.

// A class name to append to the body element when the mobile menu is open.
const openClassName = MENU_OPEN_CLASS_NAME + 'search-menu';

domReady( function () {
	/**
	 * Mobile Menu toggle and overlay JavaScript.
	 */
	const body = document.body,
		searchContain = document.querySelector( '.search-menu' ),
		searchToggle = document.querySelectorAll( '.search-menu-toggle' ),
		searchContents = document.querySelector( '.search-contents' );

	if ( ! searchContain || ! searchToggle.length || ! searchContents ) {
		return;
	}

	const searchOpenButton = searchContain.querySelector( '.search-menu-toggle a' );

	// If Jetpack Instant Search is enabled, add a CSS class to the search toggle and bail.
	// See: https://jetpack.com/support/search/customizing-jetpack-search/#add-search-button
	if ( newspackTranslations.jetpack_instant_search ) {
		searchOpenButton.classList.add( 'jetpack-search-filter__link' );
		return;
	}

	/**
	 * @description Fires either the opening or closing functions for a menu.
	 * @param {event} event Click event.
	 */
	const searchMenuToggle = event => {
		event.preventDefault();

		if ( body.classList.contains( openClassName ) ) {
			closeMenu();
		} else {
			openMenu();
		}
	};

	/**
	 * @description Opens specifed slide-out menu.
	 */
	const openMenu = () => {
		body.classList.add( openClassName );
		searchOpenButton.parentNode.classList.add( 'newspack-icon-close' );
		searchOpenButton.parentNode.classList.remove( 'newspack-icon-search' );
	};

	/**
	 * @description Closes specifed slide-out menu.
	 */
	const closeMenu = () => {
		body.classList.remove( openClassName );
		searchOpenButton.parentNode.classList.add( 'newspack-icon-search' );
		searchOpenButton.parentNode.classList.remove( 'newspack-icon-close' );
	};

	// Find each mobile toggle and attaches an event listener.
	for ( let i = 0; i < searchToggle.length; i++ ) {
		searchToggle[ i ].addEventListener( 'click', searchMenuToggle, false );
	}
} );
