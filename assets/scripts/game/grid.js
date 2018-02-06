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

const leftPoints = 2
const acutePoints = 4
const rightPoints = 3
const obtusePoints = 2
const straightPoints = 1

function abDiff (a, b) {
  return Math.abs(a - b)
}

function assessDifficulty (coordinateList) {
  // check for left moving
  let wordRank = 0
  for (let i = 1; i < coordinateList.length; i++) {
    if (coordinateList[i][0] < coordinateList[i - 1][0]) {
      wordRank += leftPoints
    }
  }
  for (let i = 2; i < coordinateList.length; i++) {
    const x1 = coordinateList[i - 2][0]
    const y1 = coordinateList[i - 2][1]
    const x2 = coordinateList[i - 1][0]
    const y2 = coordinateList[i - 1][1]
    const x3 = coordinateList[i][0]
    const y3 = coordinateList[i][1]
    // acute angle check
    if (((y1 === y3) && (y1 !== y2) && (abDiff(x1, x3) === 1)) ||
        ((x1 === x3) && (x1 !== x2) && (abDiff(y1, y3) === 1))) {
      wordRank += acutePoints
    } else if (((y1 === y2) && (y2 !== y3) && (x1 !== x2) && (x2 === x3)) ||
        ((x1 === x2) && (x2 !== x3) && (y1 !== y2) && (y2 === y3)) ||
        ((y1 === y3) && (y1 !== y2) && (abDiff(x1, x3) === 2)) ||
        ((x1 === x3) && (x1 !== x2) && (abDiff(y1, y3) === 2))) {
      wordRank += rightPoints
    } else if (((x1 - x2) === (x2 - x3)) && ((y1 - y2) === (y2 - y3))) {
      wordRank += straightPoints
    } else {
      wordRank += obtusePoints
    }
  }
  return wordRank
}

module.exports = {
  getNewCoordinate,
  thisCoordinateIsOk,
  assessDifficulty
}
