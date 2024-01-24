/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { sprintf, __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { TextControl, ToggleControl, PanelBody, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function SearchOverlay({
	setAttributes,
	attributes: { title, searchLabel, buttonColor, setButtonColor, className },
}) {
	const blockProps = useBlockProps();
	//const [ inFlight, setInFlight ] = useState( false );

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('A Panel', 'newspack-block-theme')} initialOpen={true} />
			</InspectorControls>

			<div {...blockProps}>
				<div className="search-menu">
					<a href="#" className="search-menu-toggle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="28"
							height="28"
							aria-hidden="true"
							focusable="false"
						>
							<path d="M13.5 6C10.5 6 8 8.5 8 11.5c0 1.1.3 2.1.9 3l-3.4 3 1 1.1 3.4-2.9c1 .9 2.2 1.4 3.6 1.4 3 0 5.5-2.5 5.5-5.5C19 8.5 16.5 6 13.5 6zm0 9.5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
						</svg>
						<span class="screen-reader-text">{__('Open Search', 'newspack-block-theme')}</span>
					</a>
				</div>
			</div>
		</>
	);
}
