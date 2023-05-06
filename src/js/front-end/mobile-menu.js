/**
 * Mobile Menu toggle and overlay JavaScript.
 */
const body = document.body,
	headerContain = document.getElementsByClassName( 'mobile-header' ),
	mobileToggle = document.getElementsByClassName( 'mobile-menu-toggle' ),
	mobileSidebar = document.getElementsByClassName( 'mobile-sidebar' ),
	menuToggle = function ( event, openButton, closeButton ) {
		event.preventDefault();
		if ( body.classList.contains( 'mobile-menu-opened' ) ) {
			closeMenu( 'mobile-menu-opened', openButton, 'mask-mobile' );
		} else {
			openMenu( 'mobile-menu-opened', closeButton, 'mask-mobile' );
		}
	};

let overlay;

/**
 * @description Creates semi-transparent overlay behind menus.
 * @param {string} maskId The ID to add to the div.
 */
function createOverlay( maskId ) {
	if ( ! overlay ) {
		overlay = document.createElement( 'div' );
		overlay.setAttribute( 'class', 'overlay-mask' );
		overlay.setAttribute( 'id', maskId );
	}

	body.appendChild( overlay );
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

// Mobile menu.
for ( let i = 0; i < mobileToggle.length; i++ ) {
	const mobileOpenButton = headerContain[ 0 ].querySelector( '.mobile-menu-toggle a' ),
		mobileCloseButton = mobileSidebar[ 0 ].querySelector( '.mobile-menu-toggle a' );

	mobileToggle[ i ].addEventListener(
		'click',
		() => menuToggle( event, mobileOpenButton, mobileCloseButton ),
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
