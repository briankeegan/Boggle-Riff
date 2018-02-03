'use strict'

const store = require('../store')
const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const events = require('./events')
const scores = require('./scores')
const page = require('./page')

const apiLogin = require('../login/api')
const uiLogin = require('../login/ui')

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

function resetTimer () {
  store.timerCheck = ''
  store.timeLeft = 0
}

function QuitEarly () {
  resetTimer()
  endGame()
}

function SignOutQuit () {
  resetTimer()
  endGame()
  apiLogin.signOut()
    .then(uiLogin.signOutSuccess)
    .catch(uiLogin.signOutFailure)
}

function endGame () {
  store.game.game_over = true
  if ((store.game) && (store.user) && (store.playerWords)) {
    pushWordsToAPI()
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
  moveFooter()
}

function pushWordsToAPI () {
  const data = {
    word: {
      player_id: store.user.id,
      game_id: store.game.id,
      word: store.playerWords.toString()
    }
  }
  console.log(data)
  api.uploadWords(data)
    .then(ui.wordPushSuccess)
    .catch(ui.wordPushFailure)
}

function moveFooter () {
  const bodyRect = document.getElementsByTagName('main')[0].getBoundingClientRect()
  const footerRect = document.getElementById('footer-div').getBoundingClientRect()
  if ($(window).height() > (bodyRect['height'] + footerRect['height'])) {
    $('#footer-div').addClass('fix-to-bottom')
  } else {
    $('#footer-div').removeClass('fix-to-bottom')
  }
}

module.exports = {
  inputWord,
  addPlayerWordToList,
  endGame,
  QuitEarly,
  SignOutQuit,
  printWordsToPage,
  moveFooter
}
