import { beginnerWebProgrammingHTMLStack } from '../utils/shared-test-strings';
import { assert } from 'chai';

export default function createProductLandingPageHTMLTests() {
  describe('Product Landing Page tests', function() {

    describe('Technology Stack', function() {
      it(beginnerWebProgrammingHTMLStack, function() {
        assert.ok(true);
      });
    });

    describe('Content', function() {
      let reqNum = 0;


      reqNum++;
      it(`${reqNum}. My product landing page should have a <div> element with
      an id attribute that has a value of "hero".`,
      function() {
        assert.isNotNull(
          document.getElementById('hero'),
          'Could not find a <div> element with id="hero" '
        );
      });

      reqNum++;
      it(`${reqNum}. Within the "hero" div I must have a child <div> 
      with an id="hero-logo".`,
      function() {
        assert.isNotNull(
          document.querySelectorAll('#hero > #hero-logo'),
          'Could not find a div element with id="hero-logo" within the ' +
          'div with id="hero" '
        );
      });

      reqNum++;
      it(`${reqNum}. Within the "hero-logo" div I must have an <h1> 
      element. The h1 element should contain some text with the name of a
      company or business. For example, "Queen Bee Drones".`,
      function() {
        let elems = document.querySelectorAll('#hero > #hero-logo > h1');

        assert.equal(
          elems.length,
          1,
          'Could not find an h1 element within the div with id="hero-logo"'
        );

        const elemText = elems[0].innerText;
        assert.isAbove(
          elemText.length,
          0,
          'The <h1> element does not contain any text'
        );

      });


      reqNum++;
      it(`${reqNum}. Within the "hero" div I must have a <div> 
      with an id="tagline".`,
      function() {
        assert.isNotNull(
          document.querySelectorAll('#hero > #tagline'),
          'Could not find a div element with id="tagline" within the ' +
          'div with id="hero" '
        );
      });

      reqNum++;
      it(`${reqNum}. Within the "tagline" div I must have an <h2> 
      element. The h2 element should contain some text explaing the value 
      your business provides. For example "We sell only the best drones".`,
      function() {
        let elems = document.querySelectorAll('div#hero > div#tagline > h2');

        assert.equal(
          elems.length,
          1,
          'Could not find an h2 element within the div with id="tagline"'
        );

        const elemText = elems[0].innerText;
        assert.isAbove(
          elemText.length,
          0,
          'The <h2> element does not contain any text'
        );

      });

      reqNum++;
      it(`${reqNum}. My product landing page must have a <div> element with
      an id attribute that has a value of "products-list".`,
      function() {
        assert.isNotNull(
          document.getElementById('products-list'),
          'Could not find a <div> element with id="products-list" '
        );
      });

      reqNum++;
      it(`${reqNum}. Within my "products-list" div I must have three divs 
      with a class of "product-container".`,
      function() {
        let elems = document.querySelectorAll(
          'div#products-list > div.product-container'
        );

        assert.equal(
          elems.length,
          3,
          'Could not find three <div> elements with class=' +
          '"product-container" inside the "products-list" div'
        );

      });

      reqNum++;
      it(`${reqNum}. Each "product-container" div should contain a div with a
      class of "product-image".`,
      function() {
        let elems = document.querySelectorAll(
          'div#products-list > div.product-container > div.product-image'
        );

        assert.equal(
          elems.length,
          3,
          'Could not find <div> elements with class=' +
          '"product-image" inside the "products-container" div '
        );
      });

        reqNum++;
        it(`${reqNum}. Each "product-image" div should contain an <img> element.
        The image element must have the src attribute specified. See the project
        instructions for the list of images you can use.`,
        function() {
          let elems = document.querySelectorAll(
            'div#products-list > div.product-container > div.product-image > img'
          );
  
          assert.equal(
            elems.length,
            3,
            'Could not find an <img> element inside each of the ' +
            '"products-image" divs '
          );

          assert.strictEqual(
            elems[0].hasAttribute('src'),
            true,
            'Each <img> element must have a src attribute '
          );

          assert.isAbove(
            elems[0].getAttribute('src').length,
            0,
            'The source attribute for each <img> element must have a ' +
            'value'
          );

        });

        reqNum++;
        it(`${reqNum}. Each "product-container" div should contain a div with a
        class of "product-info".`,
        function() {
          let elems = document.querySelectorAll(
            'div#products-list > div.product-container > div.product-info'
          );

          assert.equal(
            elems.length,
            3,
            'Could not find <div> elements with class=' +
            '"product-info" inside the "products-container" div '
          );
        });

        reqNum++;
        it(`${reqNum}. Each "product-info" div must contain a div with a
        class of "product-name". The contents of the div should describe the
        product. For example "UTO Drone U960"`,
        function() {
          let elems = document.querySelectorAll(
            'div#products-list > div.product-container > div.product-info' +
            ' > div.product-name'
          );

          assert.equal(
            elems.length,
            3,
            'Could not find <div> elements with class=' +
            '"product-name" inside the "products-info" div '
          );

          elems.forEach((elem) => {
            assert.isAbove(
              elem.innerText.length,
              0,
             'Each "product-name" div must contain some text describing the ' +
             'product'
            );
          });

        });

        reqNum++;
        it(`${reqNum}. Each "product-info" div must contain a div with a
        class of "product-price". The contents of the div should be the
        price of the product. For example "$1999.99"`,
        function() {
          let elems = document.querySelectorAll(
            'div#products-list > div.product-container > div.product-info' +
            ' > div.product-price'
          );

          assert.equal(
            elems.length,
            3,
            'Could not find <div> elements with class=' +
            '"product-price" inside the "products-info" div '
          );

          elems.forEach((elem) => {
            assert.isAbove(
              elem.innerText.length,
              0,
             'Each "product-price" div must contain some text giving the ' +
             'price of the product'
            );
          });


        });

    // END #Content
    });

  // END #ProductLadingPageTests
  });

// END createProductLandingPageTests()
}
