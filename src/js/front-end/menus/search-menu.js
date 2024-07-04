/* globals newspackScreenReaderText */

/**
 * Internal dependencies.
 */
import { domReady } from '../utils'; // Global utils.
import { MENU_OPEN_CLASS_NAME } from './consts'; // Menu constants.
import { createOverlay, removeOverlay } from './utils'; // Menu utils.

// A class name to append to the body element when the search is open.
const openClassName = MENU_OPEN_CLASS_NAME + 'search-menu';

domReady( function () {
	/**
	 * Search toggle and overlay JavaScript.
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
	if ( newspackScreenReaderText.jetpack_instant_search ) {
		searchOpenButton.classList.add( 'jetpack-search-filter__link' );
		return;
	}

	/**
	 * @description Fires either the opening or closing functions for the search.
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
	 * @description Opens specifed search.
	 */
	const openMenu = () => {
		body.classList.add( openClassName );
		searchOpenButton.innerHTML = '<span>' + newspackScreenReaderText.close_search + '</span>';
		searchContents.querySelector( 'input[type="search"]' ).focus();
		createOverlay();
	};

	/**
	 * @description Closes specifed search.
	 */
	const closeMenu = () => {
		if ( ! body.classList.contains( openClassName ) ) {
			return;
		}
		body.classList.remove( openClassName );
		searchOpenButton.innerHTML = '<span>' + newspackScreenReaderText.open_search + '</span>';
		removeOverlay();
	};

	document.addEventListener( 'keydown', event => {
		if ( event.key === 'Escape' ) {
			closeMenu();
		}
	} );

	// Find each search toggle and attaches an event listener.
	for ( let i = 0; i < searchToggle.length; i++ ) {
		searchToggle[ i ].addEventListener( 'click', searchMenuToggle, false );
	}
} );
