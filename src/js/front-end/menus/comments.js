/**
 * Internal dependencies.
 */
import { domReady } from '../utils';
import { createMenu, createFocusTrap } from './index';

domReady( function () {
	createMenu( {
		menuType: 'comments-menu',
		containerSelector: '.comments-menu',
		toggleSelector: '.comments-menu__toggle',
		contentsSelector: '.comments-menu__contents',
		onOpen: ( contents ) => {
			// Wait a bit for any dynamic content to load (like Disqus)
			setTimeout( () => {
				// Re-create focus trap after dynamic content loads
				createFocusTrap( contents );
			}, 100 );
		}
	} ).init();
} );
