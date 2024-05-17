<?php
/**
 * Title: Avatar, Byline and Date on multiple lines
 * Slug: newspack-block-theme/post-meta-multiple-lines-avatar
 * Categories: newspack-block-theme-post-meta
 * Viewport Width: 632
 * Block Types: core/avatar, core/post-author, core/post-date
 *
 * @package Newspack_Block_Theme
 */

?>
<!-- wp:group {"metadata":{"name":"Post Meta"},"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"className":"post-meta","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
<div class="wp-block-group post-meta">

<?php if ( class_exists( 'CoAuthors_Guest_Authors' ) ) : ?>
	
	<!-- wp:co-authors-plus/coauthors {"layout":{"type":"flex","orientation":"horizontal","flexWrap":"nowrap"},"lock":{"move":true,"remove":true},"style":{"layout":{"selfStretch":"fit"},"spacing":{"blockGap":"0"}},"className":"cap-avatar"} -->
	<div class="wp-block-co-authors-plus-coauthors cap-avatar"><!-- wp:co-authors-plus/avatar {"size":48} /--></div>
	<!-- /wp:co-authors-plus/coauthors -->

<?php else : ?>

	<!-- wp:avatar {"size":48,"lock":{"move":true,"remove":true}} /-->

<?php endif; ?>

<!-- wp:group {"templateLock":"all","lock":{"move":true,"remove":true},"metadata":{"name":"Byline + Date"},"style":{"spacing":{"blockGap":"4px"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group">

<?php if ( class_exists( 'CoAuthors_Guest_Authors' ) ) : ?>

	<!-- wp:co-authors-plus/coauthors -->
	<div class="wp-block-co-authors-plus-coauthors"><!-- wp:co-authors-plus/name {"isLink":true} /--></div>
	<!-- /wp:co-authors-plus/coauthors -->

<?php else : ?>

	<!-- wp:post-author {"showAvatar":false,"byline":"By","isLink":true} /-->

<?php endif; ?>

<!-- wp:post-date {"format":"F j, Y"} /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
