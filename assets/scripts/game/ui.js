'use strict'

const store = require('../store')
const gameApi = require('./api')

const newGameSuccess = function (data) {
  store.game = data.game
  // fetchPlayerProfile()
  // console.log(data.game)
  // console.log('id from data.game.id: ', data.game.id)
  // console.log('cells from data.game.cells: ', data.game.cells)
  // console.log('cells[0] from data.game.cells[0]: ', data.game.cells[0])
  // console.log('cells[1] from data.game.cells[1]: ', data.game.cells[1])
  // console.log('over from data.game.over: ', data.game.over)
  // console.log('player_x from data.game.player_x', data.game.player_x)
  // console.log('player_x.id from data.game.player_x.id', data.game.player_x.id)
  // console.log('player_x.email from data.game.player_x.email', data.game.player_x.email)
  // console.log('player_o from data.game.player_o', data.game.player_o)
}

const newGameFailure = function (error) {
  console.log(error)
}

const getGameSuccess = function (data) {
  // console.log(data)
  // console.log('data.game.cells returns this: ', data.game.cells)
  // console.log('hopefully thats a useful array')
}

const getGameFailure = function (error) {
  console.log(error)
}

const getAllGamesSuccess = function (data) {
  store.games = data.games
  // console.log(data)
}

const getAllGamesFailure = function (error) {
  console.log(error)
}

const getAllCompletedGamesSuccess = function (data) {
  store.completedGames = data.games
  // console.log(data)
}

const getAllCompletedGamesFailure = function (error) {
  console.log(error)
}

const wordPushSuccess = function (data) {
  console.log(data)
}

const wordPushFailure = function (error) {
  console.log(error)
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getGameSuccess,
  getGameFailure,
  getAllGamesSuccess,
  getAllGamesFailure,
  getAllCompletedGamesSuccess,
  getAllCompletedGamesFailure,
  wordPushSuccess,
  wordPushFailure
}
