# Componentized WordPress Starter Theme

Modern frameworks like [React](https://reactjs.org/) have taught the web development community that segregating files by their type in projects does not offer a true separation of concerns. You codebase may look more organized that way, but in practice, it just makes the pieces that make up each part of the site (markup, styles & JS) more spread out and difficult to keep in sync with one another.

This is a WordPress starter theme with support for "components". Each component gets its own folder, containing the PHP, SASS styles and JS that it requires. This offers true separation of concerns, since it allows you to work on a single component in isolation, with all of its code co-located. A single component's files look like this:

```
.
└── example
    ├── example.js
    ├── example.php
    └── example.scss
```

When a component needs its markup, styles or JS tweaked, you know exactly where to go in the codebase to access all three. What if a particular component isn't needed anymore? You can simply delete it's folder and know that all of its markup, styles and JS have been cleanly removed from the codebase. This helps cut down on the problem of no-longer-needed code accumulating over time.

## Rendering Components and Passing Props

Taking another page out of the React playbook, you can render components anywhere in the theme and pass them an array of props using the `rt3_render_component()` helper function, like this:

Code in a page template (such as `page.php`):
```
$props = [
    'hello_jerry'  => 'Hello, Jerry',
    'hello_newman' => 'Hello, Newman',
];

rt3_render_component( 'greeting', $props );
```

Code in `greeting` component (`/components/greeting/greeting.php`):
```
<p><?php echo 'Newman sees Jerry and says ' . $props['hello_jerry']; ?></p>
<p><?php echo 'Jerry replies with ' . $props['hello_newman']; ?></p>
```

This is an improvement over WP's `get_template_part()`, which does not allow you to pass any arguments (a.k.a. "props") to your template parts.

### Try it Out

The theme ships with an `example` component. You can try out rendering that component and passing it a prop by adding this code to one of your page templates:

```
<?php rt3_render_component( 'example', ['name' => 'George Costanza'] ); ?>
```

The `example.scss` file bundled with the `example` component includes styles that are scoped to it, and the `example.js` file includes JS that sets up a click handler for the component. Looking through those will give you a good feel for how your components can be written.

## Project Folders & Files
`css/source` - This is where you'll write your global styles using SASS. The base styles included with the theme are taken straight from [Underscores](http://underscores.me/).

`js/concat`  - This is where you'll include any JavaScript files that should be concatenated together and run globally on the site.

`components` - This is where you will create new component folders, with any PHP, SASS and JS they require inside. Make sure the name of the folder always matches the name of the php file inside (such as `/example/example.php`). That's necessary for the `rt3_render_component()` function to work.

The other files and folders will likely be familiar to you if you've worked on WordPress themes before. Their code is taken from [Underscores](http://underscores.me/), with the calls to `get_header()`, `get_sidebar()`, `get_footer()` and `get_template_part()` replaced with the `rt3_render_component()` function.

## Build Tool
Gulp is used as the build tool. It is configured to take all of the global JS as well as the component-specific JS, then concatenate and minify them into a single JS file that is served to the client. All JS is run through Babel, so you can write in ES6+ syntax.

Likewise, Gulp also takes all of the global SASS and component-specific SASS, compiles, concatenates and minifies them into a single stylesheet that is served to the client. Styles are run through Autoprefixer and PostCSS to ensure browser compatibility.

BrowserSync is supported. To use it, run `gulp watch` and visit your local site on port 3000, like this: `https://my-local-site.test:3000`.

See the bottom of `Gulpfile.js` for the available tasks.

## Getting Started

1. Rename the theme folder from `rt3-think-tank` to whatever you'd like.
1. Do a global search & replace to swap out `rt3_` (the function prefix) and `rt3-think-tank` (the text domain for translations) with the strings appropriate for your theme.
1. Replace `screenshot.png` with the screenshot for your theme.
1. Update the header block of `/css/source/style.scss` with the info appropriate for your theme.
1. Update the BrowserSync URL in `Gulpfile.js` from `https://rt3thinktank.test` to your local development URL.
1. Build a great theme :)
