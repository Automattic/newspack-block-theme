<?php
/**
 * Title: Avatar, Byline and Date on the same line
 * Slug: newspack-block-theme/post-meta-single-line-avatar
 * Categories: newspack-block-theme-post-meta
 * Viewport Width: 632
 * Block Types: core/avatar, core/post-author, core/post-date, jetpack/sharing-buttons
 *
 * @package Newspack_Block_Theme
 */

$registry = WP_Block_Type_Registry::get_instance();
?>
<!-- wp:group {"metadata":{"name":"Post Meta"},"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"className":"post-meta","layout":{"type":"constrained"}} -->
<div class="wp-block-group post-meta">

<!-- wp:group {"lock":{"move":false,"remove":true},"metadata":{"name":"Meta"},"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"}} -->
<div class="wp-block-group">

<?php if ( $registry->get_registered( 'co-authors-plus/coauthors' ) ) : ?>

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

<!-- wp:separator {"lock":{"move":true,"remove":false},"style":{"layout":{"selfStretch":"fixed","flexSize":"1px"},"spacing":{"margin":{"top":"0","bottom":"0"}}},"className":"is-style-thick"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-thick" style="margin-top:0;margin-bottom:0"/>
<!-- /wp:separator -->

<!-- wp:post-date {"lock":{"move":true,"remove":true}} /--></div>
<!-- /wp:group -->

<?php if ( $registry->get_registered( 'jetpack/sharing-buttons' ) ) : ?>

<!-- wp:jetpack/sharing-buttons {"styleType":"icon","layout":{"type":"flex","justifyContent":"center"}} -->
<ul class="wp-block-jetpack-sharing-buttons has-normal-icon-size jetpack-sharing-buttons__services-list" id="jetpack-sharing-serivces-list">
	<!-- wp:jetpack/sharing-button {"service":"facebook","label":"Facebook"} /-->
	<!-- wp:jetpack/sharing-button {"service":"x","label":"X"} /-->
	<!-- wp:jetpack/sharing-button {"service":"mail","label":"Mail"} /-->
</ul>
<!-- /wp:jetpack/sharing-buttons -->

<?php endif; ?>

</div>
<!-- /wp:group -->
