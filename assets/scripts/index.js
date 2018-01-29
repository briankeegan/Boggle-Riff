'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config.js')
const gameEvents = require('./game/events.js')

const loginUi = require('./login/ui.js')
const loginEvents = require('./login/events.js')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const bookEvents = require('./books/events')

// const originalDictionaryFile = require('dictionary-test.js')
// const origDict = require('../js/dictionary-test.js')

// On document ready
$(() => {
  loginEvents.addHandlers()
  gameEvents.AddHandlers()
  loginUi.toggleSignInButtons()
})
