<?php
/**
 * Primary Category support for the block theme.
 *
 * Filters the core/post-terms block output to show only the
 * primary category when set via Yoast SEO.
 *
 * @package Newspack_Block_Theme
 */

namespace Newspack_Block_Theme;

defined( 'ABSPATH' ) || exit;

/**
 * Primary Category class.
 */
final class Primary_Category {
	/**
	 * Initialize hooks.
	 */
	public static function init() {
		\add_filter( 'render_block', [ __CLASS__, 'filter_post_terms' ], 10, 2 );
	}

	/**
	 * Filter the core/post-terms block to show only the primary category.
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The block data.
	 * @return string Modified block content.
	 */
	public static function filter_post_terms( $block_content, $block ) {
		// Only filter core/post-terms for the category taxonomy.
		if ( 'core/post-terms' !== $block['blockName'] ) {
			return $block_content;
		}

		$term = $block['attrs']['term'] ?? 'post_tag';
		if ( 'category' !== $term ) {
			return $block_content;
		}

		// Don't filter in admin or REST API contexts.
		if ( \is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return $block_content;
		}

		// Ensure the Newspack Primary_Category utility is available.
		if ( ! class_exists( '\Newspack\Primary_Category' ) ) {
			return $block_content;
		}

		$category = \Newspack\Primary_Category::get();
		if ( ! $category ) {
			return $block_content;
		}

		// Build the primary category link.
		$category_link = \get_category_link( $category->term_id );
		if ( ! $category_link || \is_wp_error( $category_link ) ) {
			return $block_content;
		}
		$link_html = '<a href="' . \esc_url( $category_link ) . '" rel="tag">' . \esc_html( $category->name ) . '</a>';

		// Extract prefix and suffix spans if present, then rebuild inner content.
		$prefix = '';
		$suffix = '';
		if ( preg_match( '/<span[^>]*class="[^"]*wp-block-post-terms__prefix[^"]*"[^>]*>.*?<\/span>/s', $block_content, $matches ) ) {
			$prefix = $matches[0];
		}
		if ( preg_match( '/<span[^>]*class="[^"]*wp-block-post-terms__suffix[^"]*"[^>]*>.*?<\/span>/s', $block_content, $matches ) ) {
			$suffix = $matches[0];
		}

		// Replace the inner content of the wrapper element, preserving wrapper attributes, prefix, and suffix.
		$result = preg_replace(
			'/(<div[^>]*class="[^"]*wp-block-post-terms[^"]*"[^>]*>).*(<\/div>)/s',
			'$1' . $prefix . $link_html . $suffix . '$2',
			$block_content
		);

		return null !== $result ? $result : $block_content;
	}
}

Primary_Category::init();
