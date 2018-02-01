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
let currentCoordinates
let wordCoordinates
let playerWords
let timeIsUp
let countDownDate
let oldDownDate

const onNewGame = function () {
  const NewGameData = {
    game: {
      board_string: newBoard.toString(),
      game_over: false
    }
  }
  if (store.user) {
    api.newGame(NewGameData)
      .then(ui.newGameSuccess)
      .catch(ui.newGameFailure)
    store.game = NewGameData.game
    $('#offline-message-box').html('')
  }
  store.game = NewGameData.game
}

const refreshPage = function () {
  // Restores previous session on accidental page refresh
  if (localStorage.getItem('savedUser')) {
    store.user = JSON.parse(localStorage.getItem('savedUser'))
    $('#timer-div').text('Welcome Back!')
    if (localStorage.getItem('savedGame')) {
      store.game = JSON.parse(localStorage.getItem('savedGame'))
      newBoard = store.game.board_string.split(',')
      console.log('hooray you have a stored game...')
      if (localStorage.getItem('playerWords')) {
        try {
          playerWords = JSON.parse(localStorage.getItem('playerWords'))
          for (let i = 0; i < playerWords.length; i++) {
            addPlayerWordToList(playerWords[i])
          }
          countDownDate = JSON.parse(localStorage.getItem('countDownDate'))
          oldDownDate = JSON.parse(localStorage.getItem('oldDownDate'))
          createBoard(null)
          console.log('playerWords: ', playerWords)
          console.log('countDownDate: ', countDownDate)
          console.log('oldDownDate: ', oldDownDate)
        } catch (e) {
          console.log(e)
        }
      }
    } else {
      endGame(false)
      setTimeout($('timer-div').text('Welcome Back!'), 1000)
    }
    // console.log('store.user:', store.user)
  }
}

