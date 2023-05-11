/**
 * Internal dependencies.
 */
import { domReady } from '../utils'; // Global utils.
import { MENU_OPEN_CLASS_NAME } from './consts'; // Menu constants.
import { createOverlay, removeOverlay } from './utils'; // Menu utils.

// A class name to append to the body element when the mobile menu is open.
const openClassName = MENU_OPEN_CLASS_NAME + 'mobile-menu';

domReady( function () {
	/**
	 * Mobile Menu toggle and overlay JavaScript.
	 */
	const body = document.body,
		headerContain = document.querySelector( '.mobile-header' ),
		mobileToggle = document.querySelectorAll( '.mobile-menu-toggle' ),
		mobileSidebar = document.querySelector( '.mobile-sidebar' );

	if ( ! headerContain || ! mobileToggle.length || ! mobileSidebar ) {
		return;
	}

	const mobileOpenButton = headerContain.querySelector( '.mobile-menu-toggle a' ),
		mobileCloseButton = mobileSidebar.querySelector( '.mobile-menu-toggle a' );

	/**
	 * @description Fires either the opening or closing functions for a menu.
	 * @param {event} event Click event.
	 */
	const menuToggle = event => {
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
		mobileCloseButton.focus();
		createOverlay();
	};

	/**
	 * @description Closes specifed slide-out menu.
	 */
	const closeMenu = () => {
		body.classList.remove( openClassName );
		mobileOpenButton.focus();
		removeOverlay();
	};

	// Find each mobile toggle and attaches an event listener.
	for ( let i = 0; i < mobileToggle.length; i++ ) {
		mobileToggle[ i ].addEventListener( 'click', menuToggle, false );
	}
} );
