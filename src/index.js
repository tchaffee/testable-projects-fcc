/* global projectName */

/*
 This file dynamically generates the user interface for the freeCodeCamp
 testable-projects application. The user interface consists of three main parts:
 1. fCCTestTogglerSkeleton
    A user interface for hiding / showing the test controls:
    a. A toggler for hiding / showing the test controller iframe
       (#fcc_foldout_toggler)
    b. A small read-only indicator in the top-right corner of the viewport that
       shows the pending test project (#fcc_test_suite_indicator_wrapper)
 2. fCCTestSuiteSkeleton
    A <div> situated in the top-left corner of the viewport with controls
    for running the tests
 3. mochaModalSkeleton
    A modal <div id="mocha"> automatically inserted into the document via Mocha

 We can use Webpack to inject loaded css into the document. We maintain three
 css files: one for the test control window (fcc-test-ui.css), one for the
 toggler (fcc-test-toggler.css), and one for the Mocha modal (mocha-modal.css)
*/

import $ from 'jquery';
import chai from 'chai';
// Webpack is configured to load those files with the .html extension as Strings
import fCCTestSuiteSkeleton from './utils/fcc-test-suite-skeleton.html';
import fCCTestTogglerSkeleton from './utils/fcc-test-toggler-skeleton.html';
import mochaModalSkeleton from './utils/mocha-modal-skeleton.html';
// style-loader injects css from css-loader into document
/* eslint import/no-unresolved: [2, { ignore: ['!style-loader.*$'] }] */
import fCCTestUIStyles from // eslint-disable-line no-unused-vars
  '!style-loader!css-loader!./stylesheets/fcc-test-ui.css';
import mochaModalStyles from // eslint-disable-line no-unused-vars
  '!style-loader!css-loader!./stylesheets/mocha-modal.css';
import createFontsAsFriendsTests from
  './project-tests/fonts-as-friends';
import fCCTestTogglerStyles from // eslint-disable-line no-unused-vars
  '!style-loader!css-loader!./stylesheets/fcc-test-toggler.css';
import createInformationalArticleTests from
  './project-tests/informational-article';
import createProductLandingPageHTMLTests from
  './project-tests/product-landing-page-html-only';
import createTributePageHTMLTests from
  './project-tests/tribute-page-tests-html-only';
import createTributePageTests from './project-tests/tribute-page-tests';

export const assert = chai.assert;

let projectNameLocal = false;

// Load mocha.
(function() {
  var mochaCdn = document.createElement('script');
  mochaCdn.setAttribute(
    'src',
    'https://cdnjs.cloudflare.com/ajax/libs/mocha/3.0.2/mocha.min.js'
  );
  document.head.appendChild(mochaCdn);
})();

