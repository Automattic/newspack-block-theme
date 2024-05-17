<?php
/**
 * Title: Byline and Date on multiple lines
 * Slug: newspack-block-theme/post-meta-multiple-lines
 * Categories: newspack-block-theme-post-meta
 * Viewport Width: 632
 * Block Types: core/post-author, core/post-date
 *
 * @package Newspack_Block_Theme
 */

?>
<!-- wp:group {"metadata":{"name":"Post Meta"},"style":{"spacing":{"blockGap":"4px","padding":{"top":"2px","bottom":"2px"}}},"className":"post-meta","layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group post-meta" style="padding-top:2px;padding-bottom:2px">

<?php if ( class_exists( 'CoAuthors_Guest_Authors' ) ) : ?>

	<!-- wp:co-authors-plus/coauthors {"lock":{"move":true,"remove":true}} -->
	<div class="wp-block-co-authors-plus-coauthors"><!-- wp:co-authors-plus/name {"isLink":true,"lock":{"move":true,"remove":true}} /--></div>
	<!-- /wp:co-authors-plus/coauthors -->

<?php else : ?>

	<!-- wp:post-author {"showAvatar":false,"byline":"By","isLink":true,"lock":{"move":true,"remove":true}} /-->

<?php endif; ?>

<!-- wp:post-date {"format":"F j, Y","lock":{"move":true,"remove":true}} /--></div>
<!-- /wp:group -->
