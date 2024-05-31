// Add style to make the Separator block 'tick' (16px).
wp.domReady( () => {
	wp.blocks.registerBlockStyle( 'core/separator', {
		name: 'thick',
		label: 'Thick',
	} );
} );
