'use strict'

const store = require('../store')

const gameBuilder = require('./game_builder')
const player = require('./player')

const refresh = function () {
  // Restores previous session on accidental page refresh
  if (localStorage.getItem('savedUser')) {
    store.user = JSON.parse(localStorage.getItem('savedUser'))
    $('#timer-div').text('Welcome Back!')
    if (localStorage.getItem('savedGame')) {
      store.game = JSON.parse(localStorage.getItem('savedGame'))
      store.newBoard = store.game.board_string.split(',')
      console.log('hooray you have a stored game...')
      if (localStorage.getItem('playerWords')) {
        try {
          store.timerEndPoint = (localStorage.getItem('timerEndPoint'))
          store.timerCheck = (localStorage.getItem('timerCheck'))
          gameBuilder.createBoard(null)
          if (localStorage.getItem('playerWords') !== 'undefined') {
            store.playerWords = JSON.parse(localStorage.getItem('playerWords'))
          } else {
            store.playerWords = []
          }
          for (let i = 0; i < store.playerWords.length; i++) {
            player.addPlayerWordToList(store.playerWords[i])
          }
        } catch (e) {
          console.log(e)
        }
      }
    } else {
      $('timer-div').text('Welcome Back!')
    }
    // console.log('store.user:', store.user)
  } else {
    localStorage.clear()
  }
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

function togglePage () {
  if (store.game) {
    $('#player-word-input').show()
    $('#primary-game-nav').show()
    $('#in-game-buttons').show()
    $('#quit-early').show()
    $('#getWordsButton').show()
  } else {
    $('#player-word-input').show()
    $('#primary-game-nav').show()
    $('#getWordsButton').show()
  }
}

module.exports = {
  refresh,
  moveFooter
}
