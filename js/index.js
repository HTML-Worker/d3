var dataset=[50,43,120,87,99,167,142];
var width=800;
var height=400;
var svg=d3.select("body")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

var padding={top:20, right:20, bottom:20, left:20};
var rectStep=35;
var rectWidth=30;
var rect=svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("fill","steelblue")
    .attr("x",function(d,i){
        return padding.left+i*rectStep;
    })
    .attr("y",function(d){
        return height-padding.bottom-d;
    })
    .attr("width",rectWidth)
    .attr("height",function(d){
        return d;
    });

var text=svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("fill","white")
    .attr("font-size","14px")
    .attr("text-anchor","middle")//文字对齐方式
    .attr("x",function(d,i){
        return padding.left+i*rectStep;
    })
    .attr("y",function(d){
        return height-padding.bottom-d;
    })
    .attr("dx",rectWidth/2)
    .attr("dy","1em")
    .text(function(d){
        return d;
    });

function draw(){
    var updateRect=svg.selectAll("rect")
        .data(dataset);
    var enterRect=updateRect.enter();//获取矩形的enter部分
    var exitRect=updateRect.exit();

    updateRect.attr("fill","steelblue")
        .attr("x",function(d,i){
            return padding.left+i*rectStep;
        })
        .attr("y",function(d){
            return height-padding.bottom-d;
        })
        .attr("width",rectWidth)
        .attr("height",function(d){
            return d;
        });

    enterRect.append("rect")
        .attr("x",function(d,i){
            return padding.left+i*rectStep;
        })
        .attr("y",function(d){
            return height-padding.bottom-d;
        })
        .attr("width",rectWidth)
        .attr("height",function(d){
            return d;
        });

    exitRect.remove();


    var updateText=svg.selectAll("text")
        .data(dataset);
    var enterText=updateText.enter();
    var exitText=updateText.exit();

    updateText.attr("fill","white")
        .attr("font-size","14px")
        .attr("text-anchor","middle")//文字对齐方式
        .attr("x",function(d,i){
            return padding.left+i*rectStep;
        })
        .attr("y",function(d){
            return height-padding.bottom-d;
        })
        .attr("dx",rectWidth/2)
        .attr("dy","1em")
        .text(function(d){
            return d;
        });//注意添加的性质

    enterText.append("text")
        .attr("fill","white")
        .attr("font-size","14px")
        .attr("text-anchor","middle")//文字对齐方式
        .attr("x",function(d,i){
            return padding.left+i*rectStep;
        })
        .attr("y",function(d){
            return height-padding.bottom-d;
        })
        .attr("dx",rectWidth/2)
        .attr("dy","1em")
        .text(function(d){
            return d;
        });

    exitText.remove();

}


function mysort(){
    console.log(dataset);
    dataset.sort(d3.ascending);
    console.log(dataset.sort(d3.ascending));
    // dataset.sort(function(a,b){
    //  return a-b;
    // });
    // console.log(dataset.sort(function(a,b){
    //  return a-b;
    // }));
    draw();
}

function myadd(){
    dataset.push(Math.floor(Math.random()*100));
    console.log(dataset);
    draw();
}



// var p=d3.select("body").selectAll("p");
// p.datum(7);
// console.log(p);

// var p=d3.select("body")
//  .selectAll("p")
//  .text("Hello World")
// p.style("color","red");
// p.style("font-size","72px");


// var width=400;
// var height=400;
// var svg=d3.select("body")
//          .append("svg")z`
//          .attr("width",width)
//          .attr("height",height);
// svg.append("circle")
//  .attr("cx","50px")
//  .attr("cy","50px")
//  .attr("r","50px")
//  .attr("fill","red")

// console.log(error);