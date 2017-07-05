import $ from 'jquery';
import { testToolTip } from '../assets/globalD3Tests';

//for given axis x or y, return width or height, begin and end coords, and arrays of tick elements and labels (for values)
var thisAxis = function(x,y) {
	var begin, end, axis;
    if (x !== null) {
        axis = x;
        //x-axis path x coordinate from d
        //ex: M80.5,6V0.5H780.5V6 where 
        //M establishes beginning coordinates of a line (80.5, 6). It should be the only comma so we can split there. We only need the x coordinate.
        begin = axis.querySelector('path').getAttribute('d').split(',')[0].split('M')[1]
        //H establishes a horizontal line from the last coordinate. That is the width of the axis.
        //V means vertical lines. In this case, those demarcate line endings. We just need M and H.
        end = axis.querySelector('path').getAttribute('d').split(',')[1].split('H')[1].split('V')[0]
    } else {
        axis = y;
        //y-axis path y coordinate from d
        //ex: M-6,420.5H0.5V40.5H-6 
        //M begins at bottom and is drawn up vertically, but we want the lower number for var begin (40.5)
        begin = axis.querySelector('path').getAttribute('d').split(',')[1].split('V')[1].split('H')[0];
        //ex 420.5
        end = axis.querySelector('path').getAttribute('d').split(',')[1].split('H')[0];
    }
    return {
        size: end - begin, 
        begin: begin, 
        end: end,
        ticks: axis.querySelectorAll('.tick'),
        text: axis.querySelectorAll('.tick text')
    }
}

//for given tick, return value and x or y position
var thisTick = function(x,y,i) {
    if (x !== null) {
        return {
            text: x.querySelector('text').innerHTML,
            //isolate x coordinate from "translate(x,y)"
            px: x.getAttribute('transform').split(',')[0].split('(')[1]
        }
    } else {
        return {
            text: y.querySelector('text').innerHTML,
            px: y.getAttribute('transform').split(',')[1].split(')')[0]
        }
    }
}

//for given feature, get values and coordinates from feature attributes
var thisFeature = function(type,feature,i) {
    var obj = {}
    switch(type){
        case 'dot':
            obj = {
                xValue: feature.getAttribute('data-xvalue'),
                yValue: feature.getAttribute('data-yvalue'),
                x: feature.getAttribute('cx'),
                y: feature.getAttribute('cy')
            }
            break;
        /*case 'rect':
            obj = {
                xValue: feature.getAttribute('data-xvalue'),
                yValue: feature.getAttribute('data-yvalue'),
                x: feature.getAttribute('x') ...,
                y: feature.getAttribute('y') ...
            }
            break;*/
        //other feature types here ...
    }
    return obj;
}

//count should return 0
var checkAlignment = function(axis, collection, type, align, units) {
    var count = 0;
    for (var i = 0; i < axis.ticks.length - 1; i++) {
        //get values for given tick and subsequent tick
        var axisTick, axisNextTick, coord, val;
        switch(align) {
	        case 'horizontal':
	            axisTick = thisTick(axis.ticks[i], null, i)
	            axisNextTick = thisTick(axis.ticks[i+1], null, i+1)
	            coord = 'x'
	            val = 'xValue'
	            break;
	        case 'vertical':
	            axisTick = thisTick(null, axis.ticks[i], i)
	            axisNextTick = thisTick(null, axis.ticks[i+1], i+1)
	            coord = 'y'
	            val = 'yValue'
	            break;
        }
        var tickVal, tickNextVal;
        switch(units) {
	        case 'minutes':
	            //labels come in as strings of 'mm:ss', so convert to decimal
	            tickVal = parseInt(axisTick.text.split(':')[0], 10) + (parseInt(axisTick.text.split(':')[1], 10)/60)
	            tickNextVal = parseInt(axisNextTick.text.split(':')[0], 10) + (parseInt(axisNextTick.text.split(':')[1], 10)/60)
	            break;
	        case 'years':
	            tickVal = parseInt(axisTick.text, 10)
	            tickNextVal = parseInt(axisNextTick.text, 10)
	            break;
        }
        var tickPx = parseInt(axisTick.px, 10),
            tickNextPx = parseInt(axisNextTick.px, 10),
            tickPercent = ((tickPx - axis.begin)*100)/axis.size,
            tickNextPercent = ((tickNextPx - axis.begin)*100)/axis.size;
        //check to see if the dot x locations fall between the given tick (i) and subsequent tick (i+1)               
        for (var j = 0; j < collection.length - 1; j++) {
            //get values for given feature (j)
            var feature = thisFeature(type, collection.item(j), j),
                //if minutes, convert to decimal, else parseInt
                featureVal = units === 'minutes' ? new Date(feature[val]).getMinutes() + (new Date(feature[val]).getSeconds()/60) : parseInt(feature[val], 10);
            //if given feature (j) value falls between given tick (i) and subsequent tick (i+1) values
            if (featureVal >= tickVal && featureVal <= tickNextVal) {
                //If a feature is not positioned roughly at the same percent of the axis width as the average of axis percent (i) and (i+1), count up
                if (Math.abs(((feature[coord] - axis.begin)*100)/axis.size - (tickPercent + tickNextPercent)/2) > 10) {
                    count++;
                }
            }
        }
    }
    return count;
}

export default function createScatterPlotTests() {

    describe('#ScatterPlotTests', function() {
        const MIN_YEAR = 1990;
        const MAX_YEAR = 2020;
        const MIN_MINUTES = 36;
        const MAX_MINUTES = 40;

        describe('#Content', function() {
            it('1. I can see a title element that has a corresponding id="title".', function() {
                FCC_Global.assert.isNotNull(document.getElementById('title'), 'Could not find element with id="title" ');
            });

            it('2. I can see an x-axis that has a corresponding id="x-axis".', function() {
                FCC_Global.assert.isNotNull(document.getElementById('x-axis'), 'There should be an element with id="x-axis" ');
                FCC_Global.assert.isAbove(document.querySelectorAll('#x-axis g').length, 0, 'x-axis should be a <g> SVG element ');
            });

            it('3. I can see a y-axis that has a corresponding id="y-axis".', function() {
                FCC_Global.assert.isNotNull(document.getElementById('y-axis'), 'There should be an element with id="y-axis" ');
                FCC_Global.assert.isAbove(document.querySelectorAll('g#y-axis').length, 0, 'y-axis should be a <g> SVG element');
            });

            it('4. I can see dots, that each have a class of "dot", which represent the data being plotted.', function() {
                FCC_Global.assert.isAbove(document.querySelectorAll('.dot').length, 0, 'Could not find any circles with class="dot" ');
            });

            it('5. Each dot should have the properties "data-xvalue" and "data-yvalue" containing their corresponding x and y values.', function() {
                const dots = document.getElementsByClassName('dot');
                FCC_Global.assert.isAbove(dots.length, 0, 'there are no elements with the class of "dot" ');
                for (var i = 0; i < dots.length; i++) {
                    var dot = dots[i];
                    FCC_Global.assert.isNotNull(dot.getAttribute("data-xvalue"), 'Could not find property "data-xvalue" in dot ');
                    FCC_Global.assert.isNotNull(dot.getAttribute("data-yvalue"), 'Could not find property "data-yvalue" in dot ');
                }
            });

            it('6. The data-xvalue and data-yvalue of each dot should be within the range of the actual data.', function() {
                const MIN_X_VALUE = MIN_YEAR;
                const MAX_X_VALUE = MAX_YEAR;

                const dotsCollection = document.getElementsByClassName('dot');
                //convert to array
                const dots = [].slice.call(dotsCollection);
                FCC_Global.assert.isAbove(dots.length, 0, 'there are no elements with the class of "dot" ');
                dots.forEach(dot => {

                    FCC_Global.assert.isAtLeast(dot.getAttribute("data-xvalue"), MIN_X_VALUE, "The data-xvalue of a dot is below the range of the actual data ");
                    FCC_Global.assert.isAtMost(dot.getAttribute("data-xvalue"), MAX_X_VALUE, "The data-xvalue of a dot is above the range of the actual data ");

                    //compare just the minutes for a good approximation
                    var yDate = new Date(dot.getAttribute("data-yvalue"));
                    FCC_Global.assert.isAtLeast(yDate.getMinutes(), MIN_MINUTES, "The minutes data-yvalue of a dot is below the range of the actual minutes data ");
                    FCC_Global.assert.isAtMost(yDate.getMinutes(), MAX_MINUTES, "The minutes data-yvalue of a dot is above the range of the actual minutes data ");
                })
            })

            it('7. The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.', function() {
                const dotsCollection = document.getElementsByClassName('dot');
                FCC_Global.assert.isAbove(dotsCollection.length, 0, 'there are no elements with the class of "dot" ');

                var xAxis = document.querySelector('#x-axis'),
                    x = thisAxis(xAxis, null);
                //checkAlignment returns 1 or greater if a feature doesn't align. 0 if all align.
                FCC_Global.assert.isBelow(checkAlignment(x, dotsCollection, 'dot', 'horizontal', 'years'), 1, "x values don't line up with x locations ")
            });

            it('8. The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.', function() {
                const dotsCollection = document.getElementsByClassName('dot');
                FCC_Global.assert.isAbove(dotsCollection.length, 0, 'there are no elements with the class of "dot" ');

                var yAxis = document.querySelector('#y-axis'),
                    y = thisAxis(null, yAxis);
                //checkAlignment returns 1 or greater if a feature doesn't align. 0 if all align.
                FCC_Global.assert.isBelow(checkAlignment(y, dotsCollection, 'dot', 'vertical', 'minutes'), 1, "x values don't line up with x locations ")
            });

            it('9. I can see multiple tick labels on the y-axis with "%M:%S" time  format.', function() {
                const yAxisTickLabels = document.querySelectorAll("#y-axis .tick");
                FCC_Global.assert.isAbove(yAxisTickLabels.length, 0, "Could not find tick labels on the y axis ");
                yAxisTickLabels.forEach(label => {
                    //match "%M:%S" d3 time format
                    FCC_Global.assert.match(label.textContent, /[0-5][0-9]:[0-5][0-9]/, 'Y-axis tick labels aren\'t in the "%M:%S" d3 time format ');
                });
            });


            it('10. I can see multiple tick labels on the x-axis that show the year.', function() {
                const xAxisTickLabels = document.querySelectorAll("#x-axis .tick");
                FCC_Global.assert.isAbove(xAxisTickLabels.length, 0, "Could not find tick labels on the x axis ")
                xAxisTickLabels.forEach(label => {
                    //match check if this is a year
                    FCC_Global.assert.match(label.textContent, /[1-2][0-9][0-9][0-9]/, 'X-axis tick labels do not show the year ');
                });
            });

            it('11. I can see that the range of the x-axis labels are within the range of the actual x-axis data.', function() {
                const xAxisTickLabels = document.querySelectorAll("#x-axis .tick");
                const MIN_YEAR = 1994;
                const MAX_YEAR = 2016;
                FCC_Global.assert.isAbove(xAxisTickLabels.length, 0, "Could not find tick labels on the x axis ")
                xAxisTickLabels.forEach(label => {
                    FCC_Global.assert.isAtLeast(label.textContent, MIN_YEAR, "x axis labels are below the range of the actual data ");
                    FCC_Global.assert.isAtMost(label.textContent, MAX_YEAR, "x axis labels are above the range of the actual data ");
                });
            });

            it('12. I can see that the range of the y-axis labels are within the range of the actual y-axis data.', function() {
                const yAxisTickLabels = document.querySelectorAll("#y-axis .tick");
                const MIN_TIME = new Date(0, 0, 0, 0, MIN_MINUTES, 0, 0);
                const MAX_TIME = new Date(0, 0, 0, 0, MAX_MINUTES, 0, 0);
                FCC_Global.assert.isAbove(yAxisTickLabels.length, 0, "Could not find tick labels on the y axis ");
                yAxisTickLabels.forEach(label => {
                    var timeArr = label.textContent.split(":");
                    var mins = timeArr[0];
                    var secs = timeArr[1];
                    var date = new Date(0, 0, 0, 0, mins, secs, 0);
                    FCC_Global.assert.isAtLeast(date, MIN_TIME, "y axis labels are below the range of the actual data ");
                    FCC_Global.assert.isAtMost(date, MAX_TIME, "y axis labels are above the range of the actual data ");
                });
            });

            it('13. I can see a legend that has id="legend".', function() {
                FCC_Global.assert.isNotNull(document.getElementById('legend'), 'There should be an element with id="legend" ');
            });
        });
        
        testToolTip(document.querySelectorAll('.dot'), "data-year", "data-xvalue")

    });
}
