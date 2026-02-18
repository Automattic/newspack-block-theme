/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, caption as captionIcon } from '@wordpress/icons';

import { Edit } from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	icon: {
		src: <Icon icon={ captionIcon } />,
		foreground: '#36f',
	},
	edit: Edit,
} );
