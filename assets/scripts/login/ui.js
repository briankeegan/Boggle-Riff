'use strict'

const store = require('../store')
const gameEvents = require('../game/events')
const gameApi = require('../game/api')

const clearFields = function () {
  $('input:text, input:password').val('')
}

const fetchPlayerProfile = function () {
  if (store.user) {
    let HTMLstring = ''
    HTMLstring = HTMLstring + '<dt>Player 1:</dt><dd>' + store.user.email + '</dd>'
    gameApi.getAllCompletedGames()
      .then((data) => {
        store.completedGames = data.games
        if (store.completedGames) {
          HTMLstring = HTMLstring + '<dt>Games Played:</dt><dd>' + store.completedGames.length + '</dd>'
        } else {
          HTMLstring = HTMLstring + '<dt>Games Played:</dt><dd>' + '0' + '</dd>'
        }
        HTMLstring = HTMLstring + '</dl>'
        $('#player-one-side').html(HTMLstring)
        $('#player-one-bottom').html(HTMLstring)
        $('#player-two-side').html(`<p class="message-offline">Mystery Opponent</p>`)
        $('#player-two-bottom').html(`<p class="message-offline">Mystery Opponent</p>`)
      })
  }
}

const toggleSignInButtons = function () {
  // console.log(store.user)
  if (store.user) {
    $('#sign-in-form').css('display', 'none')
    $('#createAccountButton').css('display', 'none')
    $('#changePasswordButton').css('display', 'inline-block')
    $('#sign-out').css('display', 'inline-block')
  } else {
    $('#sign-in-form').css('display', 'inline-block')
    $('#createAccountButton').css('display', 'inline-block')
    $('#changePasswordButton').css('display', 'none')
    $('#sign-out').css('display', 'none')
  }
}

const signUpSuccess = function (data) {
  // console.log(data)
  $('#message-box').text('Successfully created account!')
  clearFields()
  toggleSignInButtons()
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message-box').text('FAIL. Check your info.')
  clearFields()
}

const signInSuccess = function (data) {
  // console.log(data)
  $('#message-box').text('Successfully signed in!')
  store.user = data.user
  clearFields()
  toggleSignInButtons()
  fetchPlayerProfile()
  gameEvents.resetBoard()
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
  // console.log(data)
  store.user = ''
  $('#message-box').text(`You signed out!`)
  clearFields()
  toggleSignInButtons()
  gameEvents.resetBoard()
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
  toggleSignInButtons,
  fetchPlayerProfile
}
