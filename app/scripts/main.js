

var dataset = [];
var datafeed = d3.csv("data/war-on-ice-2016-05-03 21-25-00.csv", function(d){
        dataset.push({name: d.Name, pos: d.Pos, toi: d.TOI, home: d.home});
    },function(err, rows){
        generateItems(dataset);
    });

function animateFirstStep(){
    d3.select(this)
      .transition()
        .delay(0)
        .duration(1000)
        .attr("data-init", this.getAttribute("r"))
        .attr("r", 50)
        .each("end", animateSecondStep);
};

function animateSecondStep(){
    d3.select(this)
      .transition()
        .duration(1000)
        .attr("r", this.getAttribute("data-init"));
};

var svgizzle = d3.select("#viz")
    .append("svg")
    .attr("width", 700)
    .attr("height", 700)
    .attr("x", 50)
    .attr("y", 60);

var generateItems = function(dataset){

    var _cols = 6;
    var _size = 120;
    var _colors = {
        home: 'red',
        away: 'blue'
    }

    var node = svgizzle.selectAll("circle")
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "node");

    node.append("circle")
        .attr("class", "circle")
        .style("stroke", "gray")
        .style("fill", function(d){
            return ( d.home == true ? _colors.home : _colors.away)
        })
        .attr("r", function(d){ return (_size / 2) * (d.toi / 60) })
        .attr("cx", function(d, i){
            return (_size / 2 ) + (i % _cols * _size);
        })
        .attr("cy", function(d, i){
            return (_size / 2) + (Math.floor(i / _cols) * _size);
        })
        .on("mouseover", function(d){d3.select(this).style("fill", "white");})
        .on("mouseout", function(d){d3.select(this).style("fill", ( d.home == true ? _colors.home : _colors.away));})
        .on("mousedown", animateFirstStep);

    node.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "txt")
        .attr("x", function(d, i){
            return (_size / 2) + (i % _cols * _size);
        })
        .attr("y", function(d, i){
            return ((_size / 2) + 3) + (Math.floor(i / _cols) * _size);
        })
        .text(function(d) {
            console.log('=', d);
            return d.name.substring(d.name.lastIndexOf(".") + 1).toUpperCase();
        });

};
