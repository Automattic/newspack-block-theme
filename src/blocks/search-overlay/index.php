<?php
/**
 * Newspack Blocks.
 *
 * @package Newspack
 */

namespace Newspack_Block_Theme;

defined( 'ABSPATH' ) || exit;

/**
 * Register block from metadata.
 */
function register_block() {
	// Allow render_block callback to run so we can ensure it renders nothing.
	\register_block_type_from_metadata(
		__DIR__ . '/block.json',
		array(
			'render_callback' => __NAMESPACE__ . '\\render_block',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );

/**
 * Enqueue front-end scripts.
 */
function enqueue_scripts() {
	\wp_enqueue_script( 'newspack-block-theme-search-block', get_theme_file_uri( '/dist/search-overlay-block.js' ), [], wp_get_theme()->get( 'Version' ), true );

	\wp_enqueue_style( 'newspack-block-theme-search-block', get_theme_file_uri( '/dist/search-overlay-block.css' ), [], wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts' );

/**
 * Render block output
 */
function render_block( $attrs, $content ) {
	ob_start();
	?>
		<div class="search-menu">
			<a class="search-menu-toggle" href="#">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
					<path d="M13.5 6C10.5 6 8 8.5 8 11.5c0 1.1.3 2.1.9 3l-3.4 3 1 1.1 3.4-2.9c1 .9 2.2 1.4 3.6 1.4 3 0 5.5-2.5 5.5-5.5C19 8.5 16.5 6 13.5 6zm0 9.5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
				</svg>
				<span class="screen-reader-text"><?php esc_html_e( 'Open Search', 'newspack-block-theme' ); ?></span>


			</a>
		</div>

		<div class="search-overlay">
			<button class="search-menu-toggle">
				<svg width="24" height="24" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
					<path d="M0 0h24v24H0z" fill="none"></path>
				</svg>
				<span class="screen-reader-text"><?php esc_html_e( 'Close Search', 'newspack-block-theme' ); ?></span>
			</button>
			<?php block_template_part( 'search-overlay' ); ?>
		</div>
	<?php
	return ob_get_clean();
}


