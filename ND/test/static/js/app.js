// Pseudo Data
covid = {
    "states": ["CA", "NY"],
    "cases":[100, 50],
    "deaths": [25, 20],
    "actives": [50, 30],
    "recovered": [90, 80]
};

// Set up SVG chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create an SVG element wrapper
var svg = d3
.select("#graph")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

// Append a group to hold the chart
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`)
.classed("chart", true);

// Initial Parameters
var activeXAxis = "cases";
var activeYAxis = "states";

// Create an x-axis and y-axis scale function
function xScale(covidData, activeXAxis) {
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(covidData, d=> d[activeXAxis]), d3.max([covidData, d => d[activeXAxis]])])
    .range([0, chartWidth]);

    return xLinearScale;
}

function yScale(covidData, activeYAxis) {
    var yBandScale = d3.scaleBand()
    .domain(covidData, d => d[activeYAxis])
    .range([chartHeight, 0]);

    return yBandScale;
}

// Create a function to render the data circles when the option is changed
function renderXCircle(circlesGroup, newXScale, activeXAxis) {
    circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[activeXAxis]));

    return circlesGroup;
}

// Create a function for the d3 tool tip and change it based on the options
function updateToolTip(activeXAxis, circlesGroup) {

    // Create an empty variable to update it with conditions
    var xLabel;
    if (activeXAxis === "cases") {
        xLabel = "Number of Cases: ";
    }
    else if (activeXAxis === "deaths") {
        xLabel = "Number of Deaths: ";
    }
    else if (activeXAxis === "actives") {
        xLabel = "Number of Active Cases: ";
    }
    else {
        xLabel = "People Recovered: ";
    }

    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
        return (`${d.state} <br>
        ${xLabel} ${d[activeXAxis]}`);
    });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(d) {
        toolTip.show(d);
    })
    .on("mouseout", function(d) {
        toolTip.hide(d);
    })

    return circlesGroup;
}

// d3.json("/covidjson", function(error, covidData) {
d3.json(covid, function(error, covidData) {

    if (error) throw error;

    console.log(covidData);

    // Create the scales
    var xLinearScale = xScale(covidData, activeXAxis);
    var yBandScale = yScale(covidData, activeYAxis);

    // Setup x-axis and y-axis
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Append the x-axis and y-axis onto the chart
    var xAxis = chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    var yAxis = chartGroup.append("g")
    .call(leftAxis);

    // Append the circles / scatter points onto the chart
    var circlesGroup = chartGroup.selectAll("circle")
    .data(covidData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[activeXAxis]))
    .attr("cy", d => yBandScale(d[activeYAxis]))
    .attr("r", 10)
    .classed("dataCircle", true);

    // Create a group for the x and y labels
    var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var yLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create individual label topics for the x-axis
    var casesLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "cases")
    .classed("active", true)
    .classed("aText", true)
    .text("Cases");

    var deathssLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "deaths")
    .classed("active", true)
    .classed("aText", true)
    .text("Deaths");

    var activesLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "actives")
    .classed("active", true)
    .classed("aText", true)
    .text("Active Cases");

    var recoverLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("value", "recovered")
    .classed("active", true)
    .classed("aText", true)
    .text("Recovered Cases");

    // Create individual label topics for the y-axis
    // var statesLabel = 
    yLabelsGroup.append("text")
    .attr("transform", "rotate(-90")
    .attr("y", -90 - margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "3.6em")
    .attr("value", "states")
    .classed("active", true)
    .classed("aText", true)
    .text("States");

    
    // Initializes the d3 tool tip
    var circlesGroup = updateToolTip(activeXAxis, activeYAxis, circlesGroup);

     // Create an event listener for the labels, when a different option is selected
    // X-axis labels event listener
    xLabelsGroup.selectAll("text")
    .on("click", function() {
        // Get the value of the selection
        var value = d3.select(this)
        .attr("value");
        if (value !== activeXAxis) {
            // Replaces the activeXAxis variable with the value
            activeXAxis = value;

            // Updates the x-scale for the new data
            xLinearScale = xScale(covidData, activeXAxis);

            // Updates the x-axis for the new x values and transitions
            xAxis = renderXAxes(xLinearScale, xAxis);

            // Updates the circles with new x values and transitions
            circlesGroup = renderXCircles(circlesGroup, xLinearScale, activeXAxis);

            // Updates the d3 tool tip with the new data
            circlesGroup = updateToolTip(activeXAxis, activeYAxis, circlesGroup);
            
            // Changes the appearance of the labels, based on which one is selected
            if (activeXAxis === "deaths") {
                deathsLabel
                .classed("active", true)
                .classed("inactive", false);
                casesLabel
                .classed("active", false)
                .classed("inactive", true);
                activesLabel
                .classed("active", false)
                .classed("inactive", true);
                recoverLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else if (activeXAxis === "cases") {
                casesLabel
                .classed("active", true)
                .classed("inactive", false);
                deathsLabel
                .classed("active", false)
                .classed("inactive", true);
                activesLabel
                .classed("active", false)
                .classed("inactive", true);
                recoverLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else if (activeXAxis === "actives") {
                activesLabel
                .classed("active", true)
                .classed("inactive", false);
                deathsLabel
                .classed("active", false)
                .classed("inactive", true);
                casesLabel
                .classed("active", false)
                .classed("inactive", true);
                recoverLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else if (activeXAxis === "recovered") {
                recoverLabel
                .classed("active", true)
                .classed("inactive", false);
                deathsLabel
                .classed("active", false)
                .classed("inactive", true);
                activesLabel
                .classed("active", false)
                .classed("inactive", true);
                casesLabel
                .classed("active", false)
                .classed("inactive", true);
            }
        }});
}).catch(error => console.log(error));