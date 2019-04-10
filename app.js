// GLOBAL VARIABLES
var express = require('express'); 
var app = express();

var port = process.env.PORT || 3000;

const nonLexicalWords = ["to", "got", "is", "have", "and", "although", "or", "that", "when", "while", "a", "either", "more", "much", "neither", "my", "that", "the", "as", "no", "nor", "not", "at", "between", "in", "of", "without", "I", "you", "he", "she", "it", "we", "they", "anybody", "one"];


// BASIC FUNCTION: Returns lexical density for entire input
function lexicalFilter(input) { 
  var inputWordsArray = input.split(' ');

  return inputWordsArray;
}


// ROUTE
app.get('/complexity', function(req, res) {
  var input = req.query.input;
  
  res.send(lexicalFilter(input));
});

app.listen(port);