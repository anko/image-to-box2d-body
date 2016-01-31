var H = require('highland')

var shapes = []
var currentShape = []
var currentAbsolutePosition = { x : 0, y : 0 }

var addPointToCurrentShape = function (x, y) {
  currentShape.push({ x, y })
}

var endCurrentShape = function () {
  shapes.push(currentShape)
  currentShape = []
}

var processLine = function (error, line, push, next) {
  if (error) {
    push(error)
    next()
  } else if (line === H.nil) { // Ended
    push(null, line)
  } else {
    var m
    if (m = line.match(/^(-?\d+)\s+(-?\d+)\s+(rlineto|moveto)$/)) {
      var x = parseInt(m[1], 10)
      var y = parseInt(m[2], 10)
      var method = m[3]
      switch (method) {
        case 'moveto':
          currentAbsolutePosition.x = x
          currentAbsolutePosition.y = y
          break
        case 'rlineto':
          currentAbsolutePosition.x += x
          currentAbsolutePosition.y += y
          break
      }
      addPointToCurrentShape(
          currentAbsolutePosition.x,
          currentAbsolutePosition.y)

      next()
    } else if (line === 'fill') {
      endCurrentShape()
    }
    next()
  }
}

var outputResult = function () {
  console.log(JSON.stringify({ shapes : shapes }))
}

H(process.stdin)
  .split()
  .consume(processLine)
  .done(outputResult)
