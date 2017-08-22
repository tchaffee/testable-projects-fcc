import {
  isAxisAlignedWithDataPoints,
  isShapeAlignedWithAxis,
  getShapePosition,
  getTicksFromPosition,
  isShapeValueWithinTickValues
} from '../src/assets/alignmentD3TestsNew';
import { assert } from 'chai';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

const dom = new JSDOM(`
  <!DOCTYPE html>
    <g class="y-axis" id="y-axis" transform="translate(144,16)">
      <g class="tick" transform="translate(0,16.5)" style="opacity: 1;">
        <line x2="-10" y2="0"></line>
        <text dy=".32em" x="-13" y="0" style="text-anchor: end;">January</text>
      </g>
      <g class="tick" transform="translate(0,49.5)" style="opacity: 1;">
        <line x2="-10" y2="0"></line>
        <text dy=".32em" x="-13" y="0" style="text-anchor: end;">February</text>
      </g>
      <path class="domain" d="M-1,0H0V396H-1"></path>
    </g>
    <rect class="cell" data-month="0" data-year="1753"
      data-temp="7.2940000000000005" x="0" y="0" width="5" height="33"
      fill="#ffffbf">
    </rect>
    `
);

describe('D3 Alignment module Tests', function() {

  it('isShapeValueWithinTickValues should return true',
  function() {
    const shape = null;
    const ticks = null;

    assert.isTrue(isShapeValueWithinTickValues(shape, ticks));
  });

  it('getTicksFromPosition should return ticks from a position',
  function() {
    let position = { x: 0, y: 0 };
    const axis = dom.window.document.querySelector('#y-axis');

    const ticks = getTicksFromPosition(axis, position);

    assert.isTrue(ticks);
  });

  describe('getShapePosition function', function() {
    it('should return the position of a shape',
    function() {
      const dataPoints = dom.window.document.querySelectorAll('.cell'),
        shape = dataPoints[0];

        const position = getShapePosition(shape);

        assert.equal(position.x, 2.5);
        assert.equal(position.y, 16.5);
    });
  });

  describe('isShapeAlignedWithAxis function', function() {
    it('should return true when the shape is aligned',
    function() {
      const axis = dom.window.document.querySelector('#y-axis'),
        dataPoints = dom.window.document.querySelectorAll('.cell'),
        dataPoint = dataPoints[0];

      assert.isTrue(isShapeAlignedWithAxis(dataPoint, axis));
    });
  });

  describe('isAxisAlignedWithDataPoints function', function() {
    it('should return true when datapoints are aligned with an axis',
    function() {
      const axis = dom.window.document.querySelector('#y-axis'),
        dataPoints = dom.window.document.querySelectorAll('.cell');

      assert.isTrue(isAxisAlignedWithDataPoints(axis, dataPoints));
    });
  });

});
