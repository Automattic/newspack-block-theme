/**
 * Internal dependencies.
 */
import { domReady } from '../utils'; // Global utils.
import { MENU_OPEN_CLASS_NAME } from './consts'; // Menu constants.
import { createOverlay, removeOverlay } from './utils'; // Menu utils.

// A class name to append to the body element when the drawer menu is open.
const openClassName = MENU_OPEN_CLASS_NAME + 'drawer-menu';

domReady( function () {
	/**
	 * Drawer Menu toggle and overlay JavaScript.
	 */
	const body = document.body,
		pageContain = document.querySelector( '.drawer-menu' ),
		drawerToggle = document.querySelectorAll( '.drawer-menu__toggle' ),
		drawerContents = document.querySelector( '.drawer-menu__contents' );

	if ( ! pageContain || ! drawerToggle.length || ! drawerContents ) {
		return;
	}

	const drawerOpenButton = pageContain.querySelector( '.drawer-menu__toggle a' ),
		drawerCloseButton = drawerContents.querySelector( '.drawer-menu__toggle a' );

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
	 * @description Opens specifed drawer menu.
	 */
	const openMenu = () => {
		body.classList.add( openClassName );
		drawerContents.classList.add( openClassName );
		drawerCloseButton.focus();
		createOverlay();
	};

	/**
	 * @description Closes specifed drawer menu.
	 */
	const closeMenu = () => {
		body.classList.remove( openClassName );
		drawerContents.classList.remove( openClassName );
		drawerOpenButton.focus();
		removeOverlay();
	};

	// Find each drawer toggle and attaches an event listener.
	for ( let i = 0; i < drawerToggle.length; i++ ) {
		drawerToggle[ i ].addEventListener( 'click', menuToggle, false );
	}
} );
