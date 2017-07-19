/* global isMacOS, bundleUrl, browserMaxWidth, browserMaxHeight, screenshotDir
*/

/*
 * Automates testing of a testable project. In a nutshell, it does everything
 * you would do if you had to test a testable FCC CodePen project manually.
 *
 * It uses Selenium to:
 * - Get the CodePen project webpage and change to the "Full Page" view.
 * - Click on the "Run Tests" button.
 * - Wait for the "Tests" button to show failure or success.
 * - Click on the "Tests" button to see the results.
 * - Grab a screenshot of the results and save it to disk.
 *
 */

// Chromedriver is used by Selenium and requiring the module avoids having to
// download and install the executable from Google along with setting the path.
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "chromedriver" }] */
var chromedriver = require('chromedriver');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

// Used to save screenshots.
var fs = require('fs');
var path = require('path');

exports.doesProjectPassTests = function(name, URL) {

  // If elements don't appear within 1 minute, it's definitely an error.
  const elementTimeout = 60000;

  // Build a file name for screenshots. Example:
  // 'test-result-D3-Heat-Map.png'
  var fileName = 'test-result-' + name.replace(/ /g, '-') + '.png';

  // If all of the project tests pass, this is set to true.
  var success = false;

  let chrome = require('selenium-webdriver/chrome');

  // TODO: delete the chrome specific code below on the next commit.
  // The chrome specific code was just to capture
  // the log file when we were getting js injection errors.
  /*
  let service = new chrome.ServiceBuilder()
    .loggingTo('./chromedrive.log')
    .enableVerboseLogging()
    .build();

  let options = new chrome.Options();
  // configure browser options.
  options.addArguments('start-maximized');

  let driver = chrome.Driver.createSession(options, service);
  */

  // Set up Chrome options.
  let options = new chrome.Options();
  options.addArguments('start-maximized');

  // Create the browser, load the page, and give it some time to complete.
  var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  // Mac OS for some reason doesn't like the 'start-maximized' flag, so we
  // maximize the window based on the Mocha setup.js file.
  if (isMacOS) {
    driver.manage().window().setPosition(0, 0);
    driver.manage().window().setSize(browserMaxWidth, browserMaxHeight);
  }

  // Get the specified URL.
  driver.get(URL);

  // Change the CodePen view to put the editor on the left side, so it is easier
  // to see the project tests output.
  driver.wait(
    until.elementLocated(By.id('view-switcher-button')),
    elementTimeout
  ).click();

  driver.wait(
    until.elementLocated(By.id('left-layout')),
    elementTimeout
  ).click();

  // Need to click again to hide the view switcher.
  driver.wait(
    until.elementLocated(By.id('view-switcher-button')),
    elementTimeout
  ).click();

  // Now we need to change some settings.

  // Click on the "Edit Settings" button.
  driver.wait(
    until.elementLocated(By.id('edit-settings')),
    elementTimeout
  ).click();

  // Wait for the item settings modal.
  driver.wait(
    until.elementLocated(By.css('#item-settings-modal.open')),
    elementTimeout
  );

  // Click on "Behavior" settings tab.
  driver.wait(
    until.elementLocated(By.id('settings-behavior-tab')),
    elementTimeout
  ).click();

  // Wait until it is the active tab.
  driver.wait(
    until.elementLocated(By.css('#settings-behavior.active')),
    elementTimeout
  );

  // Make sure "Auto-Updating Preview" is not checked. This means we will need
  // to click the "Run" button after making changes. This is more reliable than
  // waiting for the page to refresh on its own.
  var elementAutoRun = driver.wait(
    until.elementLocated(By.id('auto-run')),
    elementTimeout
  );

  elementAutoRun.getAttribute('checked')
  .then(function(checked) {
    if (checked) {
      elementAutoRun.click();
    }
  });

  // This next section changes the javascript settings to remove the CDN
  // bundle.js and use our local bundle.js from the URL specified in the Mocha
  // setup.js file.

  // Click on javascript settings.
  driver.wait(
    until.elementLocated(By.id('settings-js-tab')),
    elementTimeout
  ).click();

  // Find the bundle.js input row and set it to blank.
  // TODO: Put the var declaration elsewhere.
  var javascriptRows = driver.findElements(
    By.className('js-resource external-resource tt-input')
  );

  javascriptRows.then(function(webElems) {
    webElems.forEach(function(elem) {
      var value = elem.getAttribute('value');
      value.then(function(val) {
        if (val.includes('bundle.js', 0)) {
          elem.clear();
          elem.sendKeys(bundleUrl);
        }
      });
    });
  });

  // We are done changing the settings. Close the modal.
  driver.wait(
    until.elementLocated(By.id('close-settings')),
    elementTimeout
  ).click();

  // Re-run the web page and detect when is reloaded. The way we do this is a
  // little tricky. We get the id of the current "results" iframe and then
  // detect when it is no longer present. Which means the new iframe is
  // available.

  let iframeElem = driver.wait(
    until.elementLocated(By.className('result-iframe')),
    elementTimeout
  );

  // Now we click the run button...
  driver.wait(
    until.elementLocated(By.id('run')),
    elementTimeout
  ).click();

  // And wait for the current iframe to no longer exist.
  driver.wait(
    until.stalenessOf(iframeElem),
    elementTimeout
  );

  // Switch to the CodePen output frame. This is the frame where the
  // newly refreshed project web page is displayed.
  driver.wait(
    until.ableToSwitchToFrame(0),
    elementTimeout
  );

  // Run the tests by clicking the test button after the element appears.
  driver.wait(
    until.elementLocated(By.id('fcc_test_message-box-rerun-button')),
    elementTimeout
  ).click();

  // Wait for the "success" or "error" class to be added to the "Tests" button.
  // Note we save the element in a var which is used below.
  var element = driver.wait(
    until.elementLocated(
      By.css('.fcc_test_btn-error, .fcc_test_btn-success')
    ),
    elementTimeout
  );

  // Determine success by checking for the class that is added to the "Tests"
  // button when all tests are succesful.
  element.getAttribute('class')
  .then(function(classes) {
    success = classes.includes('fcc_test_btn-success', 0);
  });

  element.click();
  // Click the "Tests" button to show the detailed results.

  // Wait for the test results modal. The message box fades in, so we wait for
  // opacity of 1 before grabbing the screenshot.
  driver.wait(until.elementLocated(
    By.className('fcc_test_message-box-shown')),
    elementTimeout
  )
  .then(function(elem) {
    driver.wait(function() {
      return elem.getCssValue('opacity')
      .then(function(opacity) {
        return opacity === '1';
      });
    });
  });

  // Grab a screenshot and write to disk.
  // TODO: Do we want to grab screenshots for success?
  driver.takeScreenshot()
  .then(function(data) {
    var base64Data = data.replace(/^data:image\/png;base64,/, '');
    fs.writeFile(
      path.join(screenshotDir, fileName),
      base64Data,
      'base64',
      function(err) {
       if (err) { console.log(err); }
      }
    );
  });

  // We are done. Close the browser and return with success status. We return
  // the promise so Mocha will wait correctly for these tests to finish.
  return driver.quit()
  .then(function() {
    return success;
  });
};
