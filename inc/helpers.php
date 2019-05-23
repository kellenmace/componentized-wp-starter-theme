<?php

/**
 * Render a component.
 *
 * @param string $component The name of the component, such as 'header'.
 * @param array  $props     (optional) Props to make available to the component.
 */
function rt3_render_component( string $component, array $props = [] ) {
	require get_stylesheet_directory() . "/components/{$component}/{$component}.php";
}

/**
 * Determine whether a component exists.
 *
 * @param  string $component The name of the component, such as 'header'.
 *
 * @return bool Whether the component exists.
 */
function rt3_does_component_exist( string $component ) : bool {
	return is_readable( get_stylesheet_directory() . "/components/{$component}/{$component}.php" );
}

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function rt3_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'rt3_pingback_header' );
