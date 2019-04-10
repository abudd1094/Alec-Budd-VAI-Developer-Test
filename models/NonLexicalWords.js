const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wordSchema = new Schema({
  word: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const NonLexicalWords = mongoose.model('NonLexicalWords', wordSchema)
module.exports = NonLexicalWords