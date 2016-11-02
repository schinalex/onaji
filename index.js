'use strict'

const fs = require('fs')

const file1 = 'file1.txt'
const file2 = 'file2.txt'
const countWords = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err
      const wordsMap = data.split(' ').reduce((obj, word, index, arr) => {
        obj[word] = obj[word] + 1 || 1
        return obj
      }, {})
      resolve(wordsMap)
    })
  })
}
const throwError = (err) => { if (err) throw err }

countWords(file1).then((wordSet1) => {
  console.log(wordSet1)
  countWords(file2).then((wordSet2) => {
    console.log(wordSet2)
    const matches = Object.keys(wordSet1).reduce((matches, word) => {
      console.log(word)
      if (wordSet2.hasOwnProperty(word)) {
        matches.push(word)
        console.log(matches)
      }
      return matches
    }, [])
    console.log(matches)
    const words1 = Object.keys(wordSet1).length
    const words2 = Object.keys(wordSet2).length

    const mostWords = words1 > words2 ? words1 : words2
    console.log(mostWords)
    const percentage = matches.length / mostWords * 100
    console.log(`${percentage}%`)
  }).catch(throwError)
}).catch(throwError)
