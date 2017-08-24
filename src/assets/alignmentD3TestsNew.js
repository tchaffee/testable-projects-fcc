
export function isAxisAlignedWithDataPoints(
  axis,
  dataShapes,
  getShapeValue,
  getTickValue
) {
  const dataShapesArray = [].slice.call(dataShapes);

  const outside = dataShapesArray.every(shape =>
    isShapeAlignedWithAxis(shape, axis, getShapeValue, getTickValue));

  return outside;
}

export function isShapeAlignedWithAxis(
  shape,
  axis,
  getShapeValue,
  getTickValue
) {

  const position = getShapePosition(shape);

  const allTicks = axis.querySelectorAll('.tick');

  const alignedTicks = getAlignedTicksFromPosition(allTicks, position);

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

export function getShapePosition(shape) {
  // the x, y attributes for each rect are from the top-left of the shape.
  // compute the mid-value for a coordinate to compare to axis tick
  let half, x, y;

  half = parseFloat(shape.getAttribute('width')) / 2;
  x = parseFloat(shape.getAttribute('x')) + half;

  half = parseFloat(shape.getAttribute('height')) / 2;
  y = parseFloat(shape.getAttribute('y')) + half;

  return { x: x, y: y};
}


export function getAlignedTicksFromPosition(ticksList, position) {

  const ticks = [].slice.call(ticksList);

  // Handle Y axis.
  let beforeTicks = ticks.filter(tick => {
    return getTickPosition(tick).y <= position.y;
  });

  let beforeTick = beforeTicks.reduce((prev, tick) => {
    const position = getTickPosition(tick).y;
    if (prev && (getTickPosition(prev).y > position)) {
      return prev;
    }
    return tick;
  }, null);


  let afterTicks = ticks.filter(tick => getTickPosition(tick).y > position.y);

  let afterTick = afterTicks.reduce((prev, tick) => {
    const position = getTickPosition(tick).y;
    if (prev && (getTickPosition(prev).y < position)) {
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

  const beforeTickValue = getTickValue(ticks[0]);
  const afterTickValue = getTickValue(ticks[1]);

  return beforeTickValue <= shapeValue <= afterTickValue;
}
