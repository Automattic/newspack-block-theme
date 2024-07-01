<?php
/**
 * Title: Footer - Style 3
 * Slug: newspack-block-theme/footer-style-3
 * Inserter: no
 * Block Types: core/template-part/footer
 *
 * @package Newspack_Block_Theme
 */

?>
<!-- wp:group {"lock":{"move":true,"remove":true},"metadata":{"name":"<?php esc_html_e( 'Footer', 'newspack-block-theme' ); ?>"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|80"}},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"backgroundColor":"contrast","textColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-base-color has-contrast-background-color has-text-color has-background has-link-color" style="margin-top:var(--wp--preset--spacing--80)"><!-- wp:group {"lock":{"move":true,"remove":true},"align":"wide","style":{"spacing":{"blockGap":"0"}},"layout":{"type":"default"}} -->
<div class="wp-block-group alignwide"><!-- wp:columns {"lock":{"move":true,"remove":true},"metadata":{"name":"<?php esc_html_e( 'Content', 'newspack-block-theme' ); ?>"},"style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}}} -->
<div class="wp-block-columns" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"dimensions":{"minHeight":"100%"}},"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"space-between"}} -->
<div class="wp-block-group" style="min-height:100%"><!-- wp:site-title {"level":0,"fontSize":"large"} /-->

<!-- wp:social-links {"iconColor":"base","iconColorValue":"#ffffff","iconBackgroundColor":"contrast-2","className":"has-icon-background-color","layout":{"type":"flex"}} -->
<ul class="wp-block-social-links has-icon-color has-icon-background-color"><!-- wp:social-link {"url":"#","service":"facebook"} /-->

<!-- wp:social-link {"url":"#","service":"instagram"} /-->

<!-- wp:social-link {"url":"#","service":"youtube"} /--></ul>
<!-- /wp:social-links --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
<div class="wp-block-column"><!-- wp:heading {"level":5} -->
<h5 class="wp-block-heading"><?php esc_html_e( 'Links', 'newspack-block-theme' ); ?></h5>
<!-- /wp:heading -->

<!-- wp:navigation {"className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"blockGap":"var:preset|spacing|30"}},"fontSize":"x-small","layout":{"type":"flex","flexWrap":"nowrap","orientation":"vertical"}} /--></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
<div class="wp-block-column"><!-- wp:heading {"level":5} -->
<h5 class="wp-block-heading"><?php esc_html_e( 'About', 'newspack-block-theme' ); ?></h5>
<!-- /wp:heading -->

<!-- wp:navigation {"className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"blockGap":"var:preset|spacing|30"}},"fontSize":"x-small","layout":{"type":"flex","flexWrap":"nowrap","orientation":"vertical"}} /--></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
<div class="wp-block-column"><!-- wp:heading {"level":5} -->
<h5 class="wp-block-heading"><?php esc_html_e( 'Join', 'newspack-block-theme' ); ?></h5>
<!-- /wp:heading -->

<!-- wp:navigation {"className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"blockGap":"var:preset|spacing|30"}},"fontSize":"x-small","layout":{"type":"flex","flexWrap":"nowrap","orientation":"vertical"}} /--></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:group {"lock":{"move":true,"remove":true},"metadata":{"name":"<?php esc_html_e( 'Credits', 'newspack-block-theme' ); ?>"},"layout":{"type":"default"}} -->
<div class="wp-block-group"><!-- wp:separator {"lock":{"move":true,"remove":true},"className":"is-style-wide","backgroundColor":"contrast-2"} -->
<hr class="wp-block-separator has-text-color has-contrast-2-color has-alpha-channel-opacity has-contrast-2-background-color has-background is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:group {"lock":{"move":false,"remove":true},"style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"bottom":"var:preset|spacing|50"}}},"fontSize":"x-small","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group has-x-small-font-size" style="padding-bottom:var(--wp--preset--spacing--50)"><!-- wp:group {"lock":{"move":false,"remove":true},"metadata":{"name":"<?php esc_html_e( 'Copyright', 'newspack-block-theme' ); ?>"},"style":{"spacing":{"blockGap":"0.25em"}},"layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:paragraph -->
<p><strong>©</strong></p>
<!-- /wp:paragraph -->

<!-- wp:site-title {"style":{"typography":{"fontStyle":"normal","fontWeight":"400"}},"fontSize":"x-small"} /--></div>
<!-- /wp:group -->

<!-- wp:group {"templateLock":"all","lock":{"move":true,"remove":true},"metadata":{"name":"<?php esc_html_e( 'Powered By', 'newspack-block-theme' ); ?>"},"className":"powered-by","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group powered-by"><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-base-color has-text-color has-link-color"><a href="https://newspack.com"><?php esc_html_e( 'Powered by Newspack', 'newspack-block-theme' ); ?></a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
