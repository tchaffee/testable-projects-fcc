import $ from 'jquery';
import { testToolTip } from '../assets/globalD3Tests';

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
                //convert to array
                const dots = [].slice.call(dotsCollection);
                FCC_Global.assert.isAbove(dots.length, 0, 'there are no elements with the class of "dot" ');
                //sort the dots based on xvalue in ascending order
                const sortedDots = dots.sort(function(a, b) {
                    return a.getAttribute("data-xvalue") - b.getAttribute("data-xvalue")
                });
                var xAxisQuery = document.querySelector('#x-axis path');
                //x-axis path x coordinates from d
                var xAxisLeft = xAxisQuery.getAttribute('d').split(',')[0].split('M')[1]
                var xAxisRight = xAxisQuery.getAttribute('d').split(',')[1].split('H')[1].split('V')[0]
                //get label (year)
                var xAxisTicks = document.querySelectorAll('#x-axis .tick');
                var xAxisTicksText = document.querySelectorAll('#x-axis .tick text');
                //width of x-axis in pixels
                var xRange = xAxisRight - xAxisLeft;
                for (var i = 0; i < xAxisTicksText.length - 1; i++) {
                    //years
                    var xAxisLabel = xAxisTicksText.item(i).innerHTML;
                    var xAxisLabelNext = xAxisTicksText.item(i+1).innerHTML;
                    var xAxisYear = parseInt(xAxisLabel, 10);
                    var xAxisYearNext = parseInt(xAxisLabelNext, 10);
                    //px
                    var xAxisPx = xAxisTicks.item(i).getAttribute('transform').split(',')[0].split('(')[1];
                    var xAxisPxNext = xAxisTicks.item(i+1).getAttribute('transform').split(',')[0].split('(')[1];
                    //percent of x-axis width
                    var xAxisPercent = ((xAxisPx-xAxisLeft)*100)/xRange; 
                    var xAxisPercentNext = ((xAxisPxNext-xAxisLeft)*100)/xRange;
                    //check to see if the dot x locations line up with x ticks
                    for (var j = 0; j < sortedDots.length - 1; j++) {
                        var dotYear = new Date(sortedDots[j].getAttribute('data-xvalue')).getFullYear();
                        var dotPx = +sortedDots[j].cx.baseVal.value;
                        var dotPercent = ((dotPx-xAxisLeft)*100)/xRange;
                        //if given dot year falls between axis year (i) and (i+1)
                        if (dotYear >= xAxisYear && dotYear <= xAxisYearNext) {
                            //Assert that the dot is roughly at the same percent of the axis width as the average of axis percent (i) and (i+1)
                            FCC_Global.assert.approximately(dotPercent, (xAxisPercentNext + xAxisPercent)/2, 10, "x values don't line up with x locations ")
                        }
                    }
                }
            });

            it('8. The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.', function() {
                const dotsCollection = document.getElementsByClassName('dot');
                //convert to array
                const dots = [].slice.call(dotsCollection);
                FCC_Global.assert.isAbove(dots.length, 0, 'there are no elements with the class of "dot" ');
                //sort the dots based on yvalue in ascending order
                const sortedDots = dots.sort(function(a, b) {
                    return new Date(a.getAttribute("data-yvalue")) - new Date(b.getAttribute("data-yvalue"));
                });

                var yAxisQuery = document.querySelector('#y-axis path');
                //y-axis path y coordinates from d
                var yAxisTop = yAxisQuery.getAttribute('d').split(',')[1].split('H')[0];
                var yAxisBottom = yAxisQuery.getAttribute('d').split(',')[1].split('V')[1].split('H')[0];
                //get label (mm:ss)
                var yAxisTicks = document.querySelectorAll('#y-axis .tick');
                var yAxisTicksText = document.querySelectorAll('#y-axis .tick text');
                //height of y-axis in pixels
                var yRange = yAxisBottom - yAxisTop;
                for (var i = 0; i < yAxisTicksText.length - 1; i++) {
                    //min
                    var yAxisLabel = yAxisTicksText.item(i).innerHTML;
                    var yAxisLabelNext = yAxisTicksText.item(i+1).innerHTML;
                    var yAxisMins = (parseInt(yAxisLabel.split(':')[0], 10)+(parseInt(yAxisLabel.split(':')[1], 10)/60));
                    var yAxisMinsNext = (parseInt(yAxisLabelNext.split(':')[0], 10)+(parseInt(yAxisLabelNext.split(':')[1], 10)/60));
                    //px
                    var yAxisPx = yAxisTicks.item(i).getAttribute('transform').split(',')[1].split(')')[0];
                    var yAxisPxNext = yAxisTicks.item(i+1).getAttribute('transform').split(',')[1].split(')')[0];
                    //percent of y-axis height
                    var yAxisPercent = ((yAxisPx-yAxisTop)*100)/yRange; 
                    var yAxisPercentNext = ((yAxisPxNext-yAxisTop)*100)/yRange;
                    //check to see if the dot y locations line up with the y ticks
                    for (var j = 0; j < sortedDots.length - 1; j++) {
                        var dotMins = new Date(sortedDots[j].getAttribute('data-yvalue')).getMinutes()+(new Date(sortedDots[j].getAttribute('data-yvalue')).getSeconds())/60
                        var dotPx = +sortedDots[j].cy.baseVal.value;
                        var dotPercent = ((dotPx-yAxisTop)*100)/yRange;
                        //if given dot decimal minutes fall between axis minutes (i) and (i+1)
                        if (dotMins >= yAxisMins && dotMins <= yAxisMinsNext) {
                            //Assert that the dot is roughly at the same percent of the axis height as the average of axis percent (i) and (i+1)	
                            FCC_Global.assert.approximately(dotPercent, (yAxisPercentNext + yAxisPercent)/2, 10, "y values don't line up with y locations ")
                        }
                    }
                }
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
