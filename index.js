'use strict'

const fs = require('fs')

const file1 = 'file1.txt'
const file2 = 'file2.txt'
const countWords = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      reject(err)
      const wordsMap = data.split(' ').reduce((obj, word, index, arr) => {
        obj[word] = obj[word] + 1 || 1
        return obj
      }, {})
      console.log(wordsMap)
      resolve(wordsMap)
    })
  })
}
const throwError = (err) => { if (err) throw err }

countWords(file1).then((wordSet1) => {
  console.log(wordSet1)
  countWords(file2).then((wordSet2) => {
    const matches = Object.keys(wordSet1).reduce((matches, word) => {
      if (wordSet1[word] === wordSet2[word]) {
        matches += 1
      }
    }, 0)

    const words1 = Object.keys(wordSet1).length
    const words2 = Object.keys(wordSet2).length

    const mostWords = words1 > words2 ? words1 : words2
    const percentage = matches / mostWords * 100
    console.log(`${percentage}%`)
  }).catch(throwError)
}).catch(throwError)
