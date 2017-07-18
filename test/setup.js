/**
 * Mocha setup.
 *
 */

// The URL you want to be used for the bundle.js when running local tests.
// The below value is typically used when you are using:
// "npm run live-serve-build".
global.bundleUrl = 'https://127.0.0.1:8080/bundle.js';

// Where to save screenshots.
global.screenshotDir = 'test/screenshots';

// If you are on a Mac, the Chrome --start-maximized argument is ignored, so
// you'll need to set isMacOS to true and specify your maximum screen size.
global.isMacOS = false;
global.browserMaxWidth = 1920;
global.browserMaxHeight = 1080;
