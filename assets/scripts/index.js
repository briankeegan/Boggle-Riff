'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
const dictionary22 = require('./dictionary22')

// $(() => {
//   setAPIOrigin(location, config)
// })

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const bookEvents = require('./books/events')

// const originalDictionaryFile = require('dictionary-test.js')
// const origDict = require('../js/dictionary-test.js')

const dictionaryObject = dictionary22
let dictionaryString

const diceList16 = {
  0: ['R', 'I', 'F', 'O', 'B', 'X'],
  1: ['I', 'F', 'E', 'H', 'E', 'Y'],
  2: ['D', 'E', 'N', 'O', 'W', 'S'],
  3: ['U', 'T', 'O', 'K', 'N', 'D'],
  4: ['H', 'M', 'S', 'R', 'A', 'O'],
  5: ['L', 'U', 'P', 'E', 'T', 'S'],
  6: ['A', 'C', 'I', 'T', 'O', 'A'],
  7: ['Y', 'L', 'G', 'K', 'U', 'E'],
  8: ['Qu', 'B', 'M', 'J', 'O', 'A'],
  9: ['E', 'H', 'I', 'S', 'P', 'N'],
  10: ['V', 'E', 'T', 'I', 'G', 'N'],
  11: ['B', 'A', 'L', 'I', 'Y', 'T'],
  12: ['E', 'Z', 'A', 'V', 'N', 'D'],
  13: ['R', 'A', 'L', 'E', 'S', 'C'],
  14: ['U', 'W', 'I', 'L', 'R', 'G'],
  15: ['P', 'A', 'C', 'E', 'M', 'D']
}

const diceList25 = {
  0: ['Qu', 'B', 'Z', 'J', 'X', 'K'],
  1: ['H', 'H', 'L', 'R', 'D', 'O'],
  2: ['T', 'E', 'L', 'P', 'C', 'I'],
  3: ['T', 'T', 'O', 'T', 'E', 'M'],
  4: ['A', 'E', 'A', 'E', 'E', 'E'],
  5: ['T', 'O', 'U', 'O', 'T', 'O'],
  6: ['N', 'H', 'D', 'T', 'H', 'O'],
  7: ['S', 'S', 'N', 'S', 'E', 'U'],
  8: ['S', 'C', 'T', 'I', 'E', 'P'],
  9: ['Y', 'I', 'F', 'P', 'S', 'R'],
  10: ['O', 'V', 'W', 'R', 'G', 'R'],
  11: ['L', 'H', 'N', 'R', 'O', 'D'],
  12: ['R', 'I', 'Y', 'P', 'R', 'H'],
  13: ['E', 'A', 'N', 'D', 'N', 'N'],
  14: ['E', 'E', 'E', 'E', 'M', 'A'],
  15: ['A', 'A', 'A', 'F', 'S', 'R'],
  16: ['A', 'F', 'A', 'I', 'S', 'R'],
  17: ['D', 'O', 'R', 'D', 'L', 'N'],
  18: ['M', 'N', 'N', 'E', 'A', 'G'],
  19: ['I', 'T', 'I', 'T', 'I', 'E'],
  20: ['A', 'U', 'M', 'E', 'E', 'G'],
  21: ['Y', 'I', 'F', 'A', 'S', 'R'],
  22: ['C', 'C', 'W', 'N', 'S', 'T'],
  23: ['U', 'O', 'T', 'O', 'W', 'N'],
  24: ['E', 'T', 'I', 'L', 'I', 'C']
}

let newBoard

function makeNewBoardArray (chooseYourDice) {
  const diceList = chooseYourDice
  const diceArray = Object.keys(diceList)
  const boardSize = diceArray.length
  newBoard = []
  // newBoard.push('A')
  for (let i = 0; i < boardSize; i++) {
    const currentDie = Math.floor(Math.random() * diceArray.length)
    const dieRoll = Math.floor(Math.random() * 6)
    const newLetter = diceList[currentDie][dieRoll]
    newBoard.push(newLetter)
    diceArray.splice(currentDie, 1)
  }
  return newBoard
}

function createBoard () {
  makeNewBoardArray(diceList16)
  document.getElementById('game-board').innerHTML = ''
  const sideLength = Math.sqrt(newBoard.length)
  for (let y = 0; y < sideLength; y++) {
    const rowElement = document.createElement('div')
    console.log('Created row element ' + (y + 1))
    rowElement.setAttribute('class', 'rowBlock')
    for (let x = 0; x < sideLength; x++) {
      const cardElement = document.createElement('div')
      const blockIndex = ((sideLength * y) + x)
      // console.log('Created blank square element ' + (x))
      cardElement.setAttribute('class', 'blank-square')
      cardElement.setAttribute('id', blockIndex)
      cardElement.innerText = newBoard[blockIndex]
      // cardElement.addEventListener('click', takeTurn)
      // cardElement.addEventListener('mouseover', startHovering)
      // cardElement.addEventListener('mouseleave', stopHovering)
      rowElement.appendChild(cardElement)
    }
    document.getElementById('game-board').appendChild(rowElement)
  }
}

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

