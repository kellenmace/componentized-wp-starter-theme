/* eslint-disable */

// Require dependencies.
const autoprefixer = require( 'autoprefixer' );
const babel = require( 'gulp-babel' );
const browserSync = require( 'browser-sync' );
const concat = require( 'gulp-concat' );
const cssnano = require( 'gulp-cssnano' );
const del = require( 'del' );
const gulp = require( 'gulp' );
const gutil = require( 'gulp-util' );
const notify = require( 'gulp-notify' );
const plumber = require( 'gulp-plumber' );
const postcss = require( 'gulp-postcss' );
const rename = require( 'gulp-rename' );
const replace = require( 'gulp-replace' );
const sass = require( 'gulp-sass' );
const sort = require( 'gulp-sort' );
const sourcemaps = require( 'gulp-sourcemaps' );
const uglify = require( 'gulp-uglify' );
const wpPot = require( 'gulp-wp-pot' );

// Set assets paths.
const paths = {
	'css': [ './*.css', '!*.min.css' ],
	'php': [ './*.php', './**/*.php' ],
	'mainSass': 'css/source/**/*.scss',
	'componentSass': 'components/**/*.scss',
	'concatScripts': 'js/concat/*.js',
	'componentScripts': 'components/**/*.js',
	'scripts': [ 'js/*.js', '!js/*.min.js' ]
};

/**
 * Handle errors and alert the user.
 */
function handleErrors() {
	const args = Array.prototype.slice.call( arguments );

	notify.onError( {
		'title': 'Task Failed [<%= error.message %>',
		'message': 'See console.',
		'sound': 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	} ).apply( this, args );

	gutil.beep();       // Beep 'sosumi' again.
	this.emit( 'end' ); // Prevent the 'watch' task from stopping.
}

/**
 * Delete style.css and style.min.css before styles are compiled.
 */
gulp.task( 'clean:styles', () =>
	del( [ 'style.css', 'style.min.css', 'css/compiled/main.css', 'css/compiled/components.css' ] )
);

/**
 * Compile main styles using LibSass.
 *
 * https://www.npmjs.com/package/gulp-concat
 * https://www.npmjs.com/package/gulp-sass
 */
gulp.task( 'styles-main', [ 'clean:styles' ], () =>
	gulp.src( paths.mainSass )
		.pipe( plumber( {'errorHandler': handleErrors} ) )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded'
        } ) )		
        .pipe( concat('main.css') ) // Create main.css.
        .pipe( gulp.dest( 'css/compiled' ) )
		.pipe( browserSync.stream() )
);

/**
 * Compile components styles using LibSass.
 *
 * https://www.npmjs.com/package/gulp-concat
 * https://www.npmjs.com/package/gulp-sass
 */
gulp.task( 'styles-components', [ 'clean:styles' ], () =>
	gulp.src( paths.componentSass )
		.pipe( plumber( {'errorHandler': handleErrors} ) )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded'
        } ) )
        .pipe( concat('components.css') ) // Create components.css.
        .pipe( gulp.dest( 'css/compiled' ) )
		.pipe( browserSync.stream() )
);

/**
 * Combine main.css and components.css into a single style.css file.
 * Create a sourcemap and run through PostCSS.
 *
 * https://www.npmjs.com/package/gulp-concat
 * https://www.npmjs.com/package/gulp-postcss
 * https://www.npmjs.com/package/gulp-autoprefixer
 */
gulp.task( 'styles-combine', [ 'styles-main', 'styles-components' ], () => {
    return gulp.src( ['css/compiled/main.css', 'css/compiled/components.css'] )
		.pipe( plumber( {'errorHandler': handleErrors} ) )
		.pipe( sourcemaps.init() )
        .pipe( postcss( [
            autoprefixer( {
                'browsers': [ 'last 2 version' ]
            } )
        ] ) )
		.pipe( sourcemaps.write() )
        .pipe( concat('style.css') ) // Create style.css.
        .pipe( gulp.dest( './' ) )
		.pipe( browserSync.stream() )
  } );

/**
 * Minify & optimize style.css, then output as style.min.css.
 *
 * https://www.npmjs.com/package/gulp-concat
 * https://www.npmjs.com/package/gulp-cssnano
 */
gulp.task( 'cssnano', [ 'styles-combine' ], () =>
	gulp.src( 'style.css' )
		.pipe( plumber( {'errorHandler': handleErrors} ) )
		.pipe( cssnano( {
            safe: true, // Use safe optimizations.
            discardComments: { removeAll: true }
		} ) )
		.pipe( rename( 'style.min.css' ) )
		.pipe( gulp.dest( './' ) )
		.pipe( browserSync.stream() )
);

