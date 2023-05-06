/**
 * Mobile Menu toggle and overlay JavaScript.
 */
const body = document.body,
	headerContain = document.getElementsByClassName( 'mobile-header' ),
	mobileToggle = document.getElementsByClassName( 'mobile-menu-toggle' ),
	mobileSidebar = document.getElementsByClassName( 'mobile-sidebar' ),
	overlay = [];

/**
 * @description Fires either the opening or closing functions for a menu.
 * @param {event}  event         Click event.
 * @param {string} openButton    The button that opens the menu.
 * @param {string} closeButton   The button that closes the menu.
 * @param {string} openClassName CSS class used on the body to indicate menu is open.
 * @param {string} maskId        The overlay mask's ID.
 */
const menuToggle = function ( event, openButton, closeButton, openClassName, maskId ) {
	event.preventDefault();
	if ( body.classList.contains( openClassName ) ) {
		closeMenu( openClassName, openButton, maskId );
	} else {
		openMenu( openClassName, closeButton, maskId );
	}
};

/**
 * @description Creates semi-transparent overlay behind menus.
 * @param {string} maskId The ID to add to the div.
 */
function createOverlay( maskId ) {
	if ( ! overlay[ maskId ] ) {
		overlay[ maskId ] = document.createElement( 'div' );
		overlay[ maskId ].setAttribute( 'class', 'overlay-mask' );
		overlay[ maskId ].setAttribute( 'id', maskId );
	}
	body.appendChild( overlay[ maskId ] );
}

/**
 * @description Removes semi-transparent overlay behind menus.
 * @param {string} maskId The ID to use for the overlay.
 */
function removeOverlay( maskId ) {
	document.getElementById( maskId ).remove();
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

// Find each mobile toggle and attaches an event listener.
for ( let i = 0; i < mobileToggle.length; i++ ) {
	const mobileOpenButton = headerContain[ 0 ].querySelector( '.mobile-menu-toggle a' ),
		mobileCloseButton = mobileSidebar[ 0 ].querySelector( '.mobile-menu-toggle a' );

	mobileToggle[ i ].addEventListener(
		'click',
		() =>
			menuToggle( event, mobileOpenButton, mobileCloseButton, 'mobile-menu-opened', 'mask-mobile' ),
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
