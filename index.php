<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

rt3_render_component('header');
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php
		if ( have_posts() ) :

			if ( is_home() && ! is_front_page() ) :
				?>
				<header>
					<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
				</header>
				<?php
			endif;

			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/*
				 * Include the Post-Type-specific component for the content.
				 * If you want to override this, then include a component called 
				 * content-___/content-___.php (where ___ is the Post Type name)
				 * and that will be used instead.
				 */
				if ( rt3_does_component_exist( 'content-' . get_post_type() ) ) {
					rt3_render_component( 'content-' . get_post_type() );
				} else {
					rt3_render_component('content-post');
				}

			endwhile;

			the_posts_navigation();

		else :

			rt3_render_component('content-none');

		endif;
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
rt3_render_component('sidebar');
rt3_render_component('footer');
