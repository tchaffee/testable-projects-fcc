/* eslint max-len:
  ["error", { "ignoreTemplateLiterals": true, "ignoreStrings": true }]
*/


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

      reqNum++;
      it(`${reqNum}. Your CSS must include a style using a class selector of ".main-column". The style should use an auto margin and have a width of 70% so that all elements with this class will be centered.`,
      function() {

        // Filter to get the .main-column rule.
        let mainColumnRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === '.main-column');

        assert.equal(
          mainColumnRule.length,
          1,
          'Could not find a style with class selector ".main-column"'
        );

        assert.equal(
          mainColumnRule[0].style.margin,
          '0px auto',
          'The style with class selector ".main-column" does not have a margin of "0 auto"'
        );

        assert.equal(
          mainColumnRule[0].style.width,
          '70%',
          'The style with class selector ".main-column" does not have a width of "70%"'
        );

      });

      reqNum++;
      it(`${reqNum}. Change the style with selector ".main-column" to use a background-color of "#96CFE5" so you can see the size of the elements that use this class.`,
      function() {

        // Filter to get the .main-column rule.
        let mainColumnRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === '.main-column');

        assert.equal(
          mainColumnRule.length,
          1,
          'Could not find a style with class selector ".main-column"'
        );

        assert.equal(
          mainColumnRule[0].style['background-color'],
          'rgb(150, 207, 229)',
          'The style with class selector ".main-column" does not have a background-color of "#96CFE5"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your CSS must include a style using a class selector of ".page-title". The style should give a bottom and top margin of "20px" and use the text-align property with a value of "center".`,
      function() {

        // Filter to get the CSS rule.
        let cssRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === '.page-title');

        assert.equal(
          cssRule.length,
          1,
          'Could not find a style with class selector .page-title'
        );

        assert.equal(
          cssRule[0].style['margin-top'],
          '20px',
          'The style with class selector ".page-title" does not have a margin-top of "20px"'
        );

        assert.equal(
          cssRule[0].style['margin-bottom'],
          '20px',
          'The style with class selector ".page-title" does not have a margin-bottom of "20px"'
        );

        assert.equal(
          cssRule[0].style['text-align'],
          'center',
          'The style with class selector ".page-title" does not have a text-align property with the value of "center"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your <h1> element with class "page-title" must also have the class "main-column".`,
      function() {

        let elem = document.querySelector('h1.page-title.main-column');

        assert.isNotNull(
          elem,
          'Could not find an <h1> element with the classes "page-title" and "main-column"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your CSS must include a style using a class selector of ".page-subtitle". The style should give a bottom margin of "15px" and use the text-align property with a value of "center".`,
      function() {

        // Filter to get the CSS rule.
        let cssRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === '.page-subtitle');

        assert.equal(
          cssRule.length,
          1,
          'Could not find a style with class selector .page-subtitle'
        );

        assert.equal(
          cssRule[0].style['margin-bottom'],
          '15px',
          'The style with class selector ".page-subtitle" does not have a margin-bottom of "15px"'
        );

        assert.equal(
          cssRule[0].style['text-align'],
          'center',
          'The style with class selector ".page-subtitle" does not have a text-align property with the value of "center"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your <h2> element with class "page-subtitle" must also have the class "main-column" so that it is centered.`,
      function() {

        let elem = document.querySelector('h2.page-subtitle.main-column');

        assert.isNotNull(
          elem,
          'Could not find an <h2> element with the classes "page-subtitle" and "main-column"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your <img> element with class "tribute-photo" must also have the class "main-column".`,
      function() {

        let elem = document.querySelector('img.tribute-photo.main-column');

        assert.isNotNull(
          elem,
          'Could not find an <img> element with the classes "tribute-photo" and "main-column"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your CSS must include a style using a class selector of ".tribute-photo". The style should have a "display" property with a value of "block" so that the image is centered.`,
      function() {

        // Filter to get the CSS rule.
        let cssRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === '.tribute-photo');

        assert.equal(
          cssRule.length,
          1,
          'Could not find a style with class selector .tribute-photo'
        );

        assert.equal(
          cssRule[0].style['display'],
          'block',
          'The style with class selector ".tribute-photo" does not have a "display" property with the value of "block"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your CSS must include a style using a class selector of ".img-caption". The style should have a top margin of "0px" and use the text-align property with a value of "center".`,
      function() {

        // Filter to get the CSS rule.
        let cssRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === '.img-caption');

        assert.equal(
          cssRule.length,
          1,
          'Could not find a style with class selector .img-caption'
        );

        assert.equal(
          cssRule[0].style['margin-top'],
          '0px',
          'The style with class selector ".img-caption" does not have a margin-top property with the value of "0px"'
        );

        assert.equal(
          cssRule[0].style['text-align'],
          'center',
          'The style with class selector ".img-caption" does not have a text-align property with the value of "center"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your <div> element with class "img-caption" must also have the class "main-column".`,
      function() {

        let elem = document.querySelector('div.img-caption.main-column');

        assert.isNotNull(
          elem,
          'Could not find an <div> element with the classes "img-caption" and "main-column"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your CSS must include a style using a class selector of ".timeline-heading". The style should give a top margin of "30px" and use the text-align property with a value of "center".`,
      function() {

        // Filter to get the CSS rule.
        let cssRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === '.timeline-heading');

        assert.equal(
          cssRule.length,
          1,
          'Could not find a style with class selector .timeline-heading'
        );

        assert.equal(
          cssRule[0].style['margin-top'],
          '30px',
          'The style with class selector ".timeline-heading" does not have a margin-top of "30px"'
        );

        assert.equal(
          cssRule[0].style['text-align'],
          'center',
          'The style with class selector ".timeline-heading" does not have a text-align property with the value of "center"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your <h3> element with class "timeline-heading" must also have the class "main-column".`,
      function() {

        let elem = document.querySelector('h3.timeline-heading.main-column');

        assert.isNotNull(
          elem,
          'Could not find an <h3> element with the classes "timeline-heading" and "main-column"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your CSS must include a style using a class selector of ".timeline". The style should give use auto margins and a width of 60% so the elements using this style will be centered, but narrower than the main column..`,
      function() {

        // Filter to get the CSS rule.
        let cssRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === '.timeline');

        assert.equal(
          cssRule.length,
          1,
          'Could not find a style with class selector .timeline'
        );

        assert.equal(
          cssRule[0].style['margin'],
          '0px auto',
          'The style with class selector ".timeline" does not have a margin of "0 auto"'
        );

        assert.equal(
          cssRule[0].style['width'],
          '60%',
          'The style with class selector ".timeline" does not have a width of "60%"'
        );

      });

      reqNum++;
      it(`${reqNum}. Your <li> elements inside your timeline unordered list should have a margin of 10px.`,
      function() {

        let elems = document.querySelectorAll('ul.timeline li');

        let elemsMargin = Array.from(elems).filter(elem =>
           getComputedStyle(elem).getPropertyValue('margin') === '10px'
        );

        console.log(elemsMargin);
        console.log('elemsMargin');

        assert.isAbove(
          elems.length,
          0,
          'Could not find any list item elements inside your timeline unordered list.'
        );

        assert.equal(
          elems.length,
          elemsMargin.length,
          'Not all <li> elements have a margin of 10px.'
        );

      });

      // Blockquote should have a class of main column.
      reqNum++;
      it(`${reqNum}. Your <blockquote> element with the "tribute-quote" class must also have the class "main-column".`,
      function() {

        let elem = document.querySelector('blockquote.tribute-quote.main-column');

        assert.isNotNull(
          elem,
          'Could not find a <blockquote> element with the classes "tribute-quote" and "main-column"'
        );

      });

      // Blockquote should have font-style italic.
      reqNum++;
      it(`${reqNum}. Your <blockquote> element with class "tribute-quote" should have a font-style of "italic".`,
      function() {

        let elem = document.querySelector('blockquote.tribute-quote');
        let fontStyle = getComputedStyle(elem).getPropertyValue('font-style');

        console.log(fontStyle);
        console.log('fontStyle');

        assert.equal(
          fontStyle,
          'italic',
          'The <blockquote> element with class "tribute-quote" does not have a font-style of "italic".'
        );

      });


      reqNum++;
      it(`${reqNum}. Your <p> element with the "more-info" class must also have the class "main-column".`,
      function() {

        let elem = document.querySelector('p.more-info.main-column');

        assert.isNotNull(
          elem,
          'Could not find a <p> element with the classes "more-info" and "main-column"'
        );

      });

      // More info margin-top: 20px;
      reqNum++;
      it(`${reqNum}. Your <p> element with class "more-info" should have a top margin of "20px".`,
      function() {

        let elem = document.querySelector('p.more-info');
        let marginStyle = getComputedStyle(elem).getPropertyValue('margin-top');

        console.log(marginStyle);
        console.log('marginStyle');

        assert.equal(
          marginStyle,
          '20px',
          'The <p> element with class "margin-top" does not have a margin-top of "20px".'
        );

      });

      // More info margin-top: 20px;
      reqNum++;
      it(`${reqNum}. Your <p> element with class "photo-credit" should have a font size of "12px".`,
      function() {

        let elem = document.querySelector('p.photo-credit');
        let marginStyle = getComputedStyle(elem).getPropertyValue('font-size');

        assert.equal(
          marginStyle,
          '12px',
          'The <p> element with class "photo-credit" does not have a font-size of "12px".'
        );

      });

      reqNum++;
      it(`${reqNum}. Your CSS must have a body element selector that gives the body a background color of "#96CFE5". You will no longer be able to see the size of each element, because this is the same background color you gave to the main column elements.`,
      function() {

        // Filter to get the body rule.
        let cssRule = allCSSRulesAsArray(document.styleSheets)
          .filter(rule => !isTestSuiteRule(rule))
          .filter(rule => rule.selectorText === 'body');

        assert.equal(
          cssRule.length,
          1,
          'Could not find a style with element selector "body"'
        );

        assert.equal(
          cssRule[0].style['background-color'],
          'rgb(150, 207, 229)',
          'The style with element selector "body" does not have a background-color of "#96CFE5"'
        );

      });

      reqNum++;
      it(`${reqNum}. The <img> element should be centered within its parent
      element.`,
      function() {
        const img = document.querySelector('img.tribute-photo.main-column');
        const imgParent = img.parentElement;
        const imgLeft = img.getBoundingClientRect().left;
        const imgRight = img.getBoundingClientRect().right;
        const parentLeft = imgParent.getBoundingClientRect().left;
        const parentRight = imgParent.getBoundingClientRect().right;
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
