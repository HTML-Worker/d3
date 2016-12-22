var data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
        11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

function rectBuild (data, dom) {
    this.data = data;
    this.dom = dom;
    var obj = {};
    var useData = {
        w : 600,
        h : 160,
        padding : 20,
        paddingLeft : 10
    };

    //创建svg模型对象
    var svg = d3.select(this.dom)
        .append("svg")
        .attr("width", useData.w)
        .attr("height", useData.h);

    //创建x比例尺
    var xScale = d3.scale.ordinal()
        //输入值域
        .domain(d3.range(this.data.length))
        //输出范围
        .rangeRoundBands([useData.padding, useData.w - useData.padding], 0.05);

    //创建y比例尺
    var yScale = d3.scale.linear()
        .domain([0, d3.max(this.data)])
        .range([useData.h, useData.padding * 2]);

    //创建数轴
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickSize(0, 0);
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .tickSize(0, 0)
        .ticks(5);

    obj.build = function() {
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", function(d, i) {
                return xScale(i) + useData.paddingLeft;
            })
            .attr("y", function (d) {
                return yScale(d) - useData.padding;
            })
            .attr("width", xScale.rangeBand())
            .attr("height", function (d) {
                return useData.h - yScale(d);
            })
            .attr("fill", function (d) {
                return "rgb(56, 193, " + (d * 10) + ")";
            });

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function (d) {
                return d;
            })
            .attr("text-anchor", "middle")
            .attr("x", function (d, i) {
                return xScale(i) + xScale.rangeBand() / 2 + useData.paddingLeft;
            })
            .attr("y", function (d) {
                return yScale(d) - useData.padding + 13;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");

        //调用数轴函数
        svg.append("g")
            .classed("xAxis", true)
            .attr("transform", "translate("+ useData.paddingLeft +","+ (useData.h - useData.padding) +")")
            .attr("font-size", "11px")
            .call(xAxis);
        svg.append("g")
            .classed("xAxis", true)
            .attr("transform", "translate("+ (useData.paddingLeft + xScale(0)) +","+ (-useData.padding) +")")
            .attr("font-size", "9px")
            .call(yAxis);
    };
    return obj;
}

var a = rectBuild(data, "body");
a.build();








