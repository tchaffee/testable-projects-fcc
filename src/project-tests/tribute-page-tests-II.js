import { assert } from 'chai';
import { beginnerWebProgrammingStack } from '../utils/shared-test-strings';
import { allCSSRulesAsArray, isTestSuiteRule } from
  '../utils/style-sheet-utils';

export default function createTributePageTests() {

  describe('#Tribute Page tests', function() {

    describe('#Technology Stack', function() {
      it(beginnerWebProgrammingStack, function() {
        assert.ok(true);
      });
    });

    describe('#Layout', function() {
      let reqNum = 0;

      it(`${reqNum}. Your CSS must include a style using a class selector of 
      ".main-column". The style should use an auto margin for centering, and
      specify a width of 70%.`,
      function() {

        // Filter to get the .main-column rule.
        let mainColumnRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => rule.selectorText === '.main-column');

        assert.equal(
          mainColumnRule.length,
          1,
          'Could not find a style with using class selector .main-column'
        );

        assert.equal(
          mainColumnRule[0].style.margin,
          '0px auto',
          'The style with class selector .main-column does not have a margin ' +
          ' of "0 auto"'
        );

        assert.equal(
          mainColumnRule[0].style.width,
          '70%',
          'The style with class selector .main-column does not have a width ' +
          ' of "70%"'
        );

      });

      reqNum++;
      it(`${reqNum}. The <img> element should be centered within its parent
      element.`,
      function() {
        const img = document.getElementById('image'),
          imgParent = document.getElementById('image').parentElement,
          imgLeft = img.getBoundingClientRect().left,
          imgRight = img.getBoundingClientRect().right,
          parentLeft = imgParent.getBoundingClientRect().left,
          parentRight = imgParent.getBoundingClientRect().right;
        assert.approximately(
          imgLeft - parentLeft,
          parentRight - imgRight,
          11,
          'Image is not centered'
        );
      });


      // TODO: Can we test for more layout? Italics for blockquote?

    // END #Layout
    });

  // END #TributePageTests
  });

// END createTributePageTests()
}
