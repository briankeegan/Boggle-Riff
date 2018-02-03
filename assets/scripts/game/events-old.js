'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const getFormFields = require(`../../../lib/get-form-fields`)
const moment = require(`../../../node_modules/moment/moment`)
const numeral = require(`../../../node_modules/numeral/numeral`)

const dictionaryFile = require('./sensibleDictionary')
const dictionaryFile2 = require('./ludicrousDictionary')
const letters = require('./letters.js')
const scores = require('./scores.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const bookEvents = require('./books/events')

const dictionaryObject = dictionaryFile2
let dictionaryString

let minWordLength = 3
let secondsInTimer = 180
let scoreCard = scores.scoreList16

// let logTrue = false
// let counter = 0

// These variables often change and need to be accessed globally,
// hence they are defined here.
let newBoard
let availableWords
let currentCoordinates
let wordCoordinates
let playerWords
let timeIsUp
let countDownDate
let oldDownDate


function moveFooter () {
  const bodyRect = document.getElementsByTagName('main')[0].getBoundingClientRect()
  const footerRect = document.getElementById('footer-div').getBoundingClientRect()
  if ($(window).height() > (bodyRect['height'] + footerRect['height'])) {
    $('#footer-div').addClass('fix-to-bottom')
  } else {
    $('#footer-div').removeClass('fix-to-bottom')
  }
  // console.log('I tried to move the footer!')
  // console.log('body height: ', bodyRect['height'])
  // console.log('window height: ', $(window).height())
}