function thisCoordinateIsOk (newCoordinate, coordinateList, sideLength) {
  if ((newCoordinate[0] >= 0) &&
  (newCoordinate[0] < sideLength) &&
  (newCoordinate[1] >= 0) &&
  (newCoordinate[1] < sideLength)) {
    for (let i = 0; i < coordinateList.length; i++) {
      if ((coordinateList[i][0] === newCoordinate[0]) &&
     (coordinateList[i][1] === newCoordinate[1])) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}

function checkForWord (coordinateList, wordList, boardArray) {
  if (coordinateList) {
    const sideLength = Math.sqrt(boardArray.length)
    let word = ''
    for (let i = 0; i < coordinateList.length; i++) {
      const boardIndex = (coordinateList[i][0] + (coordinateList[i][1] * sideLength))
      word += boardArray[boardIndex]
    }
    word = word.toUpperCase()
    const twoLetters = word.charAt(0) + word.charAt(1)
    if (dictionaryObject[twoLetters]) {
      if (dictionaryObject[twoLetters].indexOf(word) !== -1) {
        wordList.push(word)
      }
    }
  }
}

let logTrue = false
let counter = 0

function pathIsDeadEnd (coordinateList, boardArray) {
  if (coordinateList) {
    const sideLength = Math.sqrt(boardArray.length)
    let word = ''
    for (let i = 0; i < coordinateList.length; i++) {
      const boardIndex = (coordinateList[i][0] + (coordinateList[i][1] * sideLength))
      word = word + boardArray[boardIndex]
    }
    word = ',' + word.toUpperCase()
    if ((logTrue) && (dictionaryString.indexOf(word) === -1)) {
      console.log('not a word', word)
      counter++
      if (counter > 5) { logTrue = false }
      // if (counter === 6) { console.log(dictionaryString) }
    }
    const twoLetters = word.charAt(1) + word.charAt(2)
    if (dictionaryObject[twoLetters]) {
      dictionaryString = dictionaryObject[twoLetters].toString()
      // returns true if it's a dead end
      return (dictionaryString.indexOf(word) === -1)
    } else {
      return true
    }
  }
}

function wordFinder () {
  // compute side length of the board
  const sideLength = Math.sqrt(newBoard.length)
  // blank array for words
  const wordList = []

  let wordBefore

  let searchingForNewCoordinate
  let newCoordinate
  for (let i = 0; i < newBoard.length; i++) {
    const coordinateList = []
    const x = i % sideLength
    const y = Math.floor(i / sideLength)
    // array for looping through every square to make words
    const guessMap = [1, 1]
    coordinateList.push([x, y])
    let currentCharacter = 1
    while (guessMap[1] <= 8) {
      if (!guessMap[currentCharacter]) {
        guessMap[currentCharacter] = 1
      }
      searchingForNewCoordinate = true
      while (searchingForNewCoordinate) {
        newCoordinate = getNewCoordinate(guessMap[currentCharacter], coordinateList[currentCharacter - 1])
        if (thisCoordinateIsOk(newCoordinate, coordinateList, sideLength)) {
          coordinateList.push(newCoordinate)
          searchingForNewCoordinate = false
          currentCharacter++
          guessMap[currentCharacter] = 1
        } else {
          guessMap[currentCharacter]++
          if (guessMap[currentCharacter] > 8) {
            if (currentCharacter === 1) { break }
            guessMap[currentCharacter] = 1
            currentCharacter--
            guessMap[currentCharacter]++
            coordinateList.pop()
          }
        }
      }
      if ((guessMap[currentCharacter] > 8) && (currentCharacter === 1)) { break }
      if (coordinateList.length > 1) {
        checkForWord(coordinateList, wordList, newBoard)
        if (pathIsDeadEnd(coordinateList, newBoard)) {
          guessMap[currentCharacter] = 1
          currentCharacter--
          guessMap[currentCharacter]++
          coordinateList.pop()
        }
      }
    }
    console.log('completed square ' + i + ' found this many words: ' + wordList.length)
  }
  console.log(wordList)
  return wordList
}

// On document ready
$(() => {
  createBoard()
  $('#newBoardButton').on('click', createBoard)
  $('#getWordsButton').on('click', wordFinder)
})
