import { assert } from 'chai';
import { beginnerWebProgrammingHTMLStack } from '../utils/shared-test-strings';

export default function createInformationalArticleTests() {

  describe('Informational Article tests', function() {

    describe('Technology Stack', function() {
      it(beginnerWebProgrammingHTMLStack, function() {
        assert.ok(true);
      });
    });

    describe('Content', function() {
      let reqNum = 0;

      reqNum++;
      it(`${reqNum}. Your article must use an <h1> element. The <h1> element 
      should contain the title of your article.`,
      function() {
        let elem = document.querySelector('h1');

        assert.isNotNull(
          elem,
          'Could not find an <h1> element'
        );

        const titleText = elem.innerText;
        assert.isAbove(
          titleText.length,
          0,
          'The <h1> element does not contain any text'
        );
      });

      reqNum++;
      it(`${reqNum}. Your article must use at least one <h2> element. You can
      use <h2> elements as headings before each main section of your article.`,
      function() {
        let elem = document.querySelector('h2');

        assert.isNotNull(
          elem,
          'Could not find any <h2> elements'
        );

        const titleText = elem.innerText;
        assert.isAbove(
          titleText.length,
          0,
          'The <h2> element does not contain any text'
        );
      });

      reqNum++;
      it(`${reqNum}. Your article must use at least one <h3> element. You can 
      use the <h3> elements as sub-headings in your article.`,
      function() {
        let elem = document.querySelector('h3');

        assert.isNotNull(
          elem,
          'Could not find an <h3> element'
        );

        const titleText = elem.innerText;
        assert.isAbove(
          titleText.length,
          0,
          'The <h3> element does not contain any text'
        );
      });

      reqNum++;
      it(`${reqNum}. Your article must use at least three <p> elements. The <p> 
      elements should contain the text of your article.`,
      function() {
        let elems = document.querySelectorAll('p');

        assert.isAtLeast(
          elems.length,
          3,
          'Could not find at least three <p> elements in your article'
        );

        elems.forEach((elem) => {
          assert.isAbove(
            elem.innerText.length,
            0,
            'A <p> element does not contain any text'
          );
        });

      });

    // END Content
    });

  // END InformationalArticleTests
  });

// END createInformationalArticleTests()
}
