# Componentized WordPress Starter Theme

Modern frameworks like React have taught the web development community that separating files by their type in projects is not really a separation of concerns. You codebase may look more organized, but in practice, it just makes the parts that make up each part of the site (markup, styles & JS) more spread out and difficult to keep in sync with one another.

This is a WordPress starter theme with support for "components". Each component gets its own folder, containing the PHP, SASS styles and JS that it requires. This offers true separation of concerns, since it allows you to work on a single component in isolation. A single component's files look like this:

```
.
└── example
    ├── example.js
    ├── example.php
    └── example.scss
```

When a component needs its markup, styles or JS tweaked, you know exactly where to go in the codebase to access all three. What if a particular component isn't needed anymore? You can simply delete it's folder and know that all of its markup, styles and JS have been cleanly removed from the codebase. This helps cut down on the problem of no-longer-needed code accumulating over time.

## Project Folders & Files
`css/source` - This is where you'll write your global styles using SASS. The base styles included with the theme are taken straight from [Underscores](http://underscores.me/).

`js/concat`  - This is where you'll include any JavaScript files that should be concatenated together and run globally on the site.

`blocks` - This is where you will create new component folders, with any PHP, SASS and JS they require inside.

The other folders such as `inc` and `template-parts` as well as the files in the root theme directory will be familiar to you if you've worked on WordPress themes before. They're all taken from [Underscores](http://underscores.me/), with a few minor tweaks made.

## Build Tool
Gulp is used as the build tool. It is configured to take all of the global JS as well as the component-specific JS, then concatenate and minify them into a single JS file that is served to the client. All JS is run through Babel, so you can write in ES6+ syntax.

Likewise, Gulp also takes all of the global SASS and component-specific SASS, compiles, concatenates and minifies them into a single stylesheet that is served to the client. Styles are run through Autoprefixer and PostCSS.

BrowserSync is supported. To use it, run `gulp watch` and visit your local site on port 3000, like this: `https://my-local-site.test:3000`.

See the bottom of `Gulpfile.js` for the available tasks.

## Getting Started

- Do a global search & replace to swap out `RT3_Think_Tank`, `rt3_think_tank`, `rt3-think-tank` and `rt3thinktank` with the strings appropriate for your theme.
- Replace `screenshot.png` with the screenshot for your theme.
- Update the header block of `/css/source/style.scss` with the info appropriate for your theme.
- Update the BrowserSync URL in `Gulpfile.js` from `https://rt3thinktank.test` to your local development URL.
- Build a great theme :)
