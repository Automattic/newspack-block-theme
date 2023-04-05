/* globals newspackScreenReaderText */

/**
 * File amp-fallback.js.
 *
 * AMP fallback JavaScript.
 */

( function () {
	console.log( 'loaded!' );

	// Shared variables
	const headerContain = document.getElementsByClassName( 'mobile-header' );

	// Menu toggle variables.
	const mobileToggle = document.getElementsByClassName( 'mobile-menu-toggle' ),
		body = document.body,
		mobileSidebar = document.getElementsByClassName( 'mobile-sidebar' );

	/**
	 * @description Creates semi-transparent overlay behind menus.
	 * @param {string} maskId The ID to add to the div.
	 */
	function createOverlay( maskId ) {
		const mask = document.createElement( 'div' );
		mask.setAttribute( 'class', 'overlay-mask' );
		mask.setAttribute( 'id', maskId );
		document.body.appendChild( mask );
	}

	/**
	 * @description Removes semi-transparent overlay behind menus.
	 * @param {string} maskId The ID to use for the overlay.
	 */
	function removeOverlay( maskId ) {
		const mask = document.getElementById( maskId );
		mask.parentNode.removeChild( mask );
	}

	/**
	 * @description Opens specifed slide-out menu.
	 * @param {string} menuClass  The class to add to the body to toggle menu visibility.
	 * @param {string} openButton The button used to open the menu.
	 * @param {string} maskId     The ID to use for the overlay.
	 */
	function openMenu( menuClass, openButton, maskId ) {
		body.classList.add( menuClass );
		openButton.focus();
		createOverlay( maskId );
	}

	/**
	 * @description Closes specifed slide-out menu.
	 * @param {string} menuClass  The class to remove from the body to toggle menu visibility.
	 * @param {string} openButton The button used to open the menu.
	 * @param {string} maskId     The ID to use for the overlay.
	 */
	function closeMenu( menuClass, openButton, maskId ) {
		body.classList.remove( menuClass );
		openButton.focus();
		removeOverlay( maskId );
	}

	// Mobile menu fallback.
	for ( let i = 0; i < mobileToggle.length; i++ ) {
		const mobileOpenButton = headerContain[0].querySelector( '.mobile-menu-toggle a' ),
			mobileCloseButton = mobileSidebar[0].querySelector( '.mobile-menu-toggle a' );

		mobileToggle[ i ].addEventListener(
			'click',
			function () {
				if ( body.classList.contains( 'mobile-menu-opened' ) ) {
					closeMenu( 'mobile-menu-opened', mobileOpenButton, 'mask-mobile' );
				} else {
					openMenu( 'mobile-menu-opened', mobileCloseButton, 'mask-mobile' );
				}
			},
			false
		);
	}

	// Add listener to the menu overlays, so they can be closed on click.
	document.addEventListener( 'click', function ( e ) {
		if ( e.target && e.target.className === 'overlay-mask' ) {
			const maskId = e.target.id;
			const menu = maskId.split( '-' );

			body.classList.remove( menu[ 1 ] + '-menu-opened' );
			removeOverlay( maskId );
		}
	} );
} )();
