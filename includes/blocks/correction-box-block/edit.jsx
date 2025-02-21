/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { update } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { BlockControls } from '@wordpress/block-editor';
import { Placeholder, Spinner, ToolbarGroup, ToolbarButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import meta from './block.json';

/**
 * Edit function for the Correction Box block.
 *
 * @return {JSX.Element} The Correction Box block.
 */
export default function Edit() {
	const [ isRefreshing, setIsRefreshing ] = useState( false );

	/**
	 * Placeholder when Corrections are loading/Refreshed.
	 *
	 * @return {JSX.Element} The Loading Placeholder JSX.
	 */
	function LoadingPlaceholder() {
		return (
			<Placeholder
				label={ __( 'Corrections', 'newspack-block-theme' ) }
				instructions={ __(
					'The corrections and clarifications are being loaded from the server. Please wait.',
					'newspack-block-theme'
				) }
			>
				<Spinner />
			</Placeholder>
		);
	}

	/**
	 * Toggle Refresh state.
	 */
	const toggleRefresh = () => {
		setIsRefreshing( ! isRefreshing );
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ update }
						label={ __( 'Refresh', 'newspack-block-theme' ) }
						onClick={ toggleRefresh }
					/>
				</ToolbarGroup>
			</BlockControls>
			<ServerSideRender
				block={ meta.name }
				LoadingResponsePlaceholder={ LoadingPlaceholder }
				refresh={ isRefreshing }
			/>
		</>
	);
}
