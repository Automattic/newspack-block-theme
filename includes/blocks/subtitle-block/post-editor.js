/* globals newspack_block_theme_subtitle_block */
'use strict';

/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const META_FIELD_NAME = newspack_block_theme_subtitle_block.post_meta_name;

const SUBTITLE_ID = 'newspack-post-subtitle-element';
const SUBTITLE_STYLE_ID = 'newspack-post-subtitle-element-style';

/**
 * Get the correct document for the editor canvas.
 * In iframe mode, the editor content is inside an iframe with name="editor-canvas".
 * In non-iframe mode, falls back to the admin document.
 */
const getEditorCanvas = () => {
	const iframe = document.querySelector( 'iframe[name="editor-canvas"]' );
	if ( iframe?.contentDocument ) {
		return iframe.contentDocument;
	}
	return document;
};

const appendSubtitleToTitleDOMElement = ( subtitle, callback ) => {
	const editorDoc = getEditorCanvas();
	const titleWrapperEl = editorDoc.querySelector( '.edit-post-visual-editor__post-title-wrapper' );

	if ( titleWrapperEl && typeof subtitle === 'string' ) {
		let subtitleEl = editorDoc.getElementById( SUBTITLE_ID );
		const titleParent = titleWrapperEl.parentNode;

		if ( ! editorDoc.getElementById( SUBTITLE_STYLE_ID ) ) {
			const style = editorDoc.createElement( 'style' );
			style.id = SUBTITLE_STYLE_ID;
			style.innerHTML = `
                #${ SUBTITLE_ID } {
                    font-style: italic;
                    max-width: calc(632px + var(--wp--preset--spacing--30)* 2);
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 2em;
                    padding-left: var(--wp--preset--spacing--30);
                    padding-right: var(--wp--preset--spacing--30);
                }
            `;
			editorDoc.head.appendChild( style );
		}

		if ( ! subtitleEl ) {
			subtitleEl = editorDoc.createElement( 'div' );
			subtitleEl.setAttribute( 'contenteditable', 'plaintext-only' );
			subtitleEl.addEventListener( 'input', () => {
				callback( subtitleEl.innerHTML );
			} );
			subtitleEl.id = SUBTITLE_ID;
			titleParent.insertBefore( subtitleEl, titleWrapperEl.nextSibling );
		}
		subtitleEl.innerHTML = subtitle;
	}
};

/**
 * This functionality is handled via DOM interaction, which is risky, but in the name of WYSIWYG.
 * The post subtitle is edited directly beneath the post title, and no block is
 * registered in the post editor – this block will only be registered in the site editor.
 */
const NewspackSubtitlePanel = () => {
	const subtitle = useSelect( select => select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ META_FIELD_NAME ] );
	const dispatch = useDispatch();
	const saveSubtitle = updatedSubtitle => {
		dispatch( 'core/editor' ).editPost( {
			meta: {
				[ META_FIELD_NAME ]: updatedSubtitle,
			},
		} );
	};
	useEffect( () => {
		// Retry until the editor canvas (potentially inside an iframe) is ready.
		let retryCount = 0;
		const maxRetries = 50; // 5 seconds at 100ms intervals.
		const tryAppend = () => {
			const editorDoc = getEditorCanvas();
			const titleWrapperEl = editorDoc.querySelector( '.edit-post-visual-editor__post-title-wrapper' );
			if ( titleWrapperEl ) {
				appendSubtitleToTitleDOMElement( subtitle, saveSubtitle );
			} else if ( retryCount < maxRetries ) {
				retryCount++;
				setTimeout( tryAppend, 100 );
			}
		};
		tryAppend();
	}, [] );
};

registerPlugin( 'plugin-document-setting-panel-newspack-subtitle', {
	render: NewspackSubtitlePanel,
	icon: null,
} );