/**
 * Compile global JS.
 *
 * https://www.npmjs.com/package/gulp-concat
 */
gulp.task( 'js-global', () =>
	gulp.src( paths.concatScripts )
        .pipe( plumber( {'errorHandler': handleErrors} ) )
		.pipe( concat( 'global.js' ) ) // Save global.js.
		.pipe( gulp.dest( 'js/compiled/' ) )
		.pipe( browserSync.stream() )
);

/**
 * Compile components JS.
 *
 * https://www.npmjs.com/package/gulp-concat
 */
gulp.task( 'js-components', () =>
    gulp.src( paths.componentScripts )
        .pipe( plumber( {'errorHandler': handleErrors} ) )
        .pipe( concat( 'components.js' ) )
        .pipe( gulp.dest( 'js/compiled/' ) ) // Save components.js.
        .pipe( browserSync.stream() )
);

/**
 * Combine global.js and components.js into main.js file.
 * Generate a sourcemap and run through Babel.
 *
 * https://www.npmjs.com/package/gulp-concat
 * https://github.com/babel/gulp-babel
 * https://www.npmjs.com/package/gulp-sourcemaps
 */
gulp.task( 'js-combine', ['js-global', 'js-components'], () =>
	gulp.src( ['js/compiled/global.js', 'js/compiled/components.js'] )
        .pipe( plumber( {'errorHandler': handleErrors} ) )
		.pipe( sourcemaps.init() )
		.pipe( babel( { // Convert ES6+ to ES2015.
			'presets': [
				[ 'env', {
					'targets': {
						'browsers': [ 'last 2 versions' ]
					}
				} ]
			]
		} ) )
		.pipe( concat( 'main.js' ) ) // Save main.js
		.pipe( sourcemaps.write() )
		.pipe( replace( '    ', '\t' ) )
		.pipe( gulp.dest( 'js/' ) )
		.pipe( browserSync.stream() )
		.pipe( replace( '    ', '\t' ) )
);

/**
  * Minify compiled JavaScript.
  *
  * https://www.npmjs.com/package/gulp-uglify
  */
gulp.task( 'uglify', [ 'js-combine' ], () =>
	gulp.src( paths.scripts )
		.pipe( plumber( {'errorHandler': handleErrors} ) )
		.pipe( rename( {'suffix': '.min'} ) )
		.pipe( babel( {
			'presets': [
				[ 'env', {
					'targets': {
						'browsers': [ 'last 2 versions' ]
					}
				} ]
			]
		} ) )
		.pipe( uglify( {
			'mangle': false
		} ) )
		.pipe( gulp.dest( 'js/' ) )
);

/**
 * Delete the theme's .pot before we create a new one.
 */
gulp.task( 'clean:pot', () =>
	del( [ 'languages/rt3-think-tank.pot' ] )
);

/**
 * Scan the theme and create a POT file.
 *
 * https://www.npmjs.com/package/gulp-wp-pot
 */
gulp.task( 'wp-pot', [ 'clean:pot' ], () =>
	gulp.src( paths.php )
		.pipe( plumber( {'errorHandler': handleErrors} ) )
		.pipe( sort() )
		.pipe( wpPot( {
			'domain': 'rt3-think-tank',
			'package': 'rt3-think-tank'
		} ) )
		.pipe( gulp.dest( 'languages/rt3-think-tank.pot' ) )
);

/**
 * Process tasks and reload browsers on file changes.
 *
 * https://www.npmjs.com/package/browser-sync
 */
gulp.task( 'watch', () => {

	// Kick off BrowserSync.
	browserSync( {
		'open': false, // Don't open project in a new tab.
		'injectChanges': true,  // Auto inject changes instead of full reload.
		'proxy': 'https://rt3thinktank.test', // Visit https://rt3thinktank.test:3000 to use BrowserSync.
		'watchOptions': {
			'debounceDelay': 500 // Wait 500ms second before injecting.
		}
	} );

	// Run tasks when files change.
	gulp.watch( paths.mainSass, [ 'styles' ] );
	gulp.watch( paths.componentSass, [ 'styles' ] );
	gulp.watch( paths.concatScripts, [ 'scripts' ] );
	gulp.watch( paths.componentScripts, [ 'scripts' ] );
	gulp.watch( paths.scripts, [ 'scripts' ] );
	gulp.watch( paths.php, [ 'markup' ] );
} );

/**
 * Create individual tasks.
 */
gulp.task( 'styles', [ 'cssnano' ] );
gulp.task( 'scripts', [ 'uglify' ] );
gulp.task( 'i18n', [ 'wp-pot' ] );
gulp.task( 'markup', browserSync.reload );
gulp.task( 'default', [ 'styles', 'scripts', 'i18n' ] );
