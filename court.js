function add_court_component(){
    var Basket = court_g.append('circle');
    var Backboard = court_g.append('rect');
    var Outterbox = court_g.append('rect');
    var Innerbox = court_g.append('rect');
    var CornerThreeLeft = court_g.append('rect');
    var CornerThreeRight = court_g.append('rect');
    var OuterLine = court_g.append('rect');
}

function draw_court(tag, colors){
    var chartDiv = document.getElementById(tag);
    d3.select("#" + tag).select('svg').remove();
    var court = d3.select(chartDiv).append(tag).append('svg').attr('id', tag)
    court.attr('width', width)
         .attr('height', height)
    court.append('table');
    var heat_g = court.append('g')
    var court_g = court.append('g');
    court_g.attr("width", width)
           .attr("height", height)
    const innerWidth = width - margin.left - margin.right;
    const court_width = innerWidth - 20
    const innerHeight = height - margin.top - margin.bottom;
    var title = d3.select(document.getElementById('caption')).append('text');
    // var data_g = d3.select(chartDiv).append('shot').append('svg')
    var slider_axis = court.append('g')
                           .attr('class', 'slider-axis');
    var slider_rect = court.append('g')
                           .attr('class', 'slider-rect');
    var rect_entity = slider_rect.append('rect');
    var color = d3.scaleSequential(d3.interpolateOrRd)
                  .domain([5e-6, 3e-2]); // Points per square pixel.

    court_xScale.range([margin.left, innerWidth])
              .nice();

    court_yScale.range([margin.top, innerHeight])
              .nice();

    var angle = Math.atan((10-0.75)/(22))* 180 / Math.PI
    var dis = court_yScale(18);

    var ThreePointLand = court_g.append('rect');
    var FarThreePointLand = court_g.append('rect');
    var ThreeLine = court_g.append('path')
    appendArcPath(ThreeLine, dis, (angle+90)*(Math.PI/180), (270-angle)*(Math.PI/180))
        .attr('fill', colors['Mid-Range'])
        .attr("stroke", "black")
        .attr('class', 'shot-chart-court-3pt-line')
        .attr("transform", "translate(" + court_xScale(0) + ", " +court_yScale(0) +")");

    console.log(ThreeLine)

    var NearBasket = court_g.append('rect');
    var Outterbox = court_g.append('rect');
    var Innerbox = court_g.append('rect');
    var CornerThreeLeft = court_g.append('rect');
    var CornerThreeRight = court_g.append('rect');
    var OuterLine = court_g.append('rect');
    var RestrictedArea = court_g.append('path')
    var RestrictedAreaBack = court_g.append('path')
    var TopFreeThrow = court_g.append('path')
    var BottomFreeThrow = court_g.append('path')
    
    var CenterOuter = court_g.append('path')
    var CenterInner = court_g.append('path')
    var Basket = court_g.append('circle');
    var Backboard = court_g.append('rect');

    Outterbox
           .attr('x', court_xScale(-8))
           .attr('y', court_yScale(-4))
           .attr('width', court_xScale(8)-court_xScale(-8))
           .attr('height', court_yScale(15)-court_yScale(-4))
           .style('fill', colors['In The Paint (Non-RA)'])
           .style('stroke', 'black');

    Innerbox
           .attr('x', court_xScale(-6))
           .attr('y', court_yScale(-4))
           .attr('width', court_xScale(6)-court_xScale(-6))
           .attr('height', court_yScale(15)-court_yScale(-4))
           .style('fill', colors['In The Paint (Non-RA)'])
           .style('stroke', 'black');


    CornerThreeLeft
           .attr('x', court_xScale(-25))
           .attr('y', court_yScale(-4))
           .attr('width', (innerWidth - court_xScale(20)))
           .attr('height', court_yScale(10)-court_yScale(-4))
           .style('fill', colors['Left Corner 3'])
           .style('stroke', 'black');

    NearBasket
           .attr('x', court_xScale(-25))
           .attr('y', court_yScale(-4))
           .attr('width', court_width)
           .attr('height', court_yScale(10)-court_yScale(-4))
           .style('fill', colors['Mid-Range'])
           .style('stroke', 'none');

    ThreePointLand
           .attr('x', court_xScale(-25))
           .attr('y', court_yScale(10))
           .attr('width', court_xScale(25) - margin.right)
           .attr('height', court_yScale(43)-court_yScale(10))
           .style('fill', colors['Above the Break 3'])
           .style('stroke', 'none');

    CornerThreeRight
           .attr('x', court_xScale(20))
           .attr('y', court_yScale(-4))
           .attr('width', (innerWidth - court_xScale(20)))
           .attr('height', court_yScale(10)-court_yScale(-4))
           .style('fill', colors['Right Corner 3'])
           .style('stroke', 'black');

    OuterLine
           .attr('x', court_xScale(-25))
           .attr('y', court_yScale(-4))
           .attr('width', court_xScale(25)-court_xScale(-25))
           .attr('height', court_yScale(43)-court_yScale(-4))
           .style('fill', 'none')
           .style('stroke', 'black');

    appendArcPath(RestrictedArea, court_xScale(3)-court_xScale(0), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', colors['Restricted Area'])
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xScale(0) + ", " +court_yScale(-0.75) +")");

    appendArcPath(RestrictedAreaBack, court_xScale(0)-court_xScale(3), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', colors['Restricted Area'])
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xScale(0) + ", " +court_yScale(-0.75) +")");


    appendArcPath(TopFreeThrow, court_xScale(6)-court_xScale(0), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xScale(0) + ", " +court_yScale(15) +")");


    appendArcPath(BottomFreeThrow, court_xScale(6)-court_xScale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .style("stroke-dasharray", ("3, 3"))
        .attr("transform", "translate(" + court_xScale(0) + ", " +court_yScale(15) +")");


    


    appendArcPath(CenterOuter, court_xScale(6)-court_xScale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xScale(0) + ", " +court_yScale(43) +")");

    appendArcPath(CenterInner, court_xScale(2)-court_xScale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xScale(0) + ", " +court_yScale(43) +")");

    Basket.attr('cx', court_xScale(0))
           .attr('cy', court_yScale(-0.75))
           .attr('r', court_yScale(0.75)-court_yScale(0))
           .style('fill', 'black')
           .style('stroke', 'black');

    Backboard.attr('x', court_xScale(-3))
           .attr('y', court_yScale(-1.5))
           .attr('width', court_xScale(3)-court_xScale(-3))
           .attr('height', 1)
           .style('fill', 'none')
           .style('stroke', 'black');
}


function appendArcPath(base, radius, startAngle, endAngle) {
      var points = 30;

      var angle = d3.scaleLinear()
          .domain([0, points - 1])
          .range([startAngle, endAngle]);

      var line = d3.lineRadial()
          .radius(radius)
          .angle(function(d, i) { return angle(i); });

      return base.datum(d3.range(points))
          .attr("d", line);
}