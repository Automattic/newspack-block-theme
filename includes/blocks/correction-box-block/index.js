/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Path, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import blockData from './block.json';
import Edit from './edit';

export const title = __( 'Corrections', 'newspack-blocks' );

export const icon = (
	<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<Path d="M4 14.5H20V16H4V14.5ZM4 20H13V18.5H4V20ZM12 5.9L10.1 4L4.7 9.4L4.1 12L6.7 11.4L12.1 6L12 5.9Z" />
	</SVG>
);

blockData = {
	title,
	icon: {
		src: icon,
		foreground: '#406ebc',
	},
	keywords: [ __( 'clarifications', 'newspack-blocks' ), __( 'updates', 'newspack-blocks' ) ],
	description: __(
		'Display all corrections and clarifications made to a post.',
		'newspack-blocks'
	),
	usesContext: [ 'postId' ],
	edit: Edit,
	...blockData,
};

registerBlockType( blockData.name, blockData );
