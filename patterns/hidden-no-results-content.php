<?php
/**
 * Title: Hidden No Results Content
 * Slug: newspack-block-theme/hidden-no-results-content
 * Inserter: no
 *
 * @package Newspack_Block_Theme
 */

?>
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:spacer {"height":"var:preset|spacing|50"} -->
<div style="height:var(--wp--preset--spacing--50)" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:paragraph {"fontSize":"x-large"} -->
<p class="has-x-large-font-size"><?php echo esc_html_x( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'Message explaining that there are no results returned from a search', 'newspack-block-theme' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"var:preset|spacing|70"} -->
<div style="height:var(--wp--preset--spacing--70)" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"align":"wide","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"fontSize":"x-large"} -->
<h2 class="wp-block-heading alignwide has-x-large-font-size" style="margin-bottom:var(--wp--preset--spacing--50)">Latest articles</h2>
<!-- /wp:heading -->

<!-- wp:newspack-blocks/homepage-articles {"showAvatar":false,"postLayout":"grid","columns":4,"postsToShow":4,"typeScale":3,"align":"wide"} /--></div>
<!-- /wp:group -->
