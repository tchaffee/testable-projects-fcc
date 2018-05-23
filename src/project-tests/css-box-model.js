import { assert } from 'chai';
import { beginnerWebProgrammingStack } from '../utils/shared-test-strings';

export default function createCSSBoxModelTests() {

  // Tests for pen https://codepen.io/tchaffee/pen/xjmgor


  /* Provides the class name and content for each div that is required.
     Please keep the content as one long string, since it is far easier to
     maintain than if strings are broken up when they exceed 80 columns. The
     ESLint rule is turned off for this section to make ESLint happy.
  */
  /* eslint-disable max-len */
  let divTests = [
    {
      cssClassName: 'box-one',
      content: 'Box one. Left and right margins default to 0px if you don\'t specify them. An element with left and right margins of 0px takes up the entire width of its container. This is true even if the content is very long. If there is not enough horizontal space for the content, the box will grow vertically to fit the content. We can see this by using some lorem ipsum. Lorem ipsum dolor sit amet consectetur adipiscing elit placerat penatibus duis, ac fermentum a phasellus aliquam lobortis mi montes natoque. Lectus laoreet potenti pulvinar urna sem egestas fermentum cum cubilia blandit elementum.'
    },
    {
      cssClassName: 'box-two',
      content: 'Box two. Still takes up the entire width, even if the content is short.'
    },
    {
      cssClassName: 'box-three',
      content: 'Box three. Left margin only. Notice the box become smaller.'
    },
    {
      cssClassName: 'box-four',
      content: 'Box four. Right margin only. Also makes the box smaller.'
    },
    {
      cssClassName: 'box-five',
      content: 'Box five. Left and right margins are different.'
    },
    {
      cssClassName: 'box-six',
      content: 'Box six. Left and right margins are equal. This is an important one to pay attention to. Notice that the box is centered. Equal left and right margins are an important way to center things. We will learn an even better way to keep the margins always equal in a future lesson.'
    },
    {
      cssClassName: 'box-seven',
      content: 'Box seven. The margins are the same as the box above, but the border is very large. Did the width of the box change or is it the same as the box above? Does the content have less space because a bigger border takes up some space where the content is?'
    },
    {
      cssClassName: 'box-eight',
      content: 'Box eight. The margins are the same as the box above, and the border is the same too. We just added some padding. Is the box still the same width as the box above? Does the content have less space?'
    }
  ];
  /* eslint-enable max-len */


  /* Runs tests for each div to make sure the required class and required
     content are there. The approach for checking the content is not obvious.
     The students might have line breaks in their html content, along with
     leading whitespace. We remove that to make sure their content matches the
     expected content while not being overly strict about indenting and
     whitespace.
   */
  let divTest = function(reqNum, cssClassName, contents) {
    it(`${reqNum}. Your page must have a <div> element with 
    a class attribute of "${cssClassName}". Set the contents to "${contents}".`,
    function() {
      let elem = document.querySelector('div.' + cssClassName);

      assert.isNotNull(
        elem,
        'Could not find an <div> element with a class of "' + cssClassName + '"'
      );

      // Normalize by removing newlines and leading and trailing whitespace.
      const elemText = elem.textContent.trim().replace(/\r?\n|\r/g, ' ');
      assert.equal(
        elemText,
        contents,
        // eslint-disable-next-line max-len
        `No regex: The <div> element with a class of "${cssClassName}" does not contain the text "${contents}`
      );
    });
  };

let marginTest = function(elem, margin, className, direction) {
  return assert.equal(
    window.getComputedStyle(elem)[`margin-${direction}`],
    margin,
    `The div with class "${className}" does not have a ${direction} margin of 
    ${margin}.`
  );
};

  describe('CSS Box Model page tests', function() {

    describe('Technology Stack', function() {
      it(beginnerWebProgrammingStack, function() {
        assert.ok(true);
      });
    });

    describe('Additional Instructions', function() {
      // eslint-disable-next-line max-len
      it(`This project will give you more practice with margins and how they affect layout. For now we will focus on left and right margins. Read the content of each box carefully for some important things to notice about the layout. After each layout test passes, try changing the size of your browser window to different widths so you can see how that affects the layout.
      `,
      function() {
        assert.ok(true);
      });
    });

    describe('Content', function() {
      let reqNum = 0;

      // Div tests
      divTests.forEach(function(test) {
        reqNum++;
        divTest(reqNum, test.cssClassName, test.content);
      });

    // END Content tests
    });

    describe('Layout', function() {
      let reqNum = 0;

      reqNum++;
      let marginTop = '40px';
      it(`${reqNum}. Every <div> element must have a top margin of ${marginTop}.
      This requirement is just to give some vertical space between elements. 
      It isn't important other than to help you see things better.
      `,
      function() {
        // The selector says to find all divs with a class that begins with
        // the string "box-". This ensures we don't get divs that are not a
        // part of the student project, for example, the divs in the test suite.
        let elems = document.querySelectorAll(
          'div[class^=box-]'
        );

        elems.forEach(elem => {
          assert.equal(
            window.getComputedStyle(elem)['margin-top'],
            marginTop,
            `The div with class "${elem.className}" does not have a top margin
            of ${marginTop}.`
          );
        });

      });

      reqNum++;
      let borderWidth = '1px';
      it(`${reqNum}. Unless otherwise specified, every <div> element must 
      have a solid black border of ${borderWidth}. This requirement helps you 
      see the width of elements. It isn't important other than that.
      `,
      function() {
        let elems = document.querySelectorAll(
          'div[class^=box-]:not(.box-seven):not(.box-eight)'
        );

        elems.forEach(elem => {
          assert.equal(
            window.getComputedStyle(elem)['border'],
            `${borderWidth} solid rgb(0, 0, 0)`,
            `The div with class "${elem.className}" does not have ` +
            `a ${borderWidth} solid black border`
          );
        });

      });

      reqNum++;
      it(`${reqNum}. The <div> element with a class of "box-one" must have 
      a margin-left of 0px and a margin-right of 0px. 
      Margins default to 0px, so this test should pass without you having to
      create a style.
      `,
      function() {
        const className = 'box-one';
        const elem = document.querySelector('div.' + className);
        let marginLeft = '0px';
        let marginRight = '0px';

        marginTest(elem, marginLeft, className, 'left');
        marginTest(elem, marginRight, className, 'right');

      });

      reqNum++;

      it(`${reqNum}. The <div> element with a class of "box-two" must have 
      a margin-left of 0px and a margin-right of 0px.
      `,
      function() {
        const className = 'box-two';
        const elem = document.querySelector('div.' + className);
        let marginLeft = '0px';
        let marginRight = '0px';

        marginTest(elem, marginLeft, className, 'left');
        marginTest(elem, marginRight, className, 'right');

      });

      reqNum++;

      it(`${reqNum}. The <div> element with a class of "box-three" must have 
      a margin-left of 300px. The margin-right must be 0px.
      Remember that 0px is the default, so you do not need to specify the 
      margin-right.
      `,
      function() {
        const className = 'box-three';
        const elem = document.querySelector('div.' + className);
        let marginLeft = '300px';
        let marginRight = '0px';

        marginTest(elem, marginLeft, className, 'left');
        marginTest(elem, marginRight, className, 'right');

      });

      reqNum++;
      it(`${reqNum}. The <div> element with a class of "box-four" must have 
      a margin-right of 400px.
      `,
      function() {
        const className = 'box-four';
        const elem = document.querySelector('div.' + className);
        let marginLeft = '0px';
        let marginRight = '400px';

        marginTest(elem, marginLeft, className, 'left');
        marginTest(elem, marginRight, className, 'right');

      });

      reqNum++;
      it(`${reqNum}. The <div> element with a class of "box-five" must have 
      a margin-left of 50px and a margin-right of 300px.
      `,
      function() {
        const className = 'box-five';
        const elem = document.querySelector('div.' + className);
        let marginLeft = '50px';
        let marginRight = '300px';

        marginTest(elem, marginLeft, className, 'left');
        marginTest(elem, marginRight, className, 'right');

      });

      reqNum++;
      it(`${reqNum}. The <div> element with a class of "box-six" must have 
      a margin-left of 200px and a margin-right of 200px.
      `,
      function() {
        const className = 'box-six';
        const elem = document.querySelector('div.' + className);
        let marginLeft = '200px';
        let marginRight = '200px';

        marginTest(elem, marginLeft, className, 'left');
        marginTest(elem, marginRight, className, 'right');

      });

      reqNum++;
      it(`${reqNum}. The <div> element with a class of "box-seven" must have 
      a margin-left of 200px, a margin-right of 200px, and a solid black border
      of 40px.
      `,
      function() {
        const className = 'box-seven';
        const elem = document.querySelector('div.' + className);
        let marginLeft = '200px';
        let marginRight = '200px';

        marginTest(elem, marginLeft, className, 'left');
        marginTest(elem, marginRight, className, 'right');

        assert.equal(
          window.getComputedStyle(elem)['border'],
          '40px solid rgb(0, 0, 0)',
          `The div with class "${elem.className}" does not have ` +
          'a 40px solid black border'
        );
      });

      reqNum++;
      it(`${reqNum}. The <div> element with a class of "box-eight" must have 
      a margin-left of 200px, a margin-right of 200px, a solid black border
      of 40px, and a left and right padding of 150px.
      `,
      function() {
        const className = 'box-eight';
        const elem = document.querySelector('div.' + className);
        let marginLeft = '200px';
        let marginRight = '200px';

        marginTest(elem, marginLeft, className, 'left');
        marginTest(elem, marginRight, className, 'right');

        assert.equal(
          window.getComputedStyle(elem)['border'],
          '40px solid rgb(0, 0, 0)',
          `The div with class "${elem.className}" does not have ` +
          'a 40px solid black border'
        );

        assert.equal(
          window.getComputedStyle(elem)['padding-left'],
          '150px',
          `The div with class "${elem.className}" does not have ` +
          'a padding-left of 150px'
        );

        assert.equal(
          window.getComputedStyle(elem)['padding-right'],
          '150px',
          `The div with class "${elem.className}" does not have ` +
          'a padding-right of 150px'
        );
      });

    // END Layout tests
    });

  // END FontsAsFriendsTests
  });

// END createFontsAsFriendsTests()
}
