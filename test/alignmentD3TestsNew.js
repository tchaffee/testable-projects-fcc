import {
  isAxisAlignedWithDataPoints,
  isShapeAlignedWithAxis,
  getShapePosition,
  getAlignedTicksFromPosition,
  isShapeValueWithinTickValues,
  getTickPosition
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
      <g class="tick" transform="translate(0,79.5)" style="opacity: 1;">
        <line x2="-10" y2="0"></line>
        <text dy=".32em" x="-13" y="0" style="text-anchor: end;">March</text>
      </g>
      <g class="tick" transform="translate(0,99.5)" style="opacity: 1;">
        <line x2="-10" y2="0"></line>
        <text dy=".32em" x="-13" y="0" style="text-anchor: end;">April</text>
      </g>
      <path class="domain" d="M-1,0H0V396H-1"></path>
    </g>
    <rect class="cell" data-month="0" data-year="1753"
      data-temp="7.2940000000000005" x="0" y="0" width="5" height="33"
      fill="#ffffbf">
    </rect>
    `
);

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

function getTickValue(tick) {
  const value = tick.querySelector('text').innerHTML.toLowerCase();
  return months.indexOf(value);
}

function getShapeValue(shape) {
  return parseInt(shape.getAttribute('data-month'), 10);
}

describe('D3 Alignment module Tests', function() {

  it('getTickPosition should get a position',
  function() {
    const ticks = dom.window.document.querySelectorAll('.tick');
    const tick = ticks[0];

    const position = getTickPosition(tick);

    assert.equal(position.x, 0);
    assert.equal(position.y, 16.5);

  });

  it('isShapeValueWithinTickValues should return true',
  function() {
    const cells = dom.window.document.querySelectorAll('.cell');
    const shape = cells[0];

    const ticks = dom.window.document.querySelectorAll('.tick');
    const tick1 = ticks[0];
    const tick2 = ticks[1];

    assert.isTrue(isShapeValueWithinTickValues(
      shape,
      [tick1, tick2],
      getShapeValue,
      getTickValue
    ));
  });

  it('getAlignedTicksFromPosition should return ticks from a middle position',
  function() {
    let position = { x: 2.5, y: 50 };
    const ticks = dom.window.document.querySelectorAll('.tick');

    const alignedTicks = getAlignedTicksFromPosition(ticks, position);

    assert.strictEqual(
      alignedTicks[0].getAttribute('transform'),
      'translate(0,49.5)'
    );

    assert.strictEqual(
      alignedTicks[1].getAttribute('transform'),
      'translate(0,79.5)'
    );
  });

  it('getAlignedTicksFromPosition should return ticks from a position',
  function() {
    let position = { x: 2.5, y: 16.5 };
    const ticks = dom.window.document.querySelectorAll('.tick');

    const alignedTicks = getAlignedTicksFromPosition(ticks, position);

    assert.strictEqual(
      alignedTicks[0].getAttribute('transform'),
      'translate(0,16.5)'
    );

    assert.strictEqual(
      alignedTicks[1].getAttribute('transform'),
      'translate(0,49.5)'
    );

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
        cells = dom.window.document.querySelectorAll('.cell'),
        shape = cells[0];

      assert.isTrue(isShapeAlignedWithAxis(
        shape,
        axis,
        getShapeValue,
        getTickValue
      ));
    });
  });

  describe('isAxisAlignedWithDataPoints function', function() {
    it('should return true when datapoints are aligned with an axis',
    function() {
      const axis = dom.window.document.querySelector('#y-axis'),
        dataPoints = dom.window.document.querySelectorAll('.cell');

      assert.isTrue(isAxisAlignedWithDataPoints(
        axis,
        dataPoints,
        getShapeValue,
        getTickValue
      ));
    });
  });

});
