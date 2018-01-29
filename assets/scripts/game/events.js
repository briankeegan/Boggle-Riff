'use strict'

const dictionaryFile = require('./sensibleDictionary')
const letters = require('./letters.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const bookEvents = require('./books/events')

const dictionaryObject = dictionaryFile
let dictionaryString

const minWordLength = 3

let newBoard

let availableWords

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
  availableWords = wordFinder()
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
  createBoard(letters.diceList16)
}

function createBoard25 () {
  createBoard(letters.diceList25)
}

function createBoard36 () {
  createBoard(letters.diceList36)
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
      for (let i = 0; i < letters.alphabet.length; i++) {
        const specialWord = word.replace('#', letters.alphabet[i])
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
      for (let i = 0; i < letters.alphabet.length; i++) {
        const specialWord = word.replace('#', letters.alphabet[i])
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
  return wordList
}

function PrintWordsToPage () {
  console.log(availableWords)
  const listElement = document.createElement('ul')
  for (let i = 0; i < availableWords.length; i++) {
    const newItem = document.createElement('li')
    newItem.innerText = availableWords[i]
    listElement.appendChild(newItem)
  }
  document.getElementById('wordList').innerHTML = ''
  document.getElementById('wordList').appendChild(listElement)
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
function AddHandlers () {
  createBoard16()
  $('#newBoardButton').on('click', createBoard16)
  $('#newBoardButton2').on('click', createBoard25)
  $('#newBoardButton3').on('click', createBoard36)
  $('#getWordsButton').on('click', PrintWordsToPage)
  $('#testSomething').on('click', testThing)
}

module.exports = {
  AddHandlers
}
