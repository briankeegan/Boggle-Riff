'use strict'

const store = require('../store')
const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const events = require('./events')
const scores = require('./scores')
const timer = require('./timer')
const page = require('./page')

function inputWord (event) {
  event.preventDefault()
  if (store.timeLeft > 0) {
    const data = getFormFields(this)
    const newWord = data.playerWord.toUpperCase()
    if ((store.wordList.indexOf(newWord) !== -1) &&
    (store.playerWords.indexOf(newWord) === -1)) {
      store.playerWords.push(newWord)
      store.playerWordCoordinates.push(store.wordListCoordinates[store.wordList.indexOf(newWord)])
      addPlayerWordToList(newWord)
    }
    $('#player-word-input').val('')
  }
}

function addPlayerWordToList (newWord) {
  const newItem = document.createElement('li')
  newItem.innerText = newWord
  const listParent = document.getElementById('player-word-list')
  if (store.playerWords.length > 1) {
    const goBeforeMe = listParent.getElementsByTagName('li')[0]
    listParent.insertBefore(newItem, goBeforeMe)
  } else {
    listParent.appendChild(newItem)
  }
}

function QuitEarly () {
  timer.resetTimer()
  endGame()
}

function signOutQuit () {
  timer.resetTimer()
  endGame()
}

function endGame () {
  store.game.game_over = true
  if ((store.game) && (store.user) && (store.playerWords)) {
    events.pushWordsToAPI()
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
  if ((store.game) && (store.user)) {
    $('#timer-div').html("Time's up!")
  }
  scores.scorePresentation()
  store.timerCheck = ''
}

function printWordsToPage () {
  // console.log(availableWords)
  const listElement = document.createElement('ul')
  listElement.classList.add('complete-word-list')
  for (let i = 0; i < store.wordList.length; i++) {
    const newItem = document.createElement('li')
    newItem.setAttribute('data-squares', store.wordListCoordinates[i].toString())
    newItem.innerText = store.wordList[i]
    listElement.appendChild(newItem)
  }
  document.getElementById('wordList').innerHTML = ''
  document.getElementById('wordList').appendChild(listElement)
  if (store.user) {
    api.getAllWords()
      .then(ui.getAllWordsSuccess)
      .catch(ui.getAllWordsFailure)
  }
  page.moveFooter()
}

module.exports = {
  inputWord,
  addPlayerWordToList,
  endGame,
  QuitEarly,
  printWordsToPage
}
