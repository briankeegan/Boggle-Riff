'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

const gameBuilder = require('./game_builder.js')
const player = require('./player.js')
const page = require('./page.js')

const onNewGame = function () {
  const NewGameData = {
    game: {
      board_string: store.newBoard.toString(),
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

const onBeforeUnload = function () {
  if ((store.game) && (store.timerCheck !== '')) {
    localStorage.setItem('playerWords', JSON.stringify(store.playerWords))
    localStorage.setItem('timerEndPoint', JSON.stringify(store.timerEndPoint))
    localStorage.setItem('timerCheck', JSON.stringify(store.timerCheck))
  } else {
    localStorage.removeItem('playerWords')
    localStorage.removeItem('timerEndPoint')
    localStorage.removeItem('timerCheck')
  }
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

// On document ready
function AddHandlers () {
  // createBoard16()
  $('#newBoardButton').on('click', gameBuilder.createBoard16)
  $('#newBoardButton2').on('click', gameBuilder.createBoard25)
  $('#newBoardButton3').on('click', gameBuilder.createBoard36)
  $('#getWordsButton').on('click', player.printWordsToPage)
  $('#player-word-form').on('submit', player.inputWord)
  $('#quit-early').on('click', player.QuitEarly)
  $(window).on('beforeunload', onBeforeUnload)
  $(window).on('resize', page.moveFooter)
}

module.exports = {
  AddHandlers,
  pushWordsToAPI,
  onNewGame
}