// When the document is fully loaded, create the "Tests" button and the
// corresponding modal window, (jquery required)
$(document).ready(function() {
  // Alert users about cross-browser compatibility issues.
  const isChrome = !!window.chrome && !!window.chrome.webstore;
  if (isChrome === false) {
    alertOnce(
      'Intro Alert',
      'Test suites are currently optimized for the Chrome browser. Please ' +
      'use Chrome for the best user experience. ' +
      'Thanks and Happy Coding!'
    );
  }
  // Check mocha is loaded and populate test suite.
  let mochaCheck = setInterval(() => runCheck(), 50);

  function runCheck() {
    try {
      if (mocha) {
        clearInterval(mochaCheck);
        mocha.setup('bdd');

        // Once testFrame is loaded:
        let projectTitleCase = localStorage.getItem('projectTitleCase');
        // projectName variable is defined in our example projects so the
        // correct test suite is automatically loaded. This sets default text
        // for <option> text and project indicator in top right corner.
        if (typeof projectName !== 'undefined') {
          projectNameLocal = projectName;
        }

        // Create the test UI and its contents.
        // Using the 'fcc_test_ui' CSS class allows us to set some reasonable
        // CSS defaults that will be inherited for all child elements, making it
        // harder for user code to override our test UI CSS.
        // fCCTestTogglerSkeleton has the html for the toggle buttons.
        // testFrameBody contains the main test UI.
        // The mochaModal is where the test output goes.
        const fCCToggle = document.createElement('div');
        fCCToggle.className = 'fcc_test_ui';
        fCCToggle.innerHTML = fCCTestTogglerSkeleton;
        document.body.appendChild(fCCToggle);

        const testFrameBody = document.createElement('div');
        testFrameBody.setAttribute('id', 'fcc_foldout_menu');
        testFrameBody.innerHTML = fCCTestSuiteSkeleton;
        fCCToggle.appendChild(testFrameBody);

        const mochaModal = document.createElement('div');
        mochaModal.className = 'fcc_test_ui';
        mochaModal.innerHTML = mochaModalSkeleton;
        document.body.appendChild(mochaModal);

        let toggleElement = document.getElementById('fcc_toggle');
        let indicatorWrapper = document.getElementById(
          'fcc_test_suite_indicator_wrapper'
        );

        // Determine placeholder for the 'select' dropdown element.
        let placeholder = document.getElementById('placeholder');

        if ((!projectNameLocal) && (projectTitleCase === null)) {
          placeholder.innerHTML = '- - -';
          indicatorWrapper.innerHTML = '';
        } else if (projectNameLocal) {
          placeholder.innerHTML =
            `${localStorage.getItem('example_project')}`;
          indicatorWrapper.innerHTML =
            '<span id=fcc_test_suite_indicator>FCC Test Suite: ' +
            `${localStorage.getItem('example_project')}</span>`;
        } else {
          placeholder.innerHTML = projectTitleCase;
          indicatorWrapper.innerHTML =
            '<span id=fcc_test_suite_indicator>FCC Test Suite: ' +
            `${projectTitleCase}</span>`;
        }
        // If this is the first time loading this project, show test window
        if (!localStorage.getItem(
          'fCC_' + localStorage.getItem('project_selector') + '_hide'
          )) {
          toggleElement.checked = false;
        } else {
          // If student has hidden the test window once, keep it hidden.
          hamburgerTransform();
          toggleElement.checked = true;
        }
      }
    } catch (err) {
      console.warn('mocha not loaded yet');
    }
  }
  runCheck();
});

// UTILITY FUNCTIONS:

// Select project dropdown.
export function selectProject(project) {
  localStorage.removeItem(
  'fCC_' + project + '_hide'
  );
  // Store project_selector for initTestRunner function.
  localStorage.setItem('project_selector', project);
  // Create & store pretty-print project name for display in indicator div.
  let projectTitleCase = project.replace(/-/g, ' ').split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substr(1)).join(' ');
  document.getElementById(
    'fcc_test_suite_indicator_wrapper'
  ).innerHTML =
    '<span id=fcc_test_suite_indicator>FCC Test Suite: ' +
    `${projectTitleCase}</span>`;
  localStorage.setItem('projectTitleCase', projectTitleCase);
}

// Updates the button color and text on the target project, to show how many
// tests passed and how many failed.
export function FCCUpdateTestResult(nbTests, nbPassed, nbFailed) {
  const button = document.getElementById('fcc_test_button');
  button.innerHTML = `Tests ${nbPassed}/${nbTests}`;
  if (nbFailed) {
    button.classList.add('fcc_test_btn-error');
  } else {
    button.classList.add('fcc_test_btn-success');
  }
}

// Updates the button text on the target project, to show how many tests were
// executed so far.
export function FCCUpdateTestProgress(nbTests, nbTestsExecuted) {
  const button = document.getElementById('fcc_test_button');
  button.classList.add('fcc_test_btn-executing');
  button.innerHTML = `Testing ${nbTestsExecuted}/${nbTests}`;
}

// Open the main modal.
export function FCCOpenTestModal() {
  const modal = document.getElementById('fcc_test_message-box');
  modal.classList.remove('fcc_test_message-box-hidden');
  modal.classList.add('fcc_test_message-box-shown');
}

// Close the main modal.
export function FCCCloseTestModal() {
  const modal = document.getElementById('fcc_test_message-box');
  modal.classList.remove('fcc_test_message-box-shown');
  modal.classList.add('fcc_test_message-box-hidden');
}

// Close modal on ESC press.
$(document).keyup(function(e) {
  e = e || window.event;
  if (e.keyCode === 27) {
    FCCCloseTestModal();
  }
});

// Close modal on click outside el.
export function FCCclickOutsideToCloseModal(e) {
  if (e.target.id === 'fcc_test_message-box') {
    FCCCloseTestModal();
  }
}

// Cannot reset classList with an = assignment due to cross-browser conflicts.
// TODO: Refactor to eliminate for loops. The first for loop is simply:
// let classListArray = [].slice.call(elem.classList);
function clearClassList(elem) {
  var classListAsArray = new Array(elem.classList.length);

  for (var i = 0; i < elem.classList.length; i++) {
    classListAsArray[i] = elem.classList[i];
  }

  for (var j = 0; j < classListAsArray.length; j++) {
    elem.classList.remove(classListAsArray[j]);
  }
}

// run tests
export function FCCRerunTests() {
  const button = document.getElementById('fcc_test_button');
  button.innerHTML = (!projectNameLocal) &&
    (!localStorage.getItem('project_selector'))
    ? 'Load Tests!'
    : 'Testing';
  button.title = (!projectNameLocal) &&
    (!localStorage.getItem('project_selector'))
    ? 'Select test suite from dropdown above'
    : 'CTRL + SHIFT + T';
  clearClassList(button);
  button.classList.add('fcc_foldout_buttons');
  button.classList.add('fcc_test_btn-default');
  FCCInitTestRunner();
}

// Reset tests.
export function FCCResetTests(suite) {
  suite.tests.forEach(function(t) {
    delete t.state;
    t.timedOut = false;
  });
  suite.suites.forEach(FCCResetTests);
}

// Shortcut keys.
// TODO: Need better inline docs on why we need to redefine the global
// onkeydown and onkeyup.
const map = [];
/* global onkeydown:true, onkeyup:true */
/* exported onkeydown, onkeyup */
onkeydown = onkeyup = function(e) {
  const modal = document.getElementById('fcc_test_message-box');
  e = e || window.event;
  map[e.keyCode] = e.type === 'keydown';
  // run tests: Ctrl + Shift + Enter
  if (map[17] && map[16] && map[13]) {
    if (localStorage.getItem('project_selector') === 'markdown-previewer') {
      alertOnce(
        'alerted',
        'Run-Test hotkey disabled for this project, please use mouse.'
      );
      return;
    } else {
      FCCRerunTests();
    }
  // Open/close modal: Ctrl + Shift + T.
  } else if (map[17] && map[16] && map[84]) {
    if (modal.classList.contains('fcc_test_message-box-hidden')) {
      FCCOpenTestModal();
    } else {
      FCCCloseTestModal();
    }
  // Open/close foldout menu: Ctrl + Shift + O.
  } else if (map[17] && map[16] && map[79]) {
    document.getElementById('fcc_toggle').click();
  }
};

// Shortcuts interfere w/ markdown tests, disable and alert.
export function alertOnce(item, message) {
  const alerted = sessionStorage.getItem(item) || false;
  if (alerted) {
    return;
  } else {
    /* eslint no-alert: "off" */
    alert(message);
    sessionStorage.setItem(item, true);
  }
}

