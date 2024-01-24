/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as searchOverlay from './search-overlay';

export const blocks = [ searchOverlay ];

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = block => {
	if ( ! block ) {
		return;
	}

	const { metadata, settings, name } = block;

	registerBlockType( { name, ...metadata }, settings );
};

for ( const block of blocks ) {
	registerBlock( block );
}
