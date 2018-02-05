'use strict'

const store = require('../store')

function moveFooter () {
  const bodyRect = document.getElementsByTagName('main')[0].getBoundingClientRect()
  const footerRect = document.getElementById('footer-div').getBoundingClientRect()
  if ($(window).height() > (bodyRect['height'] + footerRect['height'])) {
    $('#footer-div').addClass('fix-to-bottom')
  } else {
    $('#footer-div').removeClass('fix-to-bottom')
  }
}

function liveGame () {
  // Show these during a live game
  $('#player-word-input').show()
  $('#in-game-buttons').show()
  $('#quit-early').show()
  $('#getWordsButton').show()

  // Hide these during a live game
  $('#primary-game-nav').hide()
}

function deadGame () {

}

module.exports = {
  moveFooter,
  liveGame
}
