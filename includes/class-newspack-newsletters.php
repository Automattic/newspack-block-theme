<?php
/**
 * Newspack Newsletters Compatibility File
 *
 * @package Newspack_Block_Theme
 */

namespace Newspack_Block_Theme;

defined( 'ABSPATH' ) || exit;

/**
 * Newspack Newsletters compatibility.
 */
final class Newspack_Newsletters {
	/**
	 * Initializer.
	 */
	public static function init() {
		if ( ! class_exists( '\Newspack_Newsletters' ) ) {
			return;
		}
		\add_action( 'newspack_newsletters_enqueue_block_editor_assets', [ __CLASS__, 'enqueue_editor_styles' ] );
		\add_filter( 'newspack_newsletters_mjml_component_attributes', [ __CLASS__, 'mjml_component_attributes' ] );
	}

	/**
	 * Enqueue Block Editor styles for the Newsletters editor.
	 */
	public static function enqueue_editor_styles() {
		\add_editor_style( 'assets/css/newspack-newsletters-editor.css' );
	}

	/**
	 * Custom MJML components attributes.
	 *
	 * @param array $attributes MJML component attributes.
	 *
	 * @return array MJML component attributes.
	 */
	public static function mjml_component_attributes( $attributes ) {
		if ( isset( $attributes['css-class'] ) && 'image-caption' === $attributes['css-class'] ) {
			$attributes['align']   = 'left';
			$attributes['padding'] = '0';
		}
		return $attributes;
	}
}

Newspack_Newsletters::init();
