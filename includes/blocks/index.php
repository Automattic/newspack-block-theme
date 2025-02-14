<?php
/**
 * Newspack Block Theme Blocks.
 *
 * @package Newspack_Block_Theme
 */

namespace Newspack_Block_Theme;

defined( 'ABSPATH' ) || exit;

require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/blocks/subtitle-block/class-subtitle-block.php';

if ( class_exists( 'Newspack\Corrections' ) && defined( 'NEWSPACK_CORRECTIONS_ENABLED' ) && NEWSPACK_CORRECTIONS_ENABLED ) {
	require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/blocks/correction-box-block/class-correction-box-block.php';
}
