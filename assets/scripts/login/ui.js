'use strict'

const store = require('../store')
const api = require('./api')

// const gameApi = require('../game/api')

const clearFields = function () {
  $('input:text, input:password').val('')
}

const toggleSignInButtons = function () {
  // console.log(store.user)
  if (store.user) {
    $('#sign-in-form').css('display', 'none')
    $('#createAccountButton').css('display', 'none')
    $('#changePasswordButton').css('display', 'inline-block')
    $('#sign-out').css('display', 'inline-block')
    $('#main-game-container').css('display', 'block')
    let x
    let y
    let z
    if (store.game) {
      store.game.game_over ? x = 'none' : x = 'block'
      store.game.game_over ? z = 'none' : z = 'inline-block'
      store.game.game_over ? y = 'block' : y = 'none'
      $('#player-word-input').css('display', x)
      $('#primary-game-nav').css('display', y)
      $('#in-game-buttons').css('display', 'block')
      $('#quit-early').css('display', z)
      $('#getWordsButton').css('display', 'inline-block')
    } else {
      $('#player-word-input').css('display', 'none')
      $('#primary-game-nav').css('display', 'block')
      $('#getWordsButton').css('display', 'none')
    }
  } else {
    $('#sign-in-form').css('display', 'inline-block')
    $('#createAccountButton').css('display', 'inline-block')
    $('#changePasswordButton').css('display', 'none')
    $('#sign-out').css('display', 'none')
    $('#main-game-container').css('display', 'none')
    $('#primary-game-nav').css('display', 'none')
    $('#in-game-buttons').css('display', 'none')
  }
}

const signUpSuccess = function (data) {
  // console.log(data)
  $('#timer-div').html('Make a new board to play!')
  $('#create-account-message-box').html('<p>Account Created!</p>')
  setTimeout(() => {
    document.getElementById('close-create-account-button').click()
  }, 600)
  // console.log(data)
  // $('#message-box').text('Successfully created account!')
  clearFields()
  toggleSignInButtons()

  // $('#timer-div').html('Make a new board to play!')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message-box').text('FAIL. Check your info.')
  clearFields()
}

const signInSuccess = function (data) {
  // console.log(data)
  $('#message-box').text('Successfully signed in!')
  $('#timer-div').html('Make a new board to play!')
  store.user = data.user
  console.log('store.user: ', store.user)
  clearFields()
  toggleSignInButtons()
  localStorage.setItem('savedUser', JSON.stringify(store.user))
  // fetchPlayerProfile()
  // gameEvents.resetBoard()
}

const signInFailure = function (error) {
  console.error(error)
  $('#message-box').text('FAIL. Check your info.')
  clearFields()
}

const changePasswordSuccess = function (data) {
  // console.log(data)
  clearFields()
  toggleSignInButtons()
}

const changePasswordFailure = function (error) {
  console.error(error)
  clearFields()
}

const signOutSuccess = function (data) {
  console.log(data)
  store.user = ''
  store.game = ''
  $('#timer-div').text(`You signed out!`)
  $('#game-board').html('')
  $('#scored-table').text(``)
  $('#player-word-list').text(``)
  localStorage.clear()
  clearFields()
  toggleSignInButtons()
  // gameEvents.resetBoard()
}

const signOutFailure = function (error) {
  console.error(error)
  clearFields()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  toggleSignInButtons
  // fetchPlayerProfile
}
