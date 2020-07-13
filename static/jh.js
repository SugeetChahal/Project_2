var svgWidth = 1300;
var svgHeight = 1000;
var margin = { top: 30, right: 100, bottom: 30, left: 100 },
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;


d3.json('/covid').then(data => { 
    var allGroup = d3.map(data.data, function(d){return(d.State)}).keys()
    // add the options to the button
    updateChart(allGroup[0]);
    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(allGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

    function updateChart(selectedState) {
        svg = d3.select("body").append("svg").attr("width", svgWidth).attr("height", svgHeight);
        x = d3.scaleBand().rangeRound([0, width]).padding(0.2), 
        y = d3.scaleLinear().rangeRound([height, 0]), 
        g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`); 
        var selectedData;
        for (i = 0; i < data.data.length; i++) {
            if (data.data[i].State == selectedState) {
                selectedData = data.data[i];
                break;
            } 
        }
        x.domain(selectedData.statics.map(d => d.race)); 
        y.domain([0, d3.max(selectedData.statics, d => d.case)]); 
        
        g.selectAll(".bar").remove();
        g.selectAll(".bar").data(selectedData.statics)
            .enter()
            .append("rect") 
            .attr("class", "bar") 
            .attr("x", d => x(d.race)) 
            .attr("y", d => y(d.case)) 
            .attr("width", x.bandwidth()) 
            .attr("height", d => height - y(d.case));

        g.append("g") 
            .attr("class", "axis axis-x") 
            .attr("transform", `translate(0,${height})`) 
            .call(d3.axisBottom(x)); 
            
        g.append("g") 
            .attr("class", "axis axis-y") 
            .call(d3.axisLeft(y).ticks(10)); 
    }

    d3.select("#selectButton").on("change", function(d){
        selectedState = this.value;
        updateChart(selectedState);
    })
});

