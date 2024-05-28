/**
 * Internal dependencies.
 */
import { domReady } from '../utils'; // Global utils.
import { MENU_OPEN_CLASS_NAME } from './consts'; // Menu constants.
import { createOverlay, removeOverlay } from './utils'; // Menu utils.

// A class name to append to the body element when the comments menu is open.
const openClassName = MENU_OPEN_CLASS_NAME + 'comments-menu';

domReady( function () {
	/**
	 * Comments Menu toggle and overlay JavaScript.
	 */
	const body = document.body,
		headerContain = document.querySelector( '.comments-menu' ),
		commentsToggle = document.querySelectorAll( '.comments-menu-toggle' ),
		commentsContents = document.querySelector( '.comments-contents' );

	if ( ! headerContain || ! commentsToggle.length || ! commentsContents ) {
		return;
	}

	const commentsOpenButton = headerContain.querySelector( '.comments-menu-toggle a' ),
		commentsCloseButton = commentsContents.querySelector( '.comments-menu-toggle a' );

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
		commentsCloseButton.focus();
		createOverlay();
	};

	/**
	 * @description Closes specifed slide-out menu.
	 */
	const closeMenu = () => {
		body.classList.remove( openClassName );
		commentsOpenButton.focus();
		removeOverlay();
	};

	// Find each comments toggle and attaches an event listener.
	for ( let i = 0; i < commentsToggle.length; i++ ) {
		commentsToggle[ i ].addEventListener( 'click', menuToggle, false );
	}
} );
