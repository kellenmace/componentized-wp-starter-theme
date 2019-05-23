<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 */

rt3_render_component('header');
?>

	<section id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<h1 class="page-title">
					<?php
					/* translators: %s: search query. */
					printf( esc_html__( 'Search Results for: %s', 'rt3-think-tank' ), '<span>' . get_search_query() . '</span>' );
					?>
				</h1>
			</header><!-- .page-header -->

			<?php
			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/**
				 * Run the loop for the search to output the results.
				 */
				rt3_render_component('content-search');

			endwhile;

			the_posts_navigation();

		else :

			rt3_render_component('content-none');

		endif;
		?>

		</main><!-- #main -->
	</section><!-- #primary -->

<?php
rt3_render_component('sidebar');
rt3_render_component('footer');
