'use strict'

const store = require('../store')
const moment = require(`../../../node_modules/moment/moment`)
const numeral = require(`../../../node_modules/numeral/numeral`)

const player = require('./player')

function resetTimer () {
  store.timerCheck = ''
  store.timeLeft = 0
}

function startCountdown () {
  // Set the end time
  if (!store.timerCheck) {
    const newDateObj = moment(Date.now()).add((store.secondsInTimer + 2), 's').toDate()
    store.timerEndPoint = new Date(newDateObj).getTime()
    store.timerCheck = store.timerEndPoint
  }
  const endTime = store.timerEndPoint
  console.log(endTime)

  // Update the count down every 1 second
  const x = setInterval(function () {
    if (endTime !== store.timerCheck) {
      clearInterval(x)
    }
    // Get todays date and time
    const now = new Date().getTime()

    // Find the distance between now an the count down date
    store.timeLeft = endTime - now

    // Time calculations for days, hours, minutes and seconds
    // const days = Math.floor(store.timeLeft / (1000 * 60 * 60 * 24))
    // const hours = Math.floor((store.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((store.timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((store.timeLeft % (1000 * 60)) / 1000)

    // Display the result in the element with id="demo"
    if ((store.timeLeft >= 0) && (store.user) && (store.timerCheck !== '')) {
      $('#timer-div').html(minutes + ':' + numeral(seconds).format('00'))
    }

    // If the count down is finished, write some text
    if (store.timeLeft < 0) {
      clearInterval(x)
      $('#timer-div').html("Time's Up!!")
      player.endGame()
      store.timerCheck = ''
    }
  }, 1000)
}

module.exports = {
  resetTimer,
  startCountdown
}
