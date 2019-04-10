// GLOBAL VARIABLES
var express = require('express'); 
var app = express();

var port = process.env.PORT || 3000;

const nonLexicalWords = ["to", "got", "is", "have", "and", "although", "or", "that", "when", "while", "a", "either", "more", "much", "neither", "my", "that", "the", "as", "no", "nor", "not", "at", "between", "in", "of", "without", "I", "you", "he", "she", "it", "we", "they", "anybody", "one"];


// BASIC FUNCTION: Returns lexical density for entire input
function lexicalFilter(input) { 
  var inputWordsArray = input.split(' ');
  var originalLength = inputWordsArray.length;

  for (var i = 0; i < inputWordsArray.length; i++) {
    if (nonLexicalWords.includes(inputWordsArray[i].toLowerCase())) {
      inputWordsArray.splice(i, 1)
      i--
    }
  }
  var finalLength = inputWordsArray.length;
  return (finalLength/originalLength).toFixed(2); // returning the lexical density to 2 decimal places
}

// VERBOSE FUNCTION: Returns lexical density for each sentence
function lexicalFilterVerbose(input) {
  var inputSentenceArray = input.split('.');
  inputSentenceArray.pop(); // remove blank entry after last period in sentence array
  var sentence_ld = [];
  
  for (var j = 0; j < inputSentenceArray.length; j++) {    
    var inputWordsArray = inputSentenceArray[j].split(' ');

    if (inputWordsArray[0] === '') { // accounting for empty first entries 
      inputWordsArray.shift();
    }

    var originalLength = inputWordsArray.length;

    for (var i = 0; i < inputWordsArray.length; i++) {
      if (nonLexicalWords.includes(inputWordsArray[i].toLowerCase())) {
        inputWordsArray.splice(i, 1)
        i--
      }
    }
    var finalLength = inputWordsArray.length;
    sentence_ld.push((finalLength/originalLength).toFixed(2));
  }

  return sentence_ld;
}


// ROUTE
app.get('/complexity', function(req, res) {
  var input = req.query.input;
  
  res.json({ "data": { overall_ld: Number(lexicalFilter(input)) } });
});

app.listen(port);