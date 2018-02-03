'use strict'

function getNewCoordinate (mapDirection, coordinate) {
  // console.log(coordinate)
  // console.log(mapDirection)
  if (mapDirection === 1) { return [coordinate[0], coordinate[1] - 1] }
  if (mapDirection === 2) { return [coordinate[0] + 1, coordinate[1] - 1] }
  if (mapDirection === 3) { return [coordinate[0] + 1, coordinate[1]] }
  if (mapDirection === 4) { return [coordinate[0] + 1, coordinate[1] + 1] }
  if (mapDirection === 5) { return [coordinate[0], coordinate[1] + 1] }
  if (mapDirection === 6) { return [coordinate[0] - 1, coordinate[1] + 1] }
  if (mapDirection === 7) { return [coordinate[0] - 1, coordinate[1]] }
  if (mapDirection === 8) { return [coordinate[0] - 1, coordinate[1] - 1] }
  if (mapDirection > 8) { return [-1, -1] }
}

function thisCoordinateIsOk (newCoordinate, coordinateList, xWidth, yHeight) {
  yHeight = yHeight || xWidth // without a yHeight, set it to xWidth
  // If the new coordinate is in bounds...
  if ((newCoordinate[0] >= 0) &&
  (newCoordinate[0] < xWidth) &&
  (newCoordinate[1] >= 0) &&
  (newCoordinate[1] < yHeight)) {
    // Is that coordinate already in the coordinateList?
    for (let i = 0; i < coordinateList.length; i++) {
      if ((coordinateList[i][0] === newCoordinate[0]) &&
     (coordinateList[i][1] === newCoordinate[1])) {
        // if it is, return FALSE - this coordinate is NOT ok.
        return false
      }
    }
    // otherwise, the coordinate is ok - return TRUE!
    return true
  } else {
    // the coordinate is not in bounds.
    return false
  }
}

module.exports = {
  getNewCoordinate,
  thisCoordinateIsOk
}