const onBeforeUnload = function () {
  if ((store.game) && (countDownDate !== '')) {
    localStorage.setItem('playerWords', JSON.stringify(playerWords))
    localStorage.setItem('countDownDate', JSON.stringify(countDownDate))
    localStorage.setItem('oldDownDate', JSON.stringify(oldDownDate))
  } else {
    localStorage.removeItem('playerWords')
    localStorage.removeItem('countDownDate')
    localStorage.removeItem('oldDownDate')
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
  wordCoordinates = []
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
  return newBoard
}

function createBoard (diceList) {
  diceList = diceList || false
  // clear out old game stuff
  document.getElementById('player-word-list').innerText = ''
  document.getElementById('scored-table').innerText = ''
  document.getElementById('timer-div').innerText = '3:00'
  playerWords = []
  timeIsUp = false
  document.getElementById('in-game-buttons').style.display = 'block'
  document.getElementById('quit-early').style.display = 'inline-block'
  document.getElementById('player-word-input').style.display = 'block'
  document.getElementById('primary-game-nav').style.display = 'none'
  document.getElementById('player-word-input').focus()
  // comment
  if (diceList) { makeNewBoardArray(diceList) }
  document.getElementById('game-board').innerHTML = ''
  const sideLength = Math.sqrt(newBoard.length)
  if (sideLength === 4) { scoreCard = scores.scoreList16; minWordLength = 3 }
  if (sideLength === 5) { scoreCard = scores.scoreList25; minWordLength = 4 }
  if (sideLength === 6) { scoreCard = scores.scoreList36; minWordLength = 4 }
  availableWords = wordFinder()
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
  if (!store.game.game_over) { Countdown(countDownDate) }
  setTimeout(moveFooter(), 200)
}

function createBoard16 () {
  minWordLength = 3
  secondsInTimer = 180
  createBoard(letters.diceList16)
}

function createBoard25 () {
  minWordLength = 4
  secondsInTimer = 180
  createBoard(letters.diceList25)
}

function createBoard36 () {
  minWordLength = 4
  secondsInTimer = 240
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
    currentCoordinates = []
    for (let i = 0; i < coordinateList.length; i++) {
      const boardIndex = (coordinateList[i][0] + (coordinateList[i][1] * sideLength))
      currentCoordinates.push(boardIndex)
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
            wordCoordinates.push(currentCoordinates)
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
          wordCoordinates.push(currentCoordinates)
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
  wordCoordinates = []

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
  // console.log(availableWords)
  const listElement = document.createElement('ul')
  listElement.classList.add('complete-word-list')
  for (let i = 0; i < availableWords.length; i++) {
    const newItem = document.createElement('li')
    newItem.setAttribute('data-squares', wordCoordinates[i].toString())
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
  moveFooter()
}

function inputWord (event) {
  event.preventDefault()
  if (!timeIsUp) {
    const data = getFormFields(this)
    const newWord = data.playerWord.toUpperCase()
    if ((availableWords.indexOf(newWord) !== -1) &&
    (playerWords.indexOf(newWord) === -1)) {
      playerWords.push(newWord)
      addPlayerWordToList(newWord)
    }
    $('#player-word-input').val('')
  }
}

function addPlayerWordToList (newWord) {
  const newItem = document.createElement('li')
  newItem.innerText = newWord
  const listParent = document.getElementById('player-word-list')
  if (playerWords.length > 1) {
    const goBeforeMe = listParent.getElementsByTagName('li')[0]
    listParent.insertBefore(newItem, goBeforeMe)
  } else {
    listParent.appendChild(newItem)
  }
  moveFooter()
}

function Countdown (gotNoDate) {
  gotNoDate = gotNoDate || false
  if (!gotNoDate) {
    // Set the date we're counting down to
    // const currentDate = Date.now()
    console.log('I made a new date for the countdown!')
    const newDateObj = moment(Date.now()).add((secondsInTimer + 2), 's').toDate()
    countDownDate = new Date(newDateObj).getTime()
  }
  let i = 0

  // Update the count down every 1 second
  const x = setInterval(function () {
    if (i > 0) {
      if (countDownDate !== oldDownDate) {
        clearInterval(x)
      }
    } else {
      oldDownDate = countDownDate
    }
    i++
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
    if ((distance >= 0) && (store.user)) {
      document.getElementById('timer-div').innerHTML = minutes + ':' + numeral(seconds).format('00')
    }

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x)
      if (i > 1) {
        endGame(true)
      } else {
        if (playerWords) {
          scores.scoreGame(playerWords, scoreCard)
          scores.scorePresentation(playerWords, scoreCard)
        }
        countDownDate = null
        document.getElementById('quit-early').style.display = 'none'
        document.getElementById('primary-game-nav').style.display = 'block'
      }
    }
  }, 1000)
}

function QuitEarly () {
  const newDateObj = moment(Date.now()).add(182, 's').toDate()
  countDownDate = new Date(newDateObj).getTime()
  setTimeout(() => {
    endGame(true)
  }, 1000)
}

function signOutQuit () {
  const newDateObj = moment(Date.now()).add(182, 's').toDate()
  countDownDate = new Date(newDateObj).getTime()
  endGame(false)
  return 'turkey'
}

function endGame (tallyScoreTrue) {
  if ((store.game) && (store.user) && (playerWords)) {
    pushWordsToAPI()
    store.game.game_over = true
    const NewGameData = {
      game: {
        game_over: true
      }
    }
    api.updateGame(NewGameData)
      .then(ui.newGameSuccess)
      .catch(ui.newGameFailure)
    $('#offline-message-box').html('')
  }
  // document.getElementById('in-game-buttons').style.display = 'none'
  document.getElementById('quit-early').style.display = 'none'
  document.getElementById('primary-game-nav').style.display = 'block'
  timeIsUp = true
  if ((store.game) && (store.user)) {
    document.getElementsByClassName('timer')[0].innerHTML = 'Time\'s up!'
  }
  if ((tallyScoreTrue) && (playerWords)) {
    scores.scorePresentation(playerWords, scoreCard)
  }
  setTimeout(() => {
    moveFooter()
    countDownDate = ''
  }, 3000)
}

function moveFooter () {
  const bodyRect = document.getElementsByTagName('main')[0].getBoundingClientRect()
  const footerRect = document.getElementById('footer-div').getBoundingClientRect()
  if ($(window).height() > (bodyRect['height'] + footerRect['height'])) {
    $('#footer-div').addClass('fix-to-bottom')
  } else {
    $('#footer-div').removeClass('fix-to-bottom')
  }
  // console.log('I tried to move the footer!')
  // console.log('body height: ', bodyRect['height'])
  // console.log('window height: ', $(window).height())
}

// On document ready
function AddHandlers () {
  // createBoard16()
  $('#newBoardButton').on('click', createBoard16)
  $('#newBoardButton2').on('click', createBoard25)
  $('#newBoardButton3').on('click', createBoard36)
  $('#getWordsButton').on('click', PrintWordsToPage)
  $('#player-word-form').on('submit', inputWord)
  $('#quit-early').on('click', QuitEarly)
  $(window).on('beforeunload', onBeforeUnload)
  $(window).on('resize', moveFooter)
}

module.exports = {
  AddHandlers,
  signOutQuit,
  refreshPage
}
