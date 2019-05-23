<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

rt3_render_component('header');
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<?php
				the_archive_title( '<h1 class="page-title">', '</h1>' );
				the_archive_description( '<div class="archive-description">', '</div>' );
				?>
			</header><!-- .page-header -->

			<?php
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
