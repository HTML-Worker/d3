var data = {
    dataset : [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
        11, 12, 15, 20, 18, 17, 16, 18, 23, 25],
    w : 600,
    h : 160,
    padding : 20,
    paddingLeft : 10
};

//创建svg模型对象
var svg = d3.select("body")
            .append("svg")
            .attr("width", data.w)
            .attr("height", data.h);

//创建x比例尺
var xScale = d3.scale.ordinal()
    //输入值域
    .domain(d3.range(data.dataset.length))
    //输出范围
    .rangeRoundBands([data.padding, data.w - data.padding], 0.05);

//创建y比例尺
var yScale = d3.scale.linear()
    .domain([0, d3.max(data.dataset)])
    .range([data.h, data.padding * 2]);

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


svg.selectAll("rect")
    .data(data.dataset)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", function(d, i) {
        return xScale(i) + data.paddingLeft;
    })
    .attr("y", function (d) {
        return yScale(d) - data.padding;
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function (d) {
        return data.h - yScale(d);
    })
    .attr("fill", function (d) {
        return "rgb(56, 193, " + (d * 10) + ")";
        });

svg.selectAll("text")
    .data(data.dataset)
    .enter()
    .append("text")
    .text(function (d) {
        return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
        return xScale(i) + xScale.rangeBand() / 2 + data.paddingLeft;
    })
    .attr("y", function (d) {
        return yScale(d) - data.padding + 13;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

//调用数轴函数
svg.append("g")
    .classed("xAxis", true)
    .attr("transform", "translate("+ data.paddingLeft +","+ (data.h - data.padding) +")")
    .attr("font-size", "11px")
    .call(xAxis);
svg.append("g")
    .classed("xAxis", true)
    .attr("transform", "translate("+ (data.paddingLeft + xScale(0)) +","+ (-data.padding) +")")
    .attr("font-size", "9px")
    .call(yAxis);

//生成坐标ID值
// svg.selectAll("text")



    //多值映射写法
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


