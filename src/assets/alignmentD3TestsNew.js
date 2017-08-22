
export function isAxisAlignedWithDataPoints(axis, dataShapes) {
  const dataShapesArray = [].slice.call(dataShapes);

  const outside = dataShapesArray.every(shape =>
    isShapeAlignedWithAxis(shape, axis));

  return outside;
}

export function isShapeAlignedWithAxis(shape, axis) {

  const position = getShapePosition(shape);

  const ticks = getTicksFromPosition(axis, position);

  return isShapeValueWithinTickValues(shape, ticks);
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

export function getTicksFromPosition(axis, position) {
  return false;
}

export function isShapeValueWithinTickValues(shape, ticks) {
  return false;
}
