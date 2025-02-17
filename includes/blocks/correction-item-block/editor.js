/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon, receipt } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import blockData from './block.json';
import './style.scss';

const EditComponent = ( { context: { postType } } ) => {
	if ( 'newspack_correction' !== postType ) {
		return (
			<Placeholder
				icon={ receipt }
				label={ __( 'Corrections & Clarification', 'newspack-block-theme' ) }
				instructions={ __(
					'Please select Corrections post type in Query Loop to use this block.',
					'newspack-block-theme'
				) }
			/>
		);
	}

	return (
		<>
			<div className="correction__item">
				<strong className="correction__item-title">
					{ __( ' Correction Type, Date, and Time: ', 'newspack-block-theme' ) }
				</strong>
				<span className="correction__item-content">
					{ __(
						'Correction content - What was wrong & what was corrected.',
						'newspack-block-theme'
					) }
				</span>
			</div>
			<a className="correction__post-link" href="/#" target="_blank" rel="noopener noreferrer">
				{ __( 'Relates Post Title', 'newspack-block-theme' ) }
			</a>
		</>
	);
};

blockData = {
	title: __( 'Correction Item', 'newspack-block-theme' ),
	icon: {
		src: <Icon icon={ receipt } />,
	},
	usesContext: [ 'postType' ],
	edit: EditComponent,
	...blockData,
};

registerBlockType( blockData.name, blockData );
