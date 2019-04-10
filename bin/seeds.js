const mongoose = require('mongoose')
const NonLexicalWords = require('../models/NonLexicalWords')

const nonLexicalWordsData = require('./non-lexical-words-data')

// Connect Mongoose
mongoose
  .connect('mongodb://localhost/vai-challenge', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

// Refresh Database
NonLexicalWords.deleteMany()
  .then(() => {
    return NonLexicalWords.insertMany(nonLexicalWordsData)
  })
  .then((result) => {
    console.log(`${result.length} words saved!`)
  })
  .catch(err => {
    console.log(err);
  })