<?php
/**
 * Newspack Block Theme functions and definitions
 * Version: 1.28.2
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Newspack Block Theme
 */

defined( 'ABSPATH' ) || exit;

// Define NEWSPACK_BLOCK_THEME_FILE.
if ( ! defined( 'NEWSPACK_BLOCK_THEME_FILE' ) ) {
	define( 'NEWSPACK_BLOCK_THEME_FILE', __FILE__ );
	define( 'NEWSPACK_BLOCK_THEME_FILE_PATH', plugin_dir_path( NEWSPACK_BLOCK_THEME_FILE ) );
	define( 'NEWSPACK_BLOCK_THEME_URL', plugin_dir_url( NEWSPACK_BLOCK_THEME_FILE ) );
	define( 'NEWSPACK_BLOCK_THEME_VERSION', '1.28.2' );
}


// Include theme resources.
require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/class-core.php';
require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/blocks/index.php';
require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/class-patterns.php';
require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/class-jetpack.php';
require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/class-woocommerce.php';
require_once NEWSPACK_BLOCK_THEME_FILE_PATH . '/includes/class-newspack-newsletters.php';

/**
 * Warn administrators that this build came from the legacy theme repository.
 */
function newspack_block_theme_legacy_repo_notice() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="notice notice-error">
		<p><strong><?php esc_html_e( 'You are running an outdated version of the Newspack Block Theme theme.', 'newspack-block-theme' ); ?></strong></p>
		<p>
			<?php
			printf(
				wp_kses(
					/* translators: 1: URL of the announcement post. 2: URL of the download center. */
					__( 'This is the final version released from the legacy theme repository, and it will not receive further updates. <a href="%1$s">Read the announcement</a>, then download the current version from the <a href="%2$s">Newspack download center</a>.', 'newspack-block-theme' ),
					[
						'a' => [
							'href' => [],
						],
					]
				),
				esc_url( 'https://newspack.com/newspack-plugins-and-themes-have-a-new-home/' ),
				esc_url( 'https://newspack.com/download-center' )
			);
			?>
		</p>
	</div>
	<?php
}

/*
 * Newspack wizard screens call remove_all_actions() on the notice hooks at priority -9999,
 * so this notice runs ahead of that to stay visible on every admin screen.
 */
add_action( 'all_admin_notices', 'newspack_block_theme_legacy_repo_notice', -99999 );
