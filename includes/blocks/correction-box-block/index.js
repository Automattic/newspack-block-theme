/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, receipt } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import blockData from './block.json';
import Edit from './edit';

blockData = {
	title: __( 'Correction Box', 'newspack-block-theme' ),
	icon: {
		src: <Icon icon={ receipt } />,
	},
	usesContext: [ 'postId' ],
	edit: Edit,
	...blockData,
};

registerBlockType( blockData.name, blockData );
