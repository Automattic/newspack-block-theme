<?php
/**
 * Title: Byline and Date on the same line
 * Slug: newspack-block-theme/post-meta-single-line
 * Categories: newspack-block-theme-post-meta
 * Viewport Width: 632
 * Block Types: core/post-author, core/post-date
 *
 * @package Newspack_Block_Theme
 */

?>
<!-- wp:group {"metadata":{"name":"Post Meta"},"style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"top":"2px","bottom":"2px"}}},"className":"post-meta","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
<div class="wp-block-group post-meta" style="padding-top:2px;padding-bottom:2px">

<?php if ( class_exists( 'CoAuthors_Guest_Authors' ) ) : ?>

	<!-- wp:co-authors-plus/coauthors {"lock":{"move":true,"remove":true}} -->
	<div class="wp-block-co-authors-plus-coauthors"><!-- wp:co-authors-plus/name {"isLink":true,"lock":{"move":true,"remove":true}} /--></div>
	
	<!-- /wp:co-authors-plus/coauthors -->

<?php else : ?>

	<!-- wp:post-author {"showAvatar":false,"byline":"By","isLink":true,"lock":{"move":true,"remove":true}} /-->

<?php endif; ?>

<!-- wp:separator {"style":{"layout":{"selfStretch":"fixed","flexSize":"1px"},"spacing":{"margin":{"top":"0","bottom":"0"}}},"className":"is-style-thick"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-thick" style="margin-top:0;margin-bottom:0"/>
<!-- /wp:separator -->

<!-- wp:post-date {"lock":{"move":true,"remove":true}} /--></div>
<!-- /wp:group -->
