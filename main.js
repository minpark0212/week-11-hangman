var Word = require('./word.js');
var prompt = require('prompt');

console.log("NBA Team Hangman");
console.log("--------------------");
prompt.start();

game = {
  wordList: [
    "hawks",
    "celtics",
    "nets",
    "hornets",
    "bulls",
    "cavaliers",
    "mavericks",
    "nuggets",
    "pistons",
    "warriors",
    "rockets",
    "pacers",
    "clippers",
    "lakers",
    "grizzlies",
    "heat",
    "bucks",
    "timberwolves",
    "pelicans",
    "knicks", 
    "thunder",
    "magic",
    "76ers",
    "suns",
    "blazers",
    "kings",
    "spurs",
    "raptors",
    "jazz",
    "wizards"
  ],
  wordsWon: 0,
  guessesRemaining: 9,
  currentWrd: null,
  
  startGame: function(wrd){
    this.resetGuesses();
    this.currentWrd = new Word(this.wordList[Math.floor(Math.random()* this.wordList.length)]);
    this.currentWrd.getLet();
    this.promptUser();
  },

  resetGuesses: function(){
    this.guessesRemaining = 9;
  },

  promptUser: function(){
    var self = this;
    prompt.get(['guessLet'], function(err, result){
      console.log("You guessed: " + result.guessLet);
      var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

      if(manyGuessed == 0) {
        console.log("Wrong");
        self.guessesRemaining--;        
      } 
      else{
        console.log("Correct");
          if(self.currentWrd.findWord()){
            console.log("You won");
            return;
          }
      }

      console.log("Remaining Guesses: " + self.guessesRemaining);
      console.log("--------------------");

      if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
        self.promptUser();
      }
      else if(self.guessesRemaining ==0){
        console.log("Game Over");
        console.log("Word to guess was: ", self.currentWrd.target);
      } 
      else {
        console.log(self.currentWrd.wordRender());
      }
    });

  }

};

game.startGame();