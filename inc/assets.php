<?php

/**
 * Enqueue styles.
 */
function rt3_think_tank_enqueue_styles() {
	$suffix = ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG ) ? '' : '.min';
	$path   = "/style{$suffix}.css";

	wp_enqueue_style(
		'rt3-think-tank',
		get_stylesheet_directory_uri() . $path,
		[],
		filemtime( get_stylesheet_directory() . $path )
	);
}
add_action( 'wp_enqueue_scripts', 'rt3_think_tank_enqueue_styles' );

/**
 * Enqueue scripts.
 */
function rt3_think_tank_enqueue_scripts() {
	$suffix = ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG ) ? '' : '.min';
	$path   = "/js/main{$suffix}.js";

	wp_enqueue_script(
		'rt3-think-tank',
		get_stylesheet_directory_uri() . $path,
		[],
		filemtime( get_stylesheet_directory() . $path )
	);
}
add_action( 'wp_enqueue_scripts', 'rt3_think_tank_enqueue_scripts' );
