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

exports.doesProjectPassTests = function(name, URL) {

  // If elements don't appear within 1 minute, it's definitely an error.
  const elementTimeout = 60000;

  // Build a file name for screenshots. Example:
  // 'test-result-D3-Heat-Map.png'
  var fileName = 'test-result-' + name.replace(/ /g, '-') + '.png';

  // If all of the project tests pass, this is set to true.
  var success = false;

  let chrome = require('selenium-webdriver/chrome');

  // TODO: We should change this to the generic driver build instead of using
  // the chrome specific code. The chrome specific code was just to capture
  // the log file when we were getting js injection errors.
  let service = new chrome.ServiceBuilder()
    .loggingTo('./chromedrive.log')
    .enableVerboseLogging()
    .build();

  let options = new chrome.Options();
  // configure browser options.
  options.addArguments('start-maximized');

  let driver = chrome.Driver.createSession(options, service);

  // Create the browser, load the page, and give it some time to complete.
  /*
  var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions()
    .build();
  */

  driver.get(URL);
  driver.sleep(5000);

  // This next section removes bundle.js, and then injects our local version
  // of bundle.js.

  // Click on the "Edit Settings" button.
  driver.wait(
    until.elementLocated(By.id('edit-settings')),
    elementTimeout
  ).click();

  // Wait for the item settings modal.
  driver.wait(
    until.elementLocated(By.id('item-settings-modal')),
    elementTimeout
  );

  // Click on "Behavior" settings tab.
  driver.wait(
    until.elementLocated(By.id('settings-behavior-tab')),
    elementTimeout
  ).click();

  // Make sure "Auto-Updating Preview" is checked. With it checked, we do not
  // need to click the "Run" button after making changes.
  var elementAutoRun = driver.wait(
    until.elementLocated(By.id('auto-run')),
    elementTimeout
  );

  elementAutoRun.getAttribute('checked')
  .then(function(checked) {
    if (!checked) {
      elementAutoRun.click();
    }
  });

  driver.sleep(5000);

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
          elem.sendKeys('https://127.0.0.1:8080/bundle.js');
        }
      });
    });
  });

  driver.sleep(5000);

  // Close the modal.
  driver.wait(
    until.elementLocated(By.id('close-settings')),
    elementTimeout
  ).click();

  driver.sleep(5000);

  // Re-run the web page.
  /*
  driver.wait(
    until.elementLocated(By.id('run')),
    elementTimeout
  ).click();
  */

  // Inject the local version of bundle.js.
  /*
  var bundleScript = fs.readFileSync(
    './build/bundle.js',
    'utf8'
  );

  driver.sleep(5000);

  driver.executeScript(bundleScript)
  .then(function(returnVal) {
    console.log('executeScript returnVal');
    console.log(returnVal);
  });

  driver.sleep(10000);
  */

  // Change the CodePen view to put the editor on the left side, so it is easier
  // to see errors. And give the page a couple seconds to adjust the layout.
  driver.wait(
    until.elementLocated(By.id('view-switcher-button')),
    elementTimeout
  ).click();

  driver.wait(
    until.elementLocated(By.id('left-layout')),
    elementTimeout
  ).click();

  driver.wait(
    until.elementLocated(By.id('view-switcher-button')),
    elementTimeout
  ).click();

  driver.sleep(2000);

  // Switch to the CodePen output frame. This is the frame where the
  // project web page is displayed.
  driver.switchTo().frame(0);
  driver.sleep(2000);

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

  // Click the "Tests" button to show the detailed results.
  element.click();

  // Wait for the test results modal.
  driver.wait(until.elementLocated(
    By.className('fcc_test_message-box-shown')),
    elementTimeout
  );

  // Message box fades in, so wait a little before grabbing the screenshot.
  driver.sleep(1000);

  // Grab a screenshot and write to disk.
  // TODO: Do we want to grab screenshots for success?
  driver.takeScreenshot()
  .then(function(data) {
    var base64Data = data.replace(/^data:image\/png;base64,/, '');
    fs.writeFile(
      fileName,
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
