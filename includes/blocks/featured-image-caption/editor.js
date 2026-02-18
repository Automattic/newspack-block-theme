/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Icon, caption as captionIcon } from '@wordpress/icons';

import metadata from './block.json';

const EditComponent = ( { attributes, setAttributes, context: { postType, postId } } ) => {
	const blockProps = useBlockProps();

	const [ featuredImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );

	const { caption, credit } = useSelect(
		select => {
			if ( ! featuredImage ) {
				return {};
			}
			const media = select( 'core' ).getMedia( featuredImage );
			if ( ! media ) {
				return {};
			}
			return {
				caption: media.caption?.raw || '',
				credit: media.meta?._media_credit || '',
			};
		},
		[ featuredImage ]
	);

	const defaultText = [ caption, credit ].filter( Boolean ).join( ' ' );

	if ( ! featuredImage ) {
		return (
			<figcaption { ...blockProps }>
				<span className="featured-image-caption-placeholder">{ __( 'Featured Image Caption', 'newspack-block-theme' ) }</span>
			</figcaption>
		);
	}

	return (
		<RichText
			{ ...blockProps }
			tagName="figcaption"
			value={ attributes.customCaption }
			onChange={ val => setAttributes( { customCaption: val } ) }
			placeholder={ defaultText || __( 'Write caption…', 'newspack-block-theme' ) }
			allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
		/>
	);
};

registerBlockType( metadata.name, {
	...metadata,
	icon: {
		src: <Icon icon={ captionIcon } />,
		foreground: '#36f',
	},
	edit: EditComponent,
} );
