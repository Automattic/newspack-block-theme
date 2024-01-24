/* globals newspackScreenReaderText */

/**
 * Internal dependencies
 */
import './view.scss';
import { domReady } from '../../js/front-end/utils'; // Global utils.
import { MENU_OPEN_CLASS_NAME } from '../../js/front-end/menus/consts'; // Menu constants.

// A class name to append to the body element when the mobile menu is open.
const openClassName = MENU_OPEN_CLASS_NAME + 'search-menu';

domReady( function () {
	/**
	 * Search Menu toggle and overlay JavaScript.
	 */
	const body = document.body,
		searchToggle = document.querySelectorAll( '.search-menu-toggle' ),
		searchOverlay = document.querySelector( '.search-overlay' );

	if ( ! searchToggle.length || ! searchOverlay ) {
		return;
	}

	// If Jetpack Instant Search is enabled, add a CSS class to the search toggle and bail.
	// See: https://jetpack.com/support/search/customizing-jetpack-search/#add-search-button
	if ( newspackScreenReaderText.jetpack_instant_search ) {
		for ( let i = 0; i < searchToggle.length; i++ ) {
			searchToggle[ i ].classList.add( 'jetpack-search-filter__link' );
		}
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
		searchOverlay.querySelector( 'input[type="search"]' ).focus();
	};

	/**
	 * @description Closes specifed slide-out menu.
	 */
	const closeMenu = () => {
		if ( ! body.classList.contains( openClassName ) ) {
			return;
		}
		body.classList.remove( openClassName );
	};

	document.addEventListener( 'keydown', event => {
		if ( event.key === 'Escape' ) {
			closeMenu();
		}
	} );

	// Find each mobile toggle and attaches an event listener.
	for ( let i = 0; i < searchToggle.length; i++ ) {
		searchToggle[ i ].addEventListener( 'click', searchMenuToggle, false );
	}
} );
