var shapes = require('./out/shapes.json')
var d3 = require('d3')

var svg = d3.select('#vis')
  .attr({
    width : 2000,
    height : 1500
  })

var shapeCol = d3.scale.category10()

var lineFromShape = d3.svg.line()
  .x(function (d) { return d.x })
  .y(function (d) { return d.y })

var shapes = svg.selectAll('.shape')
  .data(shapes.shapes)
  .enter()
  .append('g')
  .style('fill', shapeCol)
  .attr('class', 'shape')
  .each(function (d, i) {
    d3.select(this)
      .append('path')
      .attr('d', function (d) { return lineFromShape(d) + 'Z' })
      .style('stroke', shapeCol)
      .style('stroke-width', 5)
      .style('fill', 'none')
      .attr('class', 'polyline')
  })

shapes.selectAll('.point')
  .data(function (d) { return d })
  .enter()
  .append('circle')
  .attr('class', 'point')
  .attr('r', 12)
  .attr('cx', function (d) { return d.x })
  .attr('cy', function (d) { return d.y })
