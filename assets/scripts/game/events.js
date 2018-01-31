'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const getFormFields = require(`../../../lib/get-form-fields`)
const moment = require(`../../../node_modules/moment/moment`)
const numeral = require(`../../../node_modules/numeral/numeral`)

const dictionaryFile = require('./sensibleDictionary')
const dictionaryFile2 = require('./ludicrousDictionary')
const letters = require('./letters.js')
const scores = require('./scores.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const bookEvents = require('./books/events')

const dictionaryObject = dictionaryFile2
let dictionaryString

let minWordLength = 3
let secondsInTimer = 180
let scoreCard = scores.scoreList16

// let logTrue = false
// let counter = 0

// These variables often change and need to be accessed globally,
// hence they are defined here.
let newBoard
let availableWords
let playerWords
let timeIsUp
let countDownDate
let oldDownDate

const onNewGame = function () {
  const NewGameData = {
    game: {
      board_string: newBoard.toString()
    }
  }
  if (store.user) {
    api.newGame(NewGameData)
      .then(ui.newGameSuccess)
      .catch(ui.newGameFailure)
    $('#offline-message-box').html('')
  }
}

function pushWordsToAPI () {
  const data = {
    word: {
      player_id: store.user.id,
      game_id: store.game.id,
      word: playerWords.toString()
    }
  }
  console.log(data)
  api.uploadWords(data)
    .then(ui.wordPushSuccess)
    .catch(ui.wordPushFailure)
}

function makeNewBoardArray (chooseYourDice) {
  const diceList = chooseYourDice
  const diceArray = Object.keys(diceList)
  const boardSize = diceArray.length
  newBoard = []
  // newBoard.push('A')
  for (let i = 0; i < boardSize; i++) {
    const currentDie = Math.floor(Math.random() * diceArray.length)
    const dieRoll = Math.floor(Math.random() * 6)
    const newLetter = diceList[diceArray[currentDie]][dieRoll]
    newBoard.push(newLetter)
    diceArray.splice(currentDie, 1)
  }
  if (store.user) {
    onNewGame()
  }
  availableWords = wordFinder()
  document.getElementById('player-word-list').innerText = ''
  document.getElementById('scored-table').innerText = ''
  document.getElementById('timer-div').innerText = '3:00'
  playerWords = []
  timeIsUp = false
  document.getElementById('quit-early').style.display = 'inline-block'
  document.getElementById('player-word-input').style.display = 'block'
  document.getElementById('player-word-input').focus()
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
  Countdown()
}

function createBoard16 () {
  minWordLength = 3
  secondsInTimer = 180
  scoreCard = scores.scoreList16
  createBoard(letters.diceList16)
}

function createBoard25 () {
  minWordLength = 4
  secondsInTimer = 180
  scoreCard = scores.scoreList25
  createBoard(letters.diceList25)
}

function createBoard36 () {
  minWordLength = 4
  secondsInTimer = 240
  scoreCard = scores.scoreList36
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

function pathIsDeadEnd (coordinateList, boardArray) {
  if (coordinateList) {
    const sideLength = Math.sqrt(boardArray.length)
    let word = ''
    for (let i = 0; i < coordinateList.length; i++) {
      const boardIndex = (coordinateList[i][0] + (coordinateList[i][1] * sideLength))
      word = word + boardArray[boardIndex]
    }
    word = ',' + word.toUpperCase()
    // if ((logTrue) && (dictionaryString.indexOf(word) === -1)) {
    //   console.log('not a word', word)
    //   counter++
    //   if (counter > 5) { logTrue = false }
    //   // if (counter === 6) { console.log(dictionaryString) }
    // }
    // if there's hashtag...
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

  // let wordBefore = 0

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
    // console.log('completed square ' + i + ' found this many words: ' + (wordList.length - wordBefore))
    // wordBefore = wordList.length
  }
  return wordList
}

function PrintWordsToPage () {
  console.log(availableWords)
  const listElement = document.createElement('ul')
  listElement.classList.add('complete-word-list')
  for (let i = 0; i < availableWords.length; i++) {
    const newItem = document.createElement('li')
    newItem.innerText = availableWords[i]
    listElement.appendChild(newItem)
  }
  document.getElementById('wordList').innerHTML = ''
  document.getElementById('wordList').appendChild(listElement)
  if (store.user) {
    api.getAllWords()
      .then(ui.getAllWordsSuccess)
      .catch(ui.getAllWordsFailure)
  }
}
;
function enterWord (event) {
  event.preventDefault()
  if (!timeIsUp) {
    const data = getFormFields(this)
    const newWord = data.playerWord.toUpperCase()
    if ((availableWords.indexOf(newWord) !== -1) &&
    (playerWords.indexOf(newWord) === -1)) {
      playerWords.push(newWord)
      const newItem = document.createElement('li')
      newItem.innerText = newWord
      const listParent = document.getElementById('player-word-list')
      if (playerWords.length > 1) {
        const goBeforeMe = listParent.getElementsByTagName('li')[0]
        listParent.insertBefore(newItem, goBeforeMe)
      } else {
        listParent.appendChild(newItem)
      }
    }
    $('#player-word-input').val('')
  }
}

function Countdown () {
  // Set the date we're counting down to
  // const currentDate = Date.now()
  const newDateObj = moment(Date.now()).add((secondsInTimer + 3), 's').toDate()
  countDownDate = new Date(newDateObj).getTime()
  let i = 0

  // Update the count down every 1 second
  const x = setInterval(function () {
    if (i > 0) {
      if (countDownDate !== oldDownDate) {
        clearInterval(x)
      }
    } else {
      oldDownDate = countDownDate
      i++
    }
    // Get todays date and time
    const now = new Date().getTime()

    // Find the distance between now an the count down date
    const distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    // const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    // const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result in the element with id="demo"
    document.getElementsByClassName('timer')[0].innerHTML = minutes + ':' + numeral(seconds).format('00')

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x)
      endGame()
    }
  }, 1000)
}

function QuitEarly () {
  const newDateObj = moment(Date.now()).add(183, 's').toDate()
  countDownDate = new Date(newDateObj).getTime()
  setTimeout(() => {
    endGame()
  }, 1000)
}

function endGame () {
  if (store.game) { pushWordsToAPI() }
  document.getElementsByClassName('timer')[0].innerHTML = 'Time\'s up!'
  document.getElementById('quit-early').style.display = 'none'
  timeIsUp = true
  scores.scorePresentation(playerWords, scoreCard)
}

// On document ready
function AddHandlers () {
  // createBoard16()
  $('#newBoardButton').on('click', createBoard16)
  $('#newBoardButton2').on('click', createBoard25)
  $('#newBoardButton3').on('click', createBoard36)
  $('#getWordsButton').on('click', PrintWordsToPage)
  $('#player-word-form').on('submit', enterWord)
  $('#quit-early').on('click', QuitEarly)
}

module.exports = {
  AddHandlers
}
