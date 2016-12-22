var data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
        11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

var setting = {
    style: {
        xFontSize : 11,
        yFontSize : 9,
        rectClass : "bar",
        xAxisClass : "xAxis",
        yAxisClass : "yAxis",
        fontFamily : "sans-serif",
        textFontSize : 11,
        textFill : "white"
    },
    color: ['#c3d8f0', '#aac7e8', '#6796ca', '#5588c1','#497ebb', '#3878c1', '#2b6cb8', '#1c5fad','#0f529f', '#064a98']
};

function rectBuild (data, dom, setting) {
    this.data = data;
    this.dom = dom;
    var useData = {
        m : 0,
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

    //颜色处理方法
    colorChoose = function (d, i) {
        var chooseColor;
        if(setting.color) {
            if(setting.color[i] != null) {
                chooseColor = setting.color[i];
            }else {
                if(useData.m < setting.color.length) {
                    chooseColor = setting.color[useData.m];
                    useData.m++;
                }else {
                    useData.m = 0;
                    chooseColor = setting.color[useData.m];
                    useData.m++;
                }
            }
        }else {
            chooseColor = "rgb(56, 193, " + (d * 10) + ")";
        }
        return chooseColor;
    };

    this.build = function () {
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .classed(setting.style.rectClass, true)
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
            .attr("fill", function (d, i) {
                return colorChoose(d, i);
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
            .attr("font-family", setting.style.fontFamily + "px")
            .attr("font-size", setting.style.textFontSize + "px")
            .attr("fill", setting.style.textFill);

        //调用数轴函数
        svg.append("g")
            .classed(setting.style.xAxisClass, true)
            .attr("transform", "translate("+ useData.paddingLeft +","+ (useData.h - useData.padding) +")")
            .attr("font-size", setting.style.xFontSize+"px")
            .call(xAxis);
        svg.append("g")
            .classed(setting.style.yAxisClass, true)
            .attr("transform", "translate("+ (useData.paddingLeft + xScale(0)) +","+ ( - useData.padding) +")")
            .attr("font-size", setting.style.yFontSize+"px")
            .call(yAxis);
    };
}

var a = new rectBuild(data, "body", setting);
a.build();








