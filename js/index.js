var dataset = [50,43,120,87,99,167,142];

function myadd() {
    d3.select("body").selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .classed("bar", true)
        .style("height", function(d) {
            return d + "px";
        })
}