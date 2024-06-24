<?php
/**
 * Newspack Block Theme functions and definitions
 * Version: 1.10.0-alpha.1
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Newspack Block Theme
 * @since Newspack Block Theme 1.0
 */

defined( 'ABSPATH' ) || exit;

// Define NEWSPACK_BLOCK_THEME_FILE.
if ( ! defined( 'NEWSPACK_BLOCK_THEME_FILE' ) ) {
	define( 'NEWSPACK_BLOCK_THEME_FILE', __FILE__ );
	define( 'NEWSPACK_BLOCK_THEME_FILE_PATH', plugin_dir_path( NEWSPACK_BLOCK_THEME_FILE ) );
	define( 'NEWSPACK_BLOCK_THEME_URL', plugin_dir_url( NEWSPACK_BLOCK_THEME_FILE ) );
	define( 'NEWSPACK_BLOCK_THEME_VERSION', '1.10.0-alpha.1' );
}


// Include theme resources.
require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/class-core.php';
require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/class-jetpack.php';
