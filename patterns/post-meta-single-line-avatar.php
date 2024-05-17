<?php
/**
 * Title: Avatar, Byline and Date on the same line
 * Slug: newspack-block-theme/post-meta-single-line-avatar
 * Categories: newspack-block-theme-post-meta
 * Viewport Width: 632
 * Block Types: core/avatar, core/post-author, core/post-date
 *
 * @package Newspack_Block_Theme
 */

?>
<!-- wp:group {"metadata":{"name":"Post Meta"},"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"className":"post-meta","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
<div class="wp-block-group post-meta">
	
<?php if ( class_exists( 'CoAuthors_Guest_Authors' ) ) : ?>

	<!-- wp:group {"templateLock":"all","lock":{"move":true,"remove":true},"metadata":{"name":"Avatar + Byline"},"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
	<div class="wp-block-group">
	
	<!-- wp:co-authors-plus/coauthors {"layout":{"type":"flex","orientation":"horizontal"},"prefix":"","style":{"spacing":{"blockGap":"0"}},"className":"cap-avatar"} -->
	<div class="wp-block-co-authors-plus-coauthors cap-avatar"><!-- wp:co-authors-plus/avatar /--></div>
	<!-- /wp:co-authors-plus/coauthors -->

	<!-- wp:co-authors-plus/coauthors {"lock":{"move":true,"remove":true}} -->
	<div class="wp-block-co-authors-plus-coauthors"><!-- wp:co-authors-plus/name {"isLink":true,"lock":{"move":true,"remove":true}} /--></div>
	<!-- /wp:co-authors-plus/coauthors -->

	</div>
	<!-- /wp:group -->

<?php else : ?>

	<!-- wp:post-author {"avatarSize":24,"byline":"By","isLink":true,"lock":{"move":true,"remove":true}} /-->

<?php endif; ?>

<!-- wp:separator {"style":{"layout":{"selfStretch":"fixed","flexSize":"1px"},"spacing":{"margin":{"top":"0","bottom":"0"}}},"className":"is-style-thick"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-thick" style="margin-top:0;margin-bottom:0"/>
<!-- /wp:separator -->

<!-- wp:post-date {"lock":{"move":true,"remove":true}} /--></div>
<!-- /wp:group -->
