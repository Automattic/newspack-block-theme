<?php
/**
 * Correction Box Block.
 *
 * @package Newspack_Block_Theme
 */

namespace Newspack_Block_Theme;

use Newspack\Corrections;

defined( 'ABSPATH' ) || exit;

/**
 * Corrections Box class.
 */
final class Correction_Box_Block {
	/**
	 * Initializes the block.
	 */
	public static function init() {
		add_action( 'init', [ __CLASS__, 'register_block' ] );
		add_action( 'enqueue_block_editor_assets', [ __CLASS__, 'enqueue_block_editor_assets' ] );
	}

	/**
	 * Registers the block.
	 */
	public static function register_block() {
		register_block_type_from_metadata(
			__DIR__ . '/block.json',
			[
				'render_callback' => [ __CLASS__, 'render_block' ],
				'uses_context'    => [ 'postId' ],
			]
		);
	}

	/**
	 * Enqueues block editor assets.
	 */
	public static function enqueue_block_editor_assets() {
		$handle = 'newspack-block-theme-correction-box-block';
		wp_enqueue_script( $handle, \get_theme_file_uri( 'dist/correction-box-block-index.js' ), [ 'wp-blocks', 'wp-i18n', 'wp-element' ], NEWSPACK_BLOCK_THEME_VERSION, true );
	}

	/**
	 * Block render callback.
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $content    The block content.
	 * @param object $block      The block.
	 *
	 * @return string The block HTML.
	 */
	public static function render_block( array $attributes, string $content, $block ) {
		$post_id = $block->context['postId'] ?? null;

		if ( empty( $post_id ) ) {
			return '';
		}

		// Fetch corrections.
		$corrections = Corrections::get_corrections( $post_id );

		if ( empty( $corrections ) ) {
			return '';
		}

		$block_wrapper_attributes = get_block_wrapper_attributes();
		$corrections_archive_url = get_post_type_archive_link( Corrections::POST_TYPE );

		ob_start();
		?>
		<div <?php echo esc_attr( $block_wrapper_attributes ); ?>>
			<?php
			foreach ( $corrections as $correction ) :
				$correction_content = $correction->post_content;
				$correction_date    = \get_the_date( get_option( 'date_format' ), $correction->ID );
				$correction_time    = \get_the_time( get_option( 'time_format' ), $correction->ID );
				$timezone           = \wp_timezone()->getName();
				$correction_heading = sprintf(
					'%s, %s %s %s:',
					Corrections::get_correction_type( $correction->ID ),
					$correction_date,
					$correction_time,
					$timezone
				);
				?>
				<p class="correction">
					<a class="correction-title" href="<?php echo esc_url( $corrections_archive_url ); ?>">
						<?php echo esc_html( $correction_heading ); ?>
					</a>
					<span class="correction-content">
						<?php echo esc_html( $correction_content ); ?>
					</span>
				</p>
			<?php endforeach; ?>
		</div>
		<?php
		return ob_get_clean();
	}
}

Correction_Box_Block::init();
