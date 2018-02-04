'use strict'

function solutionsBoardHighlights (event) {
    const wordElement = event.target
    // if (confirm('You sure you want to do this?')) { ui.removeBook(data) }
    const boardIds = wordElement.dataset.squares.split(',')
    // console.log('boardIds: ', boardIds)

    const intervalLength = 200
    const overlapInterval = 200

    let i = 0
    const x = setInterval(() => {
      if (i < boardIds.length) {
        $('#' + boardIds[i]).addClass('click-me')
      } else {
        $('#' + boardIds[i - boardIds.length]).removeClass('click-me')
      }
      i++
      if (i >= boardIds.length * 2) {
        clearInterval(x)
      }
    }, intervalLength)
}

function AddHandlers () {
  $('body').on('click', '.word-list-item', solutionsBoardHighlights)
  console.log('Added animation handlers')
}

module.exports = {
  AddHandlers
}
