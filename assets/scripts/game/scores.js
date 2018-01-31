'use strict'

const scoreList16 = {
  3: 1,
  4: 1,
  5: 2,
  6: 3,
  7: 5,
  8: 11,
  9: 11,
  10: 11,
  11: 11,
  12: 11,
  13: 11,
  14: 11,
  15: 11,
  16: 11,
  17: 11
}

const scoreList25 = {
  4: 1,
  5: 2,
  6: 3,
  7: 5,
  8: 11,
  9: 11,
  10: 11,
  11: 11,
  12: 11,
  13: 11,
  14: 11,
  15: 11,
  16: 11,
  17: 11,
  18: 11,
  19: 11,
  20: 11,
  21: 11,
  22: 11,
  23: 11,
  24: 11,
  25: 11,
  26: 11
}

const scoreList36 = {
  3: 1,
  4: 1,
  5: 2,
  6: 3,
  7: 5,
  8: 11,
  9: 13,
  10: 15,
  11: 17,
  12: 19,
  13: 21,
  14: 23,
  15: 25,
  16: 27,
  17: 29,
  18: 31,
  19: 33,
  20: 35,
  21: 37,
  22: 39,
  23: 41,
  24: 43,
  25: 45,
  26: 47,
  27: 49,
  28: 51,
  29: 53,
  30: 55,
  31: 57,
  32: 59,
  33: 61,
  34: 63,
  35: 65,
  36: 67
}

const scoreGame = function (wordList, scoreCard) {
  let score = 0
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i]
    score += scoreCard[word.length]
  }
  document.getElementById('timer-div').innerHTML = 'Your Score: ' + score
  return score
}

const scorePresentation = function (wordList, scoreCard) {
  let i = 0
  const iAmParent = document.getElementById('scored-table')
  iAmParent.innerHTML = '<tr><th>Word</th><th>Points</th></tr>'
  const removeMyLastChild = document.getElementById('player-word-list')
  const x = setInterval(function () {
    // remove word from original list
    if (removeMyLastChild.lastChild) {
      removeMyLastChild.removeChild(removeMyLastChild.lastChild)
    } else {
      document.getElementById('timer-div').innerHTML = 'Your Score: ' + scoreGame(wordList, scoreCard)
      clearInterval(x)
    }

    // add word and its score to a description list
    const word = wordList[i]
    const newItem = '<tr><td>' + word + '</td><td>' + scoreCard[word.length] + '</td></tr>'
    // const iAmFirstNewChild = document.createElement('dt')
    // iAmFirstNewChild.innerText = word
    // const iAmSecondNewChild = document.createElement('dd')
    // iAmSecondNewChild.innerText = scoreCard[word.length]
    // iAmParent.appendChild(iAmFirstNewChild)
    // iAmParent.appendChild(iAmSecondNewChild)
    iAmParent.innerHTML = iAmParent.innerHTML + newItem
    // move to next iteration
    i++
    if (i === wordList.length) {
      scoreGame(wordList, scoreCard)
      clearInterval(x)
    }
  }, 200)
}

module.exports = {
  scoreList16,
  scoreList25,
  scoreList36,
  scoreGame,
  scorePresentation
}
