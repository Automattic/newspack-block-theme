<?php
/**
 * Newspack Block Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Newspack Block Theme
 * @since Newspack Block Theme 1.0
 */


if ( ! function_exists( 'newspack_block_theme_support' ) ) :

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since Newspack Block Theme 1.0
	 *
	 * @return void
	 */
	function newspack_block_theme_support() {

		// Enqueue editor styles.
		add_editor_style( 'style.css' );

		// Make theme available for translation.
		load_theme_textdomain( 'newspack-block-theme' );
	}

endif;

add_action( 'after_setup_theme', 'newspack_block_theme_support' );

if ( ! function_exists( 'newspack_block_theme_styles' ) ) :

	/**
	 * Enqueue styles.
	 *
	 * @since Newspack Block Theme 1.0
	 *
	 * @return void
	 */
	function newspack_block_theme_styles() {

		// Register theme stylesheet.
		wp_register_style(
			'newspack_block_theme-style',
			get_stylesheet_directory_uri() . '/style.css',
			array(),
			wp_get_theme()->get( 'Version' )
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'newspack_block_theme-style' );

	}

endif;

add_action( 'wp_enqueue_scripts', 'newspack_block_theme_styles' );
