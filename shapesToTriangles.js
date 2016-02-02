var H = require('highland')
var totri = require('poly2tri')

// The poly2tri algorithm returns Point objects (which have properties in
// addition to `x` and `y` which we don't care about, let's keep stuff clean
// and extract only what we need.
var extractXY = function (pointObject) {
  return { x : pointObject.x,
           y : pointObject.y }
}

var shapeToTriangles = function (shape) {
  var sweep = new totri.SweepContext(shape.mainPath.slice(1))
  shape.holePaths.forEach(function (h) {
    sweep.addHole(h.slice(1))
  })

  sweep.triangulate()

  var triangles = sweep.getTriangles()
  return triangles
    .map(function (t) {
      return t.getPoints().map(extractXY)
    })
}

H(process.stdin)
  .collect()
  .toArray(function (fragments) {
    var string = fragments.join('')
    var obj = JSON.parse(string)

    var triangles = obj.shapes.map(shapeToTriangles)

    console.log(JSON.stringify({ triangulatedShapes : triangles }))
  })