// Hamburger menu transformation
export function hamburgerTransform() {
  if (document.getElementById('hamburger_top').classList.contains(
    'transform_top')
  ) {
    document.getElementById('hamburger_top').classList.remove(
      'transform_top'
    );
    document.getElementById('hamburger_middle').classList.remove(
      'transform_middle'
    );
    document.getElementById('hamburger_bottom').classList.remove(
      'transform_bottom'
    );
    // Once the student has hidden the test window, this localStorage variable
    // keeps it hidden until manually toggled.
    localStorage.setItem(
      'fCC_' + localStorage.getItem('project_selector') + '_hide', true
    );
  } else {
    document.getElementById('hamburger_top').classList.add(
      'transform_top'
    );
    document.getElementById('hamburger_middle').classList.add(
      'transform_middle'
    );
    document.getElementById('hamburger_bottom').classList.add(
      'transform_bottom'
    );
  }
}

// Init tests.
export function FCCInitTestRunner() {
  let testRunner = null;
  // Empty the mocha tag in case of rerun.
  document.querySelector('.fcc_test_message-box-body #mocha').innerHTML = '';
  // Empty the test suite in the mocha object.
  mocha.suite.suites = [];
  // Check for hard-coded project selector (for our example projects).
  const hardCodedProjectName = (!projectNameLocal)
    ? null
    : projectNameLocal;
  // create tests
  switch (hardCodedProjectName || localStorage.getItem('project_selector')) {
    case 'fonts-as-friends':
      createFontsAsFriendsTests();
      break;
    case 'informational-article':
      createInformationalArticleTests();
      break;
    case 'product-landing-page-html-only':
      createProductLandingPageHTMLTests();
      break;
    case 'random-quote-machine':
      createRandomQuoteMachineTests();
      break;
    case 'javascript-calculator':
      createCalculatorTests();
      break;
    case 'pomodoro-clock':
      createPomodoroClockTests();
      break;
    case 'tribute-page-html-only':
      createTributePageHTMLTests();
      break;
    case 'tribute-page':
      createTributePageTests();
      break;
    case 'drum-machine':
      createDrumMachineTests();
      break;
    case 'portfolio':
      createPortfolioTests();
      break;
    case 'product-landing-page':
      createProductLandingPageTests();
      break;
    case 'survey-form':
      createSurveyFormTests();
      break;
    case 'markdown-previewer':
      createMarkdownPreviewerTests();
      break;
    case 'technical-docs-page':
      createTechnicalDocsPageTests();
      break;
    case 'bar-chart':
      createBarChartTests();
      break;
    case 'scatter-plot':
      createScatterPlotTests();
      break;
    case 'choropleth':
      createChoroplethTests();
      break;
    case 'heat-map':
      createHeatMapTests();
      break;
    case 'tree-map':
      createTreeMapTests();
      break;
    default:
      // Do nothing.
  }

  // Save the number of tests in the selected suite.
  let nbTests = 0;
  mocha.suite.eachTest(() => nbTests++);
  let nbTestsExecuted = 0;
  let nbPassed = 0;
  let nbFailed = 0;
  const hasPassed = () => nbPassed++;
  const hasFailed = () => nbFailed++;
  const updateProgress = () =>
    FCCUpdateTestProgress(nbTests, ++nbTestsExecuted);
  const updateEnd = () =>
    FCCUpdateTestResult && FCCUpdateTestResult(nbTests, nbPassed, nbFailed);
  if (testRunner) {
    FCCResetTests(mocha.suite);
    testRunner.abort();
    testRunner.removeListener('pass', hasPassed);
    testRunner.removeListener('fail', hasFailed);
    testRunner.removeListener('test end', updateProgress);
    testRunner.removeListener('end', updateEnd);
  }
  // Run the test suite.
  testRunner = mocha.run();
  testRunner.on('pass', hasPassed);
  testRunner.on('fail', hasFailed);
  testRunner.on('test end', updateProgress);
  // Update the "tests" button caption at the end of the overhall execution.
  testRunner.on('end', updateEnd);
}

// Polyfill for enabling NodeList.forEach() method - IE, Edge, Safari.
(function() {
  if (typeof NodeList.prototype.forEach !== 'function') {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
})();
