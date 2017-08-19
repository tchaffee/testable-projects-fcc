import { isAxisAlignedWithDataPoints } from '../src/assets/alignmentD3TestsNew';
import { assert } from 'chai';

describe('D3 Alignment module Tests', function() {

  it('Should return true when datapoints are aligned with an axis',
    function() {
      // Create an example axis and datapoints here.
      const axis = null,
        dataPoints = null;

      assert.isTrue(isAxisAlignedWithDataPoints(axis, dataPoints));
  });
});
