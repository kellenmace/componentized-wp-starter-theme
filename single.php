<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 */

rt3_render_component('header');
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

			if ( rt3_does_component_exist( 'content-' . get_post_type() ) ) {
				rt3_render_component( 'content-' . get_post_type() );
			} else {
				rt3_render_component('content-post');
			}

			the_post_navigation();

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template('/components/comments/comments.php');
			endif;

		endwhile; // End of the loop.
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
rt3_render_component('sidebar');
rt3_render_component('footer');
