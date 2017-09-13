
export function isAxisAlignedWithDataPoints(
  axis,
  dimension,
  dataShapes,
  getShapeValue,
  getTickValue,
  getShapePosition
) {
  const dataShapesArray = [].slice.call(dataShapes);

  const outside = dataShapesArray.every(shape =>
    isShapeAlignedWithAxis(
      shape,
      axis,
      dimension,
      getShapeValue,
      getTickValue,
      getShapePosition
    )
  );

  return outside;
}

export function isShapeAlignedWithAxis(
  shape,
  axis,
  dimension,
  getShapeValue,
  getTickValue,
  getShapePosition
) {

  const position = getShapePosition(shape);

  const allTicks = axis.querySelectorAll('.tick');

  const alignedTicks = getAlignedTicksFromPosition(
    allTicks,
    dimension,
    position
  );

  return isShapeValueWithinTickValues(
    shape,
    alignedTicks,
    getShapeValue,
    getTickValue
  );
}

export function getTickPosition(tick) {
  let x, y;

  y = tick.getAttribute('transform').split(',')[1].split(')')[0];
  x = tick.getAttribute('transform').split(',')[0].split('(')[1];

  return { x: x, y: y};
}

// This also works when there is no beforeTick or afterTick. I.e. sometimes some
// of the small values appear before the first tick, or the largest values
// appear after the last tick. In those cases it will return null for the
// tick in question.
export function getAlignedTicksFromPosition(ticksList, dimension, position) {

  const ticks = [].slice.call(ticksList);

  let beforeTicks = ticks.filter(tick => {
    return getTickPosition(tick)[dimension] <= position[dimension];
  });

  let beforeTick = beforeTicks.reduce((prev, tick) => {
    const position = getTickPosition(tick)[dimension];
    if (prev && (getTickPosition(prev)[dimension] > position)) {
      return prev;
    }
    return tick;
  }, null);

  let afterTicks = ticks.filter(tick =>
    getTickPosition(tick)[dimension] > position[dimension]
  );

  let afterTick = afterTicks.reduce((prev, tick) => {
    const position = getTickPosition(tick)[dimension];
    if (prev && (getTickPosition(prev)[dimension] < position)) {
      return prev;
    }
    return tick;
  }, null);

  return [ beforeTick, afterTick ];
}

export function isShapeValueWithinTickValues(
  shape,
  ticks,
  getShapeValue,
  getTickValue
) {

  const shapeValue = getShapeValue(shape);

  let beforeTickValue;
  let afterTickValue;
  let returnValue;

  // The beforeTick or afterTick might be null.
  if (!ticks[0]) {
    afterTickValue = getTickValue(ticks[1]);
    returnValue = shapeValue <= afterTickValue;
  } else if (!ticks[0]) {
    beforeTickValue = getTickValue(ticks[0]);
    returnValue = beforeTickValue <= shapeValue;
  } else {
    beforeTickValue = getTickValue(ticks[0]);
    afterTickValue = getTickValue(ticks[1]);
    returnValue = beforeTickValue <= shapeValue <= afterTickValue;
  }

  return returnValue;
}

// TODO: Eventually delete this.
function debugHTMLUknownElement(elem) {

  for (var propName in elem) {
    // if ({}.hasOwnProperty.call(ticks[0], propName)) {
      let propValue = elem[propName];

      console.log('propName, propValue:');
      console.log(propName, propValue);
    // }
  }

}
