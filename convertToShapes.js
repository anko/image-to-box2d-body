var H = require('highland')

var newShape = function () {
  return {
    mainPath : null,
    holePaths : []
  }
}

var shapes = []
var currentShape = newShape()
var currentPath = []
var currentAbsolutePosition = { x : 0, y : 0 }

var addPointToCurrentPath = function (x, y) {
  currentPath.push({ x, y })
}

var endCurrentPath = function () {
  if (!currentShape.mainPath) {
    currentShape.mainPath = currentPath
  } else {
    currentShape.holePaths.push(currentPath)
  }
  currentPath = []
}

var endCurrentShape = function () {
  shapes.push(currentShape)
  currentShape = newShape()
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
      addPointToCurrentPath(
          currentAbsolutePosition.x,
          currentAbsolutePosition.y)

      next()
    } else if (line === 'closepath') {
      endCurrentPath()
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
