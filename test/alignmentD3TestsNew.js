import {
  isAxisAlignedWithDataPoints,
  isShapeAlignedWithAxis,
  getAlignedTicksFromPosition,
  isShapeValueWithinTickValues,
  getTickPosition
} from '../src/assets/alignmentD3TestsNew';

import { assert } from 'chai';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

const heatMapDom = new JSDOM(`
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

const scatterPlotDom = new JSDOM(`
<g class="y axis" id="y-axis" fill="none" font-size="10"
  font-family="sans-serif" text-anchor="end">
  <g class="tick" opacity="1" transform="translate(0,27.777777777777775)">
    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
    <text fill="#000" x="-9" y="0.5" dy="0.32em">37:00</text>
  </g>
  <g class="tick" opacity="1" transform="translate(0,69.44444444444444)">
    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
    <text fill="#000" x="-9" y="0.5" dy="0.32em">37:15</text>
  </g>
  <g class="tick" opacity="1" transform="translate(0,111.1111111111111)">
    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
    <text fill="#000" x="-9" y="0.5" dy="0.32em">37:30</text>
  </g>
</g>

<g class="x axis" id="x-axis" transform="translate(0,500)" fill="none"
  font-size="10" font-family="sans-serif" text-anchor="middle">
  <g class="tick" opacity="1" transform="translate(36.52173913043478,0)">
    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
    <text fill="#000" y="9" x="0.5" dy="0.71em">1994</text>
  </g>
  <g class="tick" opacity="1" transform="translate(109.56521739130434,0)">
    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
    <text fill="#000" y="9" x="0.5" dy="0.71em">1996</text>
  </g>
  <g class="tick" opacity="1" transform="translate(182.6086956521739,0)">
    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
    <text fill="#000" y="9" x="0.5" dy="0.71em">1998</text>
  </g>
</g>

<circle class="dot" r="6" cx="36.52173913043478" cy="69.44444444444444"
  data-xvalue="1994" data-yvalue="Mon Jan 01 1900 00:37:15 GMT-0200 (BRST)"
  style="fill: rgb(31, 119, 180);">
</circle>
`
);

// TODO: Make sure we test axis in reverse order.

const tests = [
  {
    name: 'Heat Map',
    dom: heatMapDom,
    shapeClassName: '.cell',
    getYShapeValueFunction: getShapeValueMonth,
    getXShapeValueFunction: getShapeValueYear,
    getYTickValueFunction: getTickValueMonth,
    getXTickValueFunction: getTickValueYear,
    getShapePositionFunction: getShapePositionRect
  },
  {
    name: 'Scatter Plot',
    dom: scatterPlotDom,
    shapeClassName: '.dot',
    getYShapeValueFunction: getShapeValueMinutes,
    getXShapeValueFunction: getShapeValueYearScatter,
    getYTickValueFunction: getTickValueMinutes,
    getXTickValueFunction: getTickValueYear,
    getShapePositionFunction: getShapePositionCircle
  }
];

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

function getShapeValueMonth(shape) {
  return parseInt(shape.getAttribute('data-month'), 10);
}

function getShapeValueYear(shape) {
  return parseInt(shape.getAttribute('data-year'), 10);
}

function getShapeValueYearScatter(shape) {
  return parseInt(shape.getAttribute('data-xvalue'), 10);
}

function getShapeValueMinutes(shape) {
  const value = shape.getAttribute('data-yvalue');
  return new Date(value).getMinutes() +
    (new Date(value).getSeconds() / 60);
}

function getTickValueMinutes(tick) {
  const value = tick.querySelector('text').innerHTML;
  return parseInt(value.split(':')[0], 10) +
    (parseInt(value.split(':')[1], 10) / 60);
}

function getShapePositionRect(shape) {
  // the x, y attributes for each rect are from the top-left of the shape.
  // compute the mid-value for a coordinate to compare to axis tick
  let half, x, y;

  half = parseFloat(shape.getAttribute('width')) / 2;
  x = parseFloat(shape.getAttribute('x')) + half;

  half = parseFloat(shape.getAttribute('height')) / 2;
  y = parseFloat(shape.getAttribute('y')) + half;

  return { x: x, y: y};
}

function getShapePositionCircle(shape) {
  let x, y;

  x = parseFloat(shape.getAttribute('cx'));

  y = parseFloat(shape.getAttribute('cy'));

  return { x: x, y: y};
}


describe('D3 Alignment module Tests', function() {

  it('getTickPosition should get a position',
  function() {
    const ticks = heatMapDom.window.document.querySelectorAll('.tick');
    const tick = ticks[0];

    const position = getTickPosition(tick);

    assert.equal(position.x, 0);
    assert.equal(position.y, 16.5);

  });

  it('getAlignedTicksFromPosition should return ticks from a middle position',
  function() {
    let position = { x: 2.5, y: 50 };
    const ticks = heatMapDom.window.document.querySelectorAll('.tick');

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
    const ticks = heatMapDom.window.document.querySelectorAll('.tick');

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

  describe('getShapePositionRect function', function() {
    it('should return the position of a shape',
    function() {
      const dataPoints = heatMapDom.window.document.querySelectorAll(
        '.cell'
      ),
        shape = dataPoints[0];

        const position = getShapePositionRect(shape);

        assert.equal(position.x, 2.5);
        assert.equal(position.y, 16.5);
    });
  });

  tests.forEach(function(test) {

    it(`${test.name}: isShapeValueWithinTickValues should return true`,
    function() {
      const cells = test.dom.window.document.querySelectorAll(
        test.shapeClassName
      );
      const shape = cells[0];

      const ticks = test.dom.window.document.querySelectorAll('.tick');
      const tick1 = ticks[0];
      const tick2 = ticks[1];

      assert.isTrue(isShapeValueWithinTickValues(
        shape,
        [tick1, tick2],
        test.getYShapeValueFunction,
        test.getYTickValueFunction
      ));
    });

    describe('isShapeAlignedWithAxis function', function() {
      it(`${test.name}: should return true when the shape is aligned`,
      function() {
        const axis = test.dom.window.document.querySelector('#y-axis'),
          cells = test.dom.window.document.querySelectorAll(
            test.shapeClassName
          ),
          shape = cells[0];

        console.log('shape');
        console.log(shape);
        console.log('axis');
        console.log(axis);

        assert.isTrue(isShapeAlignedWithAxis(
          shape,
          axis,
          'y',
          test.getYShapeValueFunction,
          test.getYTickValueFunction,
          test.getShapePositionFunction
        ));
      });
    });

    describe('isAxisAlignedWithDataPoints function', function() {
      it(`${test.name}: should return true when datapoints are aligned with a y
      axis`,
      function() {
        const axis = test.dom.window.document.querySelector('#y-axis'),
          dataPoints = test.dom.window.document.querySelectorAll(
            test.shapeClassName
          );

        assert.isTrue(isAxisAlignedWithDataPoints(
          axis,
          'y',
          dataPoints,
          test.getYShapeValueFunction,
          test.getYTickValueFunction,
          test.getShapePositionFunction
        ));
      });

      it(`${test.name}: should return true when datapoints are aligned with a x
      axis`,
      function() {
        const axis = test.dom.window.document.querySelector('#x-axis'),
          dataPoints = test.dom.window.document.querySelectorAll(
            test.shapeClassName
          );

        assert.isTrue(isAxisAlignedWithDataPoints(
          axis,
          'x',
          dataPoints,
          test.getXShapeValueFunction,
          test.getXTickValueFunction,
          test.getShapePositionFunction
        ));

      });

    });

  });
});
