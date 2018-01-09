'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
const dictionaryFile = require('./sensibleDictionary')

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

const dictionaryObject = dictionaryFile
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

const diceList36 = {
  0: ['A', 'A', 'A', 'F', 'R', 'S'],
  1: ['A', 'A', 'E', 'E', 'E', 'E'],
  2: ['A', 'A', 'E', 'E', 'O', 'O'],
  3: ['A', 'A', 'F', 'I', 'R', 'S'],
  4: ['A', 'B', 'D', 'E', 'I', 'O'],
  5: ['A', 'D', 'E', 'N', 'N', 'N'],
  6: ['A', 'E', 'E', 'E', 'E', 'M'],
  7: ['A', 'E', 'E', 'G', 'M', 'U'],
  8: ['A', 'E', 'G', 'M', 'N', 'N'],
  9: ['A', 'E', 'I', 'L', 'M', 'N'],
  10: ['A', 'E', 'I', 'N', 'O', 'U'],
  11: ['A', 'F', 'I', 'R', 'S', 'Y'],
  12: ['An', 'Er', 'He', 'In', 'Qu', 'Th'],
  13: ['B', 'B', 'J', 'K', 'X', 'Z'],
  14: ['C', 'C', 'E', 'N', 'S', 'T'],
  15: ['C', 'D', 'D', 'L', 'N', 'N'],
  16: ['C', 'E', 'I', 'I', 'T', 'T'],
  17: ['C', 'E', 'I', 'P', 'S', 'T'],
  18: ['C', 'F', 'G', 'N', 'U', 'Y'],
  19: ['D', 'D', 'H', 'N', 'O', 'T'],
  20: ['D', 'H', 'H', 'L', 'O', 'R'],
  21: ['D', 'H', 'H', 'N', 'O', 'W'],
  22: ['D', 'H', 'L', 'N', 'O', 'R'],
  23: ['E', 'H', 'I', 'L', 'R', 'S'],
  24: ['E', 'I', 'I', 'L', 'S', 'T'],
  25: ['E', 'I', 'L', 'P', 'S', 'T'],
  26: ['E', 'I', 'O', '#', '#', '#'],
  27: ['E', 'M', 'T', 'T', 'T', 'O'],
  28: ['E', 'N', 'S', 'S', 'S', 'U'],
  29: ['G', 'O', 'R', 'R', 'V', 'W'],
  30: ['H', 'I', 'R', 'S', 'T', 'V'],
  31: ['H', 'O', 'P', 'R', 'S', 'T'],
  32: ['I', 'P', 'R', 'S', 'Y', 'Y'],
  33: ['J', 'K', 'Qu', 'W', 'X', 'Z'],
  34: ['N', 'O', 'O', 'T', 'U', 'W'],
  35: ['O', 'O', 'O', 'T', 'T', 'U']
}

const alphabet = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`]

const minWordLength = 3

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

function createBoard (diceList) {
  makeNewBoardArray(diceList)
  document.getElementById('game-board').innerHTML = ''
  const sideLength = Math.sqrt(newBoard.length)
  for (let y = 0; y < sideLength; y++) {
    const rowElement = document.createElement('div')
    // console.log('Created row element ' + (y + 1))
    rowElement.setAttribute('class', 'row')
    for (let x = 0; x < sideLength; x++) {
      const newBlock = document.createElement('div')
      const blockIndex = ((sideLength * y) + x)
      // console.log('Created blank square element ' + (x))
      newBlock.setAttribute('class', 'blank-square')
      newBlock.setAttribute('id', blockIndex)
      newBlock.innerText = newBoard[blockIndex]
      // newBlock.addEventListener('click', takeTurn)
      // newBlock.addEventListener('mouseover', startHovering)
      // newBlock.addEventListener('mouseleave', stopHovering)
      rowElement.appendChild(newBlock)
    }
    document.getElementById('game-board').appendChild(rowElement)
  }
  document.getElementById('wordList').innerHTML = ''
}

function createBoard16 () {
  createBoard(diceList16)
}

function createBoard25 () {
  createBoard(diceList25)
}

function createBoard36 () {
  createBoard(diceList36)
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
    if (word.indexOf('#') !== -1) {
      for (let i = 0; i < alphabet.length; i++) {
        const specialWord = word.replace('#', alphabet[i])
        const twoLettersSpecial = specialWord.charAt(0) + specialWord.charAt(1)
        if (dictionaryObject[twoLettersSpecial]) {
          if ((dictionaryObject[twoLettersSpecial].indexOf(specialWord) !== -1) &&
              (wordList.indexOf(specialWord) === -1) &&
              (specialWord.length >= minWordLength)) {
            wordList.push(specialWord)
          }
        }
      }
    } else {
      const twoLetters = word.charAt(0) + word.charAt(1)
      if (dictionaryObject[twoLetters]) {
        if ((dictionaryObject[twoLetters].indexOf(word) !== -1) &&
            (wordList.indexOf(word) === -1) &&
            (word.length >= minWordLength)) {
          wordList.push(word)
        }
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
    if (word.indexOf('#') !== -1) {
      for (let i = 0; i < alphabet.length; i++) {
        const specialWord = word.replace('#', alphabet[i])
        const twoLettersSpecial = specialWord.charAt(0) + specialWord.charAt(1)
        if (dictionaryObject[twoLettersSpecial]) {
          if (dictionaryObject[twoLettersSpecial].indexOf(specialWord) !== -1) {
            // placehodler
            return false
          }
        }
      }
      return true
    } else {
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
}

function wordFinder () {
  // compute side length of the board
  const sideLength = Math.sqrt(newBoard.length)
  // blank array for words
  const wordList = []

  let wordBefore = 0

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
    console.log('completed square ' + i + ' found this many words: ' + (wordList.length - wordBefore))
    wordBefore = wordList.length
  }
  console.log(wordList)
  const listElement = document.createElement('ul')
  for (let i = 0; i < wordList.length; i++) {
    const newItem = document.createElement('li')
    newItem.innerText = wordList[i]
    listElement.appendChild(newItem)
  }
  document.getElementById('wordList').innerHTML = ''
  document.getElementById('wordList').appendChild(listElement)
  return wordList
}

const testThing = function () {
  const xTable = {}
  let xCounter = 0
  console.log(`Details regarding this page's dictionary:`)
  for (const key in dictionaryObject) {
    const curDict = dictionaryObject[key]
    const numberWords = curDict.length
    const numberLetters = curDict.toString().length
    const lastWord = curDict[curDict.length - 1]
    const indexOfLastWord = curDict.toString().indexOf(lastWord)
    xTable[key] = new DictionaryDetail(numberWords, numberLetters, lastWord, indexOfLastWord)
    xCounter++
  }
  console.log('Number of subdivisions in dictionary:', xCounter)
  console.table(xTable)
}

function DictionaryDetail (numberWords, numberLetters, lastWord, indexOfLastWord) {
  this.numberWords = numberWords
  this.numberLetters = numberLetters
  this.lastWord = lastWord
  this.indexOfLastWord = indexOfLastWord
}

// On document ready
$(() => {
  createBoard16()
  $('#newBoardButton').on('click', createBoard16)
  $('#newBoardButton2').on('click', createBoard25)
  $('#newBoardButton3').on('click', createBoard36)
  $('#getWordsButton').on('click', wordFinder)
  $('#testSomething').on('click', testThing)
})
