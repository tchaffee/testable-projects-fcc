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
    </g>

    <g class="x-axis" id="x-axis" transform="translate(144,412)">
      <g class="tick" transform="translate(37.5,0)" style="opacity: 1;">
        <line y2="10" x2="0"></line>
        <text dy=".71em" y="13" x="0" style="text-anchor: middle;">1760</text>
      </g>
      <g class="tick" transform="translate(87.5,0)" style="opacity: 1;">
        <line y2="10" x2="0"></line>
        <text dy=".71em" y="13" x="0" style="text-anchor: middle;">1770</text>
      </g>
      <g class="tick" transform="translate(137.5,0)" style="opacity: 1;">
        <line y2="10" x2="0"></line>
        <text dy=".71em" y="13" x="0" style="text-anchor: middle;">1780</text>
      </g>
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

function getTickValueMonth(tick) {
  const value = tick.querySelector('text').innerHTML.toLowerCase();
  return months.indexOf(value);
}

function getTickValueYear(tick) {
  return parseInt(tick.querySelector('text').innerHTML, 10);
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
      getTickValueMonth
    ));
  });

  it('getAlignedTicksFromPosition should return ticks from a middle position',
  function() {
    let position = { x: 2.5, y: 50 };
    const ticks = dom.window.document.querySelectorAll('.tick');

    const alignedTicks = getAlignedTicksFromPosition(ticks, 'y', position);

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

    const alignedTicks = getAlignedTicksFromPosition(ticks, 'y', position);

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
        'y',
        getShapeValue,
        getTickValueMonth
      ));
    });
  });

  describe('isAxisAlignedWithDataPoints function', function() {
    it('should return true when datapoints are aligned with a y axis',
    function() {
      const axis = dom.window.document.querySelector('#y-axis'),
        dataPoints = dom.window.document.querySelectorAll('.cell');

      assert.isTrue(isAxisAlignedWithDataPoints(
        axis,
        'y',
        dataPoints,
        getShapeValue,
        getTickValueMonth
      ));
    });

    it('should return true when datapoints are aligned with a x axis',
    function() {
      const axis = dom.window.document.querySelector('#x-axis'),
        dataPoints = dom.window.document.querySelectorAll('.cell');

      assert.isTrue(isAxisAlignedWithDataPoints(
        axis,
        'x',
        dataPoints,
        getShapeValue,
        getTickValueYear
      ));

    });

  });

});
