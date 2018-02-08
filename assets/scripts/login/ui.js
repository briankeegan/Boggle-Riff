'use strict'

const store = require('../store')
const page = require('../game/page')
// const api = require('./api')

// const gameApi = require('../game/api')

const clearFields = function () {
  $('input:text, input:password').val('')
}

const toggleSignInButtons = function () {
  // console.log(store.user)
  if (store.user) {
    $('#sign-in-form').hide()
    $('#createAccountButton').hide()
    $('#changePasswordButton').show()
    $('#sign-out').show()
    $('#main-game-container').show()
    $('#primary-game-nav').show()
  } else {
    $('#sign-in-form').show()
    $('#createAccountButton').show()
    $('#changePasswordButton').hide()
    $('#sign-out').hide()
    page.signedOut()
  }
}

const signUpSuccess = function (data) {
  // console.log(data)
  $('#timer-div').html('Make a new board to play!')
  const placeholderHTML = document.getElementById('create-account-message-box').innerHTML
  $('#create-account-message-box').html('<p>Account Created!</p>')
  setTimeout(() => {
    document.getElementById('close-create-account-button').click()
  }, 600)
  // console.log(data)
  // $('#message-box').text('Successfully created account!')
  clearFields()
  toggleSignInButtons()
  $('#create-account-message-box').html(placeholderHTML)

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
  page.clearLists()
  localStorage.clear()
  clearFields()
  toggleSignInButtons()
  document.getElementById('sign-in-email').focus()
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
