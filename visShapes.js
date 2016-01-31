var shapes = require('./out/shapes.json')
var d3 = require('d3')

var svg = d3.select('#vis')
  .attr({
    width : 2000,
    height : 1500
  })

var shapeCol = d3.scale.category10()

var lineFromPathData = d3.svg.line()
  .x(function (d) { return d.x })
  .y(function (d) { return d.y })

var shapes = svg.selectAll('.shape')
  .data(shapes.shapes)
  .enter()
  .append('g')
  .attr('class', 'shape')
  .each(function (d, i) {
    var root = d3.select(this)
    root
      .append('path')
      .attr('class', 'main-path')
      .attr('d', lineFromPathData(d.mainPath) + 'Z')
      .style('stroke', shapeCol(i))
      .style('fill', shapeCol(i))
      .style('fill-opacity', 0.1)
      .style('stroke-width', 5)
    /*
    root.selectAll('.point')
      .data(d.mainPath)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('r', 12)
      .style('fill', shapeCol(i))
      .attr('cx', function (d) { return d.x })
      .attr('cy', function (d) { return d.y })
    */

    root.selectAll('.hole-path')
      .data(d.holePaths)
      .enter()
      .append('path')
      .attr('class', 'hole-path')
      .attr('d', function (d) { return lineFromPathData(d) + 'Z' })
      .style('stroke', 'red')
      .style('fill', 'red')
      .style('fill-opacity', 0.1)
      .style('stroke-width', 5)
  })
