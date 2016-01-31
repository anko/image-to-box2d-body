var H = require('highland')
var totri = require('poly2tri')

var shapeToTriangles = function (shape) {
  var sweep = new totri.SweepContext(shape.mainPath.slice(1))
  shape.holePaths.forEach(function (h) {
    sweep.addHole(h.slice(1))
  })

  sweep.triangulate()

  var triangles = sweep.getTriangles()
  return triangles
    .map(function (t) {
      return t.getPoints()
        .map(function (p) { return { x : p.x, y : p.y } })
    })
}

H(process.stdin)
  .collect()
  .toArray(function (fragments) {
    var string = fragments.join('')
    var obj = JSON.parse(string)
    var triangles = obj.shapes
      .map(shapeToTriangles)
    console.log(JSON.stringify({ triangulatedShapes : triangles }))
  })
