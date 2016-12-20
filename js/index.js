var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
var w = 500;
var h = 100;
var barpadding = 1;

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", function(d, i) {
        return (w / dataset.length) * i;
    })
    .attr("y", function (d) {
        return h - d * 4;
    })
    .attr("width", function() {
        return (w / dataset.length - barpadding)
    })
    .attr("height", function (d) {
        return d * 4;
    })
    .attr("fill", function (d) {
        return "rgb(56, 193, " + (d * 10) + ")";
        });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", function (d, i) {
        return i * (w / dataset.length) + 5;
    })
    .attr("y", function (d, i) {
       return h - (d * 4) + 15;
    });


    //多值映射写法失败，可能是版本问题
    // .attr({
    //     x: function(d, i) {
    //         return (w / dataset.length + barpadding) * i;
    //     },
    //     y: function(d) {
    //         return d;
    //     },
    //     width: w / dataset.length - barpadding,
    //     height: function(d) {
    //         return d;
    //     }
    // });


