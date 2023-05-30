<?php
/**
 * Newspack Block Theme core.
 *
 * @package Newspack_Block_Theme
 */

namespace Newspack_Block_Theme;

defined( 'ABSPATH' ) || exit;

/**
 * Main Core class.
 * Primary theme functionaltiy.
 */
final class Core {
	/**
	 * The single instance of the class.
	 *
	 * @var Core
	 */
	protected static $instance = null;

	/**
	 * Main Newspack_Block_Theme instance.
	 * Ensures only one instance of Newspack_Block_Theme is loaded or can be loaded.
	 *
	 * @return Core - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_action( 'after_setup_theme', [ __CLASS__, 'theme_support' ] );
		\add_action( 'wp_enqueue_scripts', [ __CLASS__, 'theme_styles' ] );
		\add_action( 'enqueue_block_editor_assets', [ __CLASS__, 'editor_scripts' ] );
		\add_filter( 'block_type_metadata', [ __CLASS__, 'block_variations' ] );
	}

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since Newspack Block Theme 1.0
	 *
	 * @return void
	 */
	public static function theme_support() {
		// Enqueue editor styles.
		\add_editor_style( 'style.css' );

		// Make theme available for translation.
		\load_theme_textdomain( 'newspack-block-theme' );
	}

	/**
	 * Enqueue styles.
	 *
	 * @since Newspack Block Theme 1.0
	 *
	 * @return void
	 */
	public static function theme_styles() {

		// Register theme stylesheet.
		\wp_register_style(
			'newspack_block_theme-style',
			\get_stylesheet_directory_uri() . '/style.css',
			array(),
			\wp_get_theme()->get( 'Version' )
		);

		// Enqueue theme stylesheet.
		\wp_enqueue_style( 'newspack_block_theme-style' );

		// Enqueue front-end JavaScript.
		wp_enqueue_script( 'newspack-main', get_theme_file_uri( '/dist/main.js' ), array(), wp_get_theme()->get( 'Version' ), true );
	}

	public static function editor_scripts() {
		// Enqueue editor JavaScript.
		wp_enqueue_script( 'editor-script', get_theme_file_uri( '/dist/editor.js' ), array( 'wp-blocks', 'wp-dom' ), wp_get_theme()->get( 'Version' ), true );
	}

	/**
	 * Add block variations.
	 *
	 * @since Newspack Block Theme 1.0
	 *
	 * This is a bit clunky, but we'll be able to replace it with JavaScript once isDefault works there.
	 * See: https://github.com/WordPress/gutenberg/issues/28119
	 *
	 * @return array Block metadata.
	 */
	public static function block_variations( $metadata ) {
		if ( $metadata[ 'name' ] == 'core/search' ) {
			$metadata['attributes']['buttonPosition']['default'] = 'button-inside';
			$metadata['attributes']['buttonUseIcon']['default']  = true;
			$metadata['attributes']['placeholder']['default']    = esc_html__( 'Search...', 'newspack-block-theme' );
			$metadata['attributes']['showLabel']['default']      = false;
		}
		return $metadata;
	}
}

Core::instance();
