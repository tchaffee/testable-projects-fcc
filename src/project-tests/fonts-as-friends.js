import { assert } from 'chai';
import { beginnerWebProgrammingStack } from '../utils/shared-test-strings';

export default function createFontsAsFriendsTests() {

  // Tests for pen https://codepen.io/tchaffee/pen/wjoxBe

  let paragraphTests = [
    {
      cssClass: 'loud',
      text: 'YES!!!'
    },
    {
      cssClass: 'shy',
      text: 'leave me alone'
    },
    {
      cssClass: 'nerdy',
      text: 'N3rdy 0v3r h3r3'
    },
    {
      cssClass: 'confident',
      text: 'I will succeed'
    },
    {
      cssClass: 'fashion',
      text: 'Stylish!'
    },
    {
      cssClass: 'sporty',
      text: 'Football anyone?'
    },
    {
      cssClass: 'funny',
      text: 'Knock knock'
    }
  ];

  let paragraphTest = function(reqNum, cssClassName, contents) {
    it(`${reqNum}. Your page must have a <p> element with 
    a class attribute of "${cssClassName}". Set the contents to "${contents}".`,
    function() {
      let elem = document.querySelector('p.' + cssClassName);

      assert.isNotNull(
        elem,
        'Could not find an <p> element with a class of "' + cssClassName + '"'
      );

      const elemText = elem.textContent;
      assert.equal(
        elemText,
        contents,
        `The <p> element with a class of "${cssClassName}" does not contain` +
        `the text "${contents}`
      );
    });
  };

  describe('Fonts as Friends page tests', function() {

    describe('Technology Stack', function() {
      it(beginnerWebProgrammingStack, function() {
        assert.ok(true);
      });
    });

    describe('Content', function() {
      let reqNum = 0;

      // Paragraph tests
      paragraphTests.forEach(function(test) {
        reqNum++;
        paragraphTest(reqNum, test.cssClass, test.text);     
      });

      // LEFT OFF HERE. NEED TO ADD MORE OF THE ABOVE TESTS.


      reqNum++;
      it(`${reqNum}. Your page must have a <div> element with an id="img-div".`,
      function() {
        let elem = document.querySelector('div#img-div');

        assert.isNotNull(
          elem,
          'Could not find a <div> element with an id of "img-div"'
        );
      });

      reqNum++;
      it(`${reqNum}. Within your "img-div" element, you must have an <img>
      element with an id="image".`,
      function() {
        let elem = document.querySelector('div#img-div > img#image');

        assert.isNotNull(
          elem,
          'Could not find a <img> element with id "image" inside your <div> ' +
          'with id "img-div"'
        );

      });

      reqNum++;
      it(`${reqNum}. Within your "img-div" element, you must have another <div>
      element with an id="img-caption" that contains some words that describe
      the image.`,
      function() {
        let elem = document.querySelector('div#img-div > div#img-caption');

        assert.isNotNull(
          elem,
          'Could not find a <div> element with id "img-caption" inside your ' +
          '<div> with id "img-div"'
        );

        const elemContents = elem.innerText;
        assert.isAbove(
          elemContents.length,
          0,
          'Your "img-caption" element does not have any words inside it'
        );
      });

      reqNum++;
      it(`${reqNum}. Your page must have a <div> element with an
      id="tribute-info".`,
      function() {
        let elem = document.querySelector('div#tribute-info');

        assert.isNotNull(
          elem,
          'Could not find a <div> element with id "tribute-info"'
        );

      });

      // TODO: Tests about the contents of the "tribute-info" div.
      reqNum++;
      it(`${reqNum}. Your tribute-info div must have an <h3> element that
      describes the contents (example: Here is a timeline of...)`,
      function() {
        let elem = document.querySelector('div#tribute-info > h3');

        assert.isNotNull(
          elem,
          'Could not find an <h3> element inside your tribute-info div'
        );

      });

      reqNum++;
      it(`${reqNum}. Your tribute-info div must have an unordered list.`,
      function() {
        let elem = document.querySelector('div#tribute-info > ul');

        assert.isNotNull(
          elem,
          'Could not find an <ul> element inside your tribute-info div'
        );

      });

      reqNum++;
      it(`${reqNum}. Your unordered list must have at least three list items.`,
      function() {
        let elems = document.querySelectorAll('div#tribute-info > ul > li');

        assert.isAtLeast(
          elems.length,
          3,
          'Could not find at least three <li> elements inside your ordered list'
        );

      });

      reqNum++;
      it(`${reqNum}. Your page must have a blockquote which should contain a
      quote from or about the person on your Tribute page.`,
      function() {
        let elem = document.querySelector('blockquote');

        assert.isNotNull(
          elem,
          'Could not find an <blockquote> element on'
        );

        const elemText = elem.innerText;
        assert.isAbove(
          elemText.length,
          0,
          'The <blockqoute> element does not contain any text'
        );
      });

      reqNum++;
      it(`${reqNum}. Your page must have an <a> element with an
      id="tribute-link", which links to an outside site that contains additional
      information about the subject of your page. HINT: You must give
      your element an attribute of target and set it to "_blank" in order for
      your link to open in a new tab (i.e. target="_blank").`,
      function() {
        const elem = document.querySelector('a#tribute-link');

        assert.isNotNull(
          elem,
          'Could not find an <a> element with id "tribute-link"'
        );

        assert(
          elem.hasAttribute('href'),
          'Your <a> element with id="tribute-link" must contain an href ' +
          'attribute '
        );

        assert(
          elem.hasAttribute('target'),
          'Your <a> element with id="tribute-link" must contain a target ' +
          'attribute '
        );

        assert.strictEqual(
          elem.getAttribute('target'),
          '_blank',
          'The target attribute should be set to "_blank", in order for the' +
          'link to open in a new tab '
        );
      });

    // END #Content
    });

    describe('#Layout', function() {
      let reqNum = 0;

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

    // END Layout
    });

  // END FontsAsFriendsTests
  });

// END createFontsAsFriendsTests()
}
