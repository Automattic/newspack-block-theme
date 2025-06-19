/**
 * Internal dependencies.
 */
import { domReady } from '../utils';
import { createMenu } from './index';

domReady( function () {
	createMenu( {
		menuType: 'drawer-menu',
		containerSelector: '.drawer-menu',
		toggleSelector: '.drawer-menu__toggle',
		contentsSelector: '.drawer-menu__contents'
	} ).init();
} );
