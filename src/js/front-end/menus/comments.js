/**
 * Internal dependencies.
 */
import { domReady } from '../utils';
import { createMenu, createFocusTrap } from './index';

/**
 * Loads a comment page via fetch and swaps the comments block content in the
 * panel without a full page reload.
 *
 * @param {string}      url      The URL to fetch (comment pagination link).
 * @param {HTMLElement} contents The .comments-menu__contents panel element.
 */
const loadCommentPage = ( url, contents ) => {
	const commentsBlock = contents.querySelector( '.wp-block-comments' );
	if ( ! commentsBlock ) {
		return;
	}

	// Show a loading state by reducing opacity.
	commentsBlock.style.opacity = '0.4';
	commentsBlock.style.pointerEvents = 'none';

	fetch( url )
		.then( response => {
			if ( ! response.ok ) {
				throw new Error( response.statusText );
			}
			return response.text();
		} )
		.then( html => {
			const doc = new DOMParser().parseFromString( html, 'text/html' );

			// Pull the updated comments block from the fetched page.
			// Use the panel-specific selector so we don't grab a full-page comments section.
			const newBlock = doc.querySelector( '.comments-menu__contents .wp-block-comments' ) || doc.querySelector( '.wp-block-comments' );

			if ( ! newBlock ) {
				window.location.href = url;
				return;
			}

			commentsBlock.replaceWith( newBlock );

			// Update the URL so refresh / auto-open logic stays accurate.
			history.pushState( null, doc.title, url );

			// Scroll the panel back to the top of the new content.
			contents.scrollTop = 0;

			// Re-create the focus trap now that the DOM has changed.
			createFocusTrap( contents );
		} )
		.catch( () => {
			// On any error, fall back to normal navigation so pagination still works.
			window.location.href = url;
		} );
};

domReady( function () {
	const contents = document.querySelector( '.comments-menu__contents' );

	createMenu( {
		menuType: 'comments-menu',
		containerSelector: '.comments-menu',
		toggleSelector: '.comments-menu__toggle',
		contentsSelector: '.comments-menu__contents',
		onOpen: panelContents => {
			// Wait a bit for any dynamic content to load (like Disqus)
			setTimeout( () => {
				// Re-create focus trap after dynamic content loads
				createFocusTrap( panelContents );
			}, 100 );
		},
	} ).init();

	// Intercept pagination clicks inside the comment panel and load the new page inline rather than reloading page.
	if ( contents ) {
		contents.addEventListener( 'click', event => {
			const link = event.target.closest( '.wp-block-comments-pagination a' );
			if ( ! link ) {
				return;
			}
			// Only intercept same-origin links.
			if ( new URL( link.href ).origin !== window.location.origin ) {
				return;
			}
			event.preventDefault();
			loadCommentPage( link.href, contents );
		} );
	}

	// Auto-open the comments panel when the page loads via a comment pagination link (?cpage=N or /comment-page-N/) or a direct comment link (#comment-N).
	const isCommentPagination = /[?&]cpage=\d+/.test( window.location.search ) || /\/comment-page-\d+\//i.test( window.location.pathname );
	const commentHash = /^#comment-\d+$/.test( window.location.hash ) ? window.location.hash : null;

	if ( isCommentPagination || commentHash ) {
		// The first .comments-menu__toggle in the DOM is the outer "Comments" open button.
		const toggle = document.querySelector( '.comments-menu__toggle' );
		if ( toggle ) {
			toggle.click();

			// After the panel's slide-in animation (250ms), scroll to the target comment.
			if ( commentHash ) {
				setTimeout( () => {
					const target = document.querySelector( commentHash );
					if ( target ) {
						target.scrollIntoView( { behavior: 'smooth', block: 'start' } );
					}
				}, 400 );
			}
		}
	}
} );
