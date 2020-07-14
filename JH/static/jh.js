var svgWidth = 600;
var svgHeight = 400;
var margin = { top: 100, right: 100, bottom: 100, left: 100 },
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;


d3.json('/covid').then(data => { 
    var allGroup = d3.map(data.data, function(d){return(d.State)}).keys();
    // create dropwdown and populate menu
    var unitMenu = d3.select("#dropdown").append("select");
    unitMenu
        .selectAll("option")
        .data(allGroup)
        .enter()
        .append("option")
        .attr("value", (d) => {return d;})
        .text((d) => {return d;});
    
    // add the options to the button
    updateChart(allGroup[0]);

    function updateChart(selectedState) {
        d3.selectAll('svg').remove();
        svg = d3.select("#graph").append("svg").attr("width", svgWidth).attr("height", svgHeight);
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

        g.selectAll(".bar")
            .data(selectedData.statics)
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
            .call(d3.axisLeft(y).ticks(20)); 
    }

    unitMenu.on('change', function() {
        var selectedState = d3.select(this)  // this is the select element
            .property("value");
        updateChart(selectedState);
    });   
});

