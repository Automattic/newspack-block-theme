/**
 * Internal dependencies.
 */
import { domReady } from '../utils';
import { createMenu } from './index';

domReady( function () {
	createMenu( {
		menuType: 'mobile-menu',
		containerSelector: '.header-mobile',
		toggleSelector: '.mobile-menu__toggle',
		contentsSelector: '.mobile-menu__contents'
	} ).init();
} );
