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
  moveFooter
}
