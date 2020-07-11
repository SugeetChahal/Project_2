

var racesFields = ["Cases_White", "Cases_Black", "Cases_LatinX", "Cases_Asian", "Cases_AIAN",
    "Cases_NHPI", "Cases_Multiracial", "Cases_Other", "Cases_Unknown"];

d3.csv("data/race.csv", function (error, data) {
    var raceMap = {};
    data.forEach(function (d) {
        var State = d.State;
        raceMap[State] = [];

        // { cerealName: [ bar1Val, bar2Val, ... ] }
        racesFields.forEach(function (field) {
            raceMap[State].push(+d[field]);
        });
    });
    makeVis(raceMap);
});

var makeVis = function (raceMap) {
    // Define dimensions of vis

    var svgWidth = 1300;
    var svgHeight = 600;

    var margin = { top: 30, right: 100, bottom: 30, left: 100 },
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;

    // Make x scale
    var xScale = d3.scale.ordinal()
        .domain(racesFields)
        .rangeRoundBands([0, width], 0.1);

    // Make y scale, the domain will be defined on bar update
    var yScale = d3.scale.linear()
        .range([height, 0]);

    // var bottomAxis = d3.axisBottom(xBandScale);
    // var leftAxis = d3.axisLeft(yLinearScale).ticks(20);

    // Create canvas
    var canvas = d3.select("#vis-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Make x-axis and add to canvas
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Make y-axis and add to canvas
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    var yAxisHandleForUpdate = canvas.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    yAxisHandleForUpdate.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");

    var updateBars = function (data) {
        // First update the y-axis domain to match data
        yScale.domain(d3.extent(data));
        yAxisHandleForUpdate.call(yAxis);

        var bars = canvas.selectAll(".bar").data(data);

        // Add bars for new data
        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d, i) { return xScale(racesFields[i]); })
            .attr("width", xScale.rangeBand())
            .attr("y", function (d, i) { return yScale(d); })
            .attr("height", function (d, i) { return height - yScale(d); });

        // Update old ones, already have x / width from before
        bars
            .transition().duration(250)
            .attr("y", function (d, i) { return yScale(d); })
            .attr("height", function (d, i) { return height - yScale(d); });

        // Remove old ones
        bars.exit().remove();
    };

    // Handler for dropdown value change
    var dropdownChange = function () {
        var newState = d3.select(this).property('value'),
            newData = raceMap[newState];

        updateBars(newData);
    };

    // Get names of states, for dropdown
    var States = Object.keys(raceMap).sort();

    var dropdown = d3.select("#vis-container")
        .insert("select", "svg")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(States)
        .enter().append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) {
            return d[0].toUpperCase() + d.slice(1, d.length); // capitalize 1st letter
        });

    var initialData = raceMap[States[0]];
    updateBars(initialData);
};
