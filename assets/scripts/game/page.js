'use strict'

const store = require('../store')

const listToClear = [
  '#player-word-list',
  '#scored-table',
  '#wordList',
  '#opponentList',
  '#game-board'
]

const gameObjectIds = [
  '#player-word-input',
  '#player-word-form',
  '#in-game-buttons',
  '#quit-early',
  '#getWordsButton',
  '#primary-game-nav',
  '#secondary-game-nav',
  '#main-game-container'
]

const noGameIds = [
  '#primary-game-nav',
  '#secondary-game-nav',
  '#main-game-container'
]

const liveGameIds = [
  '#player-word-input',
  '#player-word-form',
  '#in-game-buttons',
  '#quit-early',
  '#getWordsButton',
  '#main-game-container'
]

const deadGameIds = [
  '#in-game-buttons',
  '#getWordsButton',
  '#primary-game-nav',
  '#secondary-game-nav',
  '#main-game-container'
]

const signedOutIds = []

function moveFooter () {
  const bodyRect = document.getElementsByTagName('main')[0].getBoundingClientRect()
  const footerRect = document.getElementById('footer-div').getBoundingClientRect()
  if ($(window).height() > (bodyRect['height'] + footerRect['height'])) {
    $('#footer-div').addClass('fix-to-bottom')
  } else {
    $('#footer-div').removeClass('fix-to-bottom')
  }
  // console.log('moved footer')
  // console.log('body height: ', bodyRect['height'])
  // console.log('window height: ', $(window).height())
}

function toggleGameButtons (showArray) {
  for (let i = 0; i < gameObjectIds.length; i++) {
    // if current ID is NOT in the show array, hide it.
    // console.log('Toggling Button:', gameObjectIds[i])
    if (showArray.indexOf(gameObjectIds[i]) === -1) {
      $(gameObjectIds[i]).hide()
    } else {
      // otherwise, show it.
      $(gameObjectIds[i]).show()
    }
  }
}

function clearLists () {
  for (let i = 0; i < listToClear.length; i++) {
    $(listToClear[i]).html('')
  }
}

function noGame () { toggleGameButtons(noGameIds); clearLists() }
function liveGame () { toggleGameButtons(liveGameIds) }
function deadGame () { toggleGameButtons(deadGameIds) }
function signedOut () { toggleGameButtons(signedOutIds); clearLists() }

module.exports = {
  moveFooter,
  noGame,
  liveGame,
  deadGame,
  signedOut,
  clearLists
}
