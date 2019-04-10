// GLOBAL VARIABLES
const request = require('supertest');
var express = require('express'); 
var app = express();

var port = process.env.PORT || 3000;

const nonLexicalWords = ["to", "got", "is", "have", "and", "although", "or", "that", "when", "while", "a", "either", "more", "much", "neither", "my", "that", "the", "as", "no", "nor", "not", "at", "between", "in", "of", "without", "I", "you", "he", "she", "it", "we", "they", "anybody", "one"];


// BASIC FUNCTION: Returns lexical density for entire input up to two decimal places
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
  return (finalLength/originalLength).toFixed(2); 
}


// VERBOSE FUNCTION: Returns lexical density for each sentence in an array
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

  if (!input) {
    res.send(400, { "message": "No input provided" }) // handling error cases
  } else if (input.length >= 1000) {
    res.send(400, { "message": "Input invalid, exceeds 1000 characters" })
  } else if (input.split(' ').length >= 100) {
    res.send(400, { "message": "Input invalid, exceeds 100 words" })
  } else if (req.query.mode == "verbose") {
    res.json({ "data": { sentence_ld: lexicalFilterVerbose(input), overall_ld: Number(lexicalFilter(input)) } });
  } else {
    res.json({ "data": { overall_ld: Number(lexicalFilter(input)) } });
  }  
});


// TESTS using Visionmedia Supertest (GitHub: https://github.com/visionmedia/supertest)

  // no input
  request(app)
    .get('/complexity')
    .expect(400)
    .end(function(err, res) {
      if (err) throw err;
  });

  // over 100 words
  request(app)
    .get('/complexity?input=word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word+word')
    .expect('Content-Type', /json/)
    .expect(400)
    .end(function(err, res) {
      if (err) throw err;
    });

  // over 1000 characters
  request(app)
  .get('/complexity?input=woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord+woooooord')
  .expect('Content-Type', /json/)
  .expect(400)
  .end(function(err, res) {
    if (err) throw err;
  });

  // basic lexical filter success
  request(app)
    .get('/complexity?input=this+is+a+string+that+is+short')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) throw err;
  });

  // verbose lexical filter success
  request(app)
    .get('/complexity?mode=verbose&input=Get+rid+of+the+nonlexical+words+in+this+sentence.+Also+in+this+sentence.')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) throw err;
  });


// EXPRESS PORT
app.listen(port);