'use strict'

const api = require('./api')
const ui = require('./ui')
const events = require('./events')
const store = require('../store')

const dictionaryFile = require('./sensibleDictionary')
const dictionaryFile2 = require('./ludicrousDictionary')
const grid = require('./grid.js')
const letters = require('./letters.js')
const scores = require('./scores.js')

const dictionaryObject = dictionaryFile2

function setGameRules (sideLength) {
  let settings
  if (sideLength === 4) { settings = [3, scores.scoreList16, 180] }
  if (sideLength === 5) { settings = [4, scores.scoreList25, 180] }
  if (sideLength === 6) { settings = [4, scores.scoreList36, 240] }
  store.minWordLength = settings[0]
  store.scoreCard = settings[1]
  store.secondsInTimer = settings[2]
}

function makeNewBoardArray (chooseYourDice) {
  const diceList = chooseYourDice
  const diceArray = Object.keys(diceList)
  const boardSize = diceArray.length
  store.newBoard = []
  store.playerWords = []
  store.playerWordCoordinates = []
  // newBoard.push('A')
  for (let i = 0; i < boardSize; i++) {
    const currentDie = Math.floor(Math.random() * diceArray.length)
    const dieRoll = Math.floor(Math.random() * 6)
    const newLetter = diceList[diceArray[currentDie]][dieRoll]
    store.newBoard.push(newLetter)
    diceArray.splice(currentDie, 1)
  }
  if (store.user) { events.onNewGame() }
  return store.newBoard
}

function createBoard (diceList) {
  // without a dice list, presumably the board is built from an older board
  diceList = diceList || false
  // clear out old game stuff
  if (diceList) { makeNewBoardArray(diceList) }
  const sideLength = Math.sqrt(store.newBoard.length)
  setGameRules(sideLength)
  document.getElementById('game-board').innerHTML = ''
  wordFinder()
  for (let y = 0; y < sideLength; y++) {
    const rowElement = document.createElement('div')
    // console.log('Created row element ' + (y + 1))
    rowElement.setAttribute('class', 'row')
    for (let x = 0; x < sideLength; x++) {
      const newBlock = document.createElement('div')
      const blockIndex = ((sideLength * y) + x)
      newBlock.setAttribute('class', 'blank-square')
      newBlock.setAttribute('id', blockIndex)
      newBlock.innerText = store.newBoard[blockIndex]
      rowElement.appendChild(newBlock)
    }
    document.getElementById('game-board').appendChild(rowElement)
  }
  document.getElementById('wordList').innerHTML = ''
}

function createBoard16 () { createBoard(letters.diceList16) }

function createBoard25 () { createBoard(letters.diceList25) }

function createBoard36 () { createBoard(letters.diceList36) }

function checkForWord (coordinateList) {
  if (coordinateList) {
    const sideLength = Math.sqrt(store.newBoard.length)
    let word = ''
    const currentCoordinates = []
    for (let i = 0; i < coordinateList.length; i++) {
      const boardIndex = (coordinateList[i][0] + (coordinateList[i][1] * sideLength))
      currentCoordinates.push(boardIndex)
      word += store.newBoard[boardIndex]
    }
    word = word.toUpperCase()
    // If word has a wildcard letter (#) then...
    if (word.indexOf('#') !== -1) {
      for (let i = 0; i < letters.alphabet.length; i++) {
        const specialWord = word.replace('#', letters.alphabet[i])
        const twoLettersSpecial = specialWord.charAt(0) + specialWord.charAt(1)
        if (dictionaryObject[twoLettersSpecial]) {
          if ((dictionaryObject[twoLettersSpecial].indexOf(specialWord) !== -1) &&
              (store.wordList.indexOf(specialWord) === -1) &&
              (specialWord.length >= store.minWordLength)) {
            store.wordList.push(specialWord)
            store.wordListCoordinates.push(currentCoordinates)
          }
        }
      }
    } else {
      // regular word check (no wild card letter)
      const twoLetters = word.charAt(0) + word.charAt(1)
      if (dictionaryObject[twoLetters]) {
        if ((dictionaryObject[twoLetters].indexOf(word) !== -1) &&
            (store.wordList.indexOf(word) === -1) &&
            (word.length >= store.minWordLength)) {
          store.wordList.push(word)
          store.wordListCoordinates.push(currentCoordinates)
        }
      }
    }
  }
}

function pathIsDeadEnd (coordinateList) {
  if (coordinateList) {
    const sideLength = Math.sqrt(store.newBoard.length)
    let word = ''
    for (let i = 0; i < coordinateList.length; i++) {
      const boardIndex = (coordinateList[i][0] + (coordinateList[i][1] * sideLength))
      word = word + store.newBoard[boardIndex]
    }
    word = ',' + word.toUpperCase()
    if (word.indexOf('#') !== -1) {
      // iterate through all possible letters
      for (let i = 0; i < letters.alphabet.length; i++) {
        const specialWord = word.replace('#', letters.alphabet[i])
        const twoLettersSpecial = specialWord.charAt(1) + specialWord.charAt(2)
        // if that dictionary exists...
        if (dictionaryObject[twoLettersSpecial]) {
          // and the mystery word appears somewhere in that dictionary...
          if (dictionaryObject[twoLettersSpecial].toString().indexOf(specialWord) !== -1) {
            // return FALSE, because path is NOT dead end
            return false
          }
        }
      }
      // return TRUE, path IS a dead end because the hashtag string never found a word.
      return true
    } else {
      // if there's no hashtag, just check if the string could become a word later
      const twoLetters = word.charAt(1) + word.charAt(2)
      if (dictionaryObject[twoLetters]) {
        const dictionaryString = dictionaryObject[twoLetters].toString()
        // returns true if it's a dead end
        return (dictionaryString.indexOf(word) === -1)
      } else {
        // returns true if that sub-dictionary doesn't exist (true: Path IS a dead end)
        return true
      }
    }
  }
}

function wordFinder () {
  // compute side length of the board
  const sideLength = Math.sqrt(store.newBoard.length)
  // blank array for words
  store.wordList = []
  store.wordListCoordinates = []

  // let wordBefore = 0

  let searchingForNewCoordinate
  let newCoordinate
  for (let i = 0; i < store.newBoard.length; i++) {
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
        newCoordinate = grid.getNewCoordinate(guessMap[currentCharacter], coordinateList[currentCharacter - 1])
        if (grid.thisCoordinateIsOk(newCoordinate, coordinateList, sideLength)) {
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
        checkForWord(coordinateList, store.wordList, store.newBoard)
        if (pathIsDeadEnd(coordinateList, store.newBoard)) {
          guessMap[currentCharacter] = 1
          currentCharacter--
          guessMap[currentCharacter]++
          coordinateList.pop()
        }
      }
    }
    // console.log('completed square ' + i + ' found this many words: ' + (wordList.length - wordBefore))
    // wordBefore = wordList.length
  }
  return store.wordList
}

module.exports = {
  makeNewBoardArray,
  createBoard,
  createBoard16,
  createBoard25,
  createBoard36
}
