'use strict'

const config = require('../config')
const store = require('../store')

const newGame = (data) => {
  // Verifies a user is logged in before creating a new game
  if (store.user) {
    const json = JSON.stringify(data)
    return $.ajax({
      url: config.apiOrigin + '/games',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      contentType: 'application/json',
      data: json
    })
  }
}

const getGame = () => {
  // Verifies a user is logged in before getting a game
  if (store.user) {
    return $.ajax({
      url: config.apiOrigin + '/games/' + store.game.id,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
}

const getAllGames = () => {
  // Verifies a user is logged in before getting all games
  if (store.user) {
    return $.ajax({
      url: config.apiOrigin + '/games',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
}

const getAllCompletedGames = () => {
  // Verifies a user is logged in before getting all games
  if (store.user) {
    return $.ajax({
      url: config.apiOrigin + '/games?game_over=true',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
}

const updateGame = function (data) {
  // Verifies a user is logged in before updating a game
  if (store.user) {
    const json = JSON.stringify(data)
    return $.ajax({
      url: config.apiOrigin + '/games/' + store.game.id,
      method: 'PATCH',
      contentType: 'application/json',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: json
    })
  }
}

const uploadWords = function (data) {
  if (store.user) {
    const json = JSON.stringify(data)
    return $.ajax({
      url: config.apiOrigin + '/words',
      method: 'POST',
      contentType: 'application/json',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: json
    })
  }
}

const getAllWords = () => {
  // Verifies a user is logged in before getting all games
  if (store.user) {
    return $.ajax({
      url: config.apiOrigin + '/words',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
}

module.exports = {
  newGame,
  getGame,
  getAllGames,
  getAllCompletedGames,
  updateGame,
  uploadWords,
  getAllWords
}
