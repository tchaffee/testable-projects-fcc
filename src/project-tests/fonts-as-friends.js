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

    // END Content tests
    });

    describe('Layout', function() {
      let reqNum = 0;

      reqNum++;
      it(`${reqNum}. The <p> element with a class of "loud" must have a 
      background-color of yellow, a color of red, and a font-size of 50px.`,
      function() {
        const className = 'loud';
        const elem = document.querySelector('p.' + className);

        assert.equal(
          window.getComputedStyle(elem)['background-color'],
          'rgb(255, 255, 0)',
          `The paragraph with class ${className} does not have ` +
          'a "yellow" background-color'
        );

        assert.equal(
          window.getComputedStyle(elem)['color'],
          'rgb(255, 0, 0)',
          `The paragraph with class ${className} does not have ` +
          'a color of "red"'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-size'],
          '50px',
          `The paragraph with class ${className} does not have ` +
          'a font-size of "50px"'
        );
      });

      reqNum++;
      it(`${reqNum}. The <p> element with a class of "shy" must have a color 
      of gray and a font-size of 12px.`,
      function() {
        const className = 'shy';
        const elem = document.querySelector('p.' + className);

        assert.equal(
          window.getComputedStyle(elem)['color'],
          'rgb(128, 128, 128)',
          `The paragraph with class ${className} does not have ` +
          'its color set to "gray".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-size'],
          '12px',
          `The paragraph with class ${className} does not have ` +
          'a font-size of "12px"'
        );
      });

      reqNum++;
      it(`${reqNum}. The <p> element with a class of "nerdy" must have a color 
      of white, a background-color of black, a font-family of monospace, and a
      font-size of 20px.`,
      function() {
        const className = 'nerdy';
        const elem = document.querySelector('p.' + className);

        assert.equal(
          window.getComputedStyle(elem)['color'],
          'rgb(255, 255, 255)',
          `The paragraph with class ${className} does not have ` +
          'its color set to "white".'
        );

        assert.equal(
          window.getComputedStyle(elem)['background-color'],
          'rgb(0, 0, 0)',
          `The paragraph with class ${className} does not have ` +
          'its background-color set to "black".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-family'],
          'monospace',
          `The paragraph with class ${className} does not have ` +
          'its font-family set to "monospace".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-size'],
          '20px',
          `The paragraph with class ${className} does not have ` +
          'a font-size of "20px"'
        );
      });

      reqNum++;
      it(`${reqNum}. The <p> element with a class of "confident" must have a 
      color of blue, a font-family of sans, and font-size of 40px, and a 
      font-weight of 700.`,
      function() {
        const className = 'confident';
        const elem = document.querySelector('p.' + className);

        assert.equal(
          window.getComputedStyle(elem)['color'],
          'rgb(0, 0, 255)',
          `The paragraph with class ${className} does not have ` +
          'its color set to "blue".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-family'],
          'sans',
          `The paragraph with class ${className} does not have ` +
          'its font-family set to "sans".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-size'],
          '40px',
          `The paragraph with class ${className} does not have ` +
          'a font-size of "40px"'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-weight'],
          '700',
          `The paragraph with class ${className} does not have ` +
          'a font-weight of "700"'
        );
      });

      reqNum++;
      it(`${reqNum}. The <p> element with a class of "fashion" must have a 
      a font-family of serif, and font-size of 30px, and a font-style of 
      italic.`,
      function() {
        const className = 'fashion';
        const elem = document.querySelector('p.' + className);

        assert.equal(
          window.getComputedStyle(elem)['font-family'],
          'serif',
          `The paragraph with class ${className} does not have ` +
          'its font-family set to "serif".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-size'],
          '30px',
          `The paragraph with class ${className} does not have ` +
          'a font-size of "30px"'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-style'],
          'italic',
          `The paragraph with class ${className} does not have ` +
          'a font-style of "italic"'
        );
      });

      reqNum++;
      it(`${reqNum}. The <p> element with a class of "sporty" must have a 
      a color of brown, a font-family of serif, and font-size of 30px, and a 
      and a font-weight of 900.`,
      function() {
        const className = 'sporty';
        const elem = document.querySelector('p.' + className);

        assert.equal(
          window.getComputedStyle(elem)['color'],
          'rgb(165, 42, 42)',
          `The paragraph with class ${className} does not have ` +
          'a color of "brown".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-family'],
          'serif',
          `The paragraph with class ${className} does not have ` +
          'its font-family set to "serif".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-size'],
          '30px',
          `The paragraph with class ${className} does not have ` +
          'a font-size of "30px"'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-weight'],
          '900',
          `The paragraph with class ${className} does not have ` +
          'a font-weight of "900"'
        );
      });

      // .funny {
      //   color: green;
      //   font-family: Comic sans, sans;
      //   font-size: 45px;
      //   font-weight: 100;
      // }
      reqNum++;
      it(`${reqNum}. The <p> element with a class of "funny" must have a 
      a color of green, a font-family of sans, and font-size of 45px, and a 
      and a font-weight of 100.`,
      function() {
        const className = 'funny';
        const elem = document.querySelector('p.' + className);

        assert.equal(
          window.getComputedStyle(elem)['color'],
          'rgb(0, 128, 0)',
          `The paragraph with class ${className} does not have ` +
          'a color of "green".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-family'],
          'sans',
          `The paragraph with class ${className} does not have ` +
          'its font-family set to "sans".'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-size'],
          '45px',
          `The paragraph with class ${className} does not have ` +
          'a font-size of "45px"'
        );

        assert.equal(
          window.getComputedStyle(elem)['font-weight'],
          '100',
          `The paragraph with class ${className} does not have ` +
          'a font-weight of "100"'
        );
      });

    // END Layout tests
    });

  // END FontsAsFriendsTests
  });

// END createFontsAsFriendsTests()
}
