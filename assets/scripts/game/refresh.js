'use strict'

const store = require('../store')

const gameBuilder = require('./game_builder')
const player = require('./player')
const timer = require('./timer')
const page = require('./page')

const refresh = function () {
  // Restores previous session on accidental page refresh
  if (localStorage.getItem('savedUser')) {
    store.user = JSON.parse(localStorage.getItem('savedUser'))
    console.log('successfully retrieved user login info')
    $('#timer-div').text('Welcome Back!')
    // page.noGame()
    console.log('savedGame : ', localStorage.getItem('savedGame'))
    if ((localStorage.getItem('savedGame')) && (localStorage.getItem('savedGame') !== '""')) {
      store.game = JSON.parse(localStorage.getItem('savedGame'))
      console.log('store.game.board_string: ', store.game.board_string)
      store.newBoard = store.game.board_string.split(',')
      console.log('hooray you have a stored game...')
      console.log('store.game :', store.game)
      if (localStorage.getItem('playerWords')) {
        try {
          store.timerEndPoint = (localStorage.getItem('timerEndPoint'))
          store.timerCheck = (localStorage.getItem('timerCheck'))
          // console.log('timerEndPoint', store.timerEndPoint)
          // console.log('timerCheck', store.timerCheck)
          timer.checkEndTime()
          gameBuilder.createBoard(null)
          if (localStorage.getItem('playerWords') !== 'undefined') {
            console.log('The player words from last time is NOT undefined - we should have words from before.')
            store.playerWords = JSON.parse(localStorage.getItem('playerWords'))
            store.playerWordCoordinates = JSON.parse(localStorage.getItem('playerWordCoordinates'))
          } else {
            console.log('The player words from last time is undefined')
            store.playerWords = []
            store.playerWordCoordinates = []
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
      console.log('savedGame is undefined')
    }
    // console.log('store.user:', store.user)
  } else {
    localStorage.clear()
  }
}

module.exports = {
  refresh
}
