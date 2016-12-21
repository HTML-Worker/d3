var data = {
    dataset : [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
        11, 12, 15, 20, 18, 17, 16, 18, 23, 25],
    w : 500,
    h : 160
};

//创建svg模型对象
var svg = d3.select("body")
            .append("svg")
            .attr("width", data.w)
            .attr("height", data.h);

//创建x比例尺函数
var xScale = d3.scale.ordinal()
    //输入值域
    .domain(d3.range(data.dataset.length))
    //输出范围
    .rangeRoundBands([0, data.w], 0.05);

//创建y比例尺
var yScale = d3.scale.linear()
    .domain([0,d3.max(data.dataset, function (d) {
        return d[0]
    })])
    .range([data.w, 0]);

//创建数轴
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(3);


svg.selectAll("rect")
    .data(data.dataset)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function (d) {
        return data.h - d * 4;
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function (d) {
        return d * 4 - 4;
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
    .attr("x", function (d, i) {
        return xScale(i) + 4;
    })
    .attr("y", function (d, i) {
       return data.h - (d * 4) + 15;
    });

//调用数轴函数
svg.append("g")
    .classed("xAxis", true)
    .attr("transform", "translate("+ xScale(0) * 1.05 +","+ (data.h - 4) +")")
    .call(xAxis);
svg.append("g")
    .classed("xAxis", true)
    .attr("transform", "translate("+ xScale(0) * 1.05 +", 0)")
    .call(yAxis);

//生成坐标ID值
svg.selectAll("text")



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


