var inquirer = require('inquirer');
//console.log("check");

var isLetter = require('is-letter');
//console.log("check");

var Answer = require('./wrdcheck.js');
//console.log("check");

var Word = require('./wordbank.js');
//console.log("check");

console.log("Lets start this Hangman Game. \nGame is easy. You must guess the common coding term with 7 guesses.");

var letsPlay = {
    wordBank: Word.words,
    guessesRemaining: 7,
    userGuess: [],
    display: 0,
    currentWord: null,
    startGame: function () {
        var that = this;
        if (this.userGuess.length > 0) {
            this.userGuess = [];
        }
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Ready to play?"
        }]).then(function (uAnswer) {
            if (uAnswer.play) {
                that.newGame();
            } else {
                console.log("Bummer");
            }
        })
    },
    newGame: function () {
        if (this.guessesRemaining === 7) {
            console.log("Good Luck!");
            console.log("~~~~~~~~~~~");

            var randNum = Math.floor(Math.random() *7);
            this.currentWord = new Answer(this.wordBank[randNum]);
            this.currentWord.getLttr();

            console.log(this.currentWord.displayWord());
            this.promptUser();
        } else {
            this.resetGuessesRemaining();
            this.newGame();
        }
    },

    resetGuessesRemaining: function () {
        this.guessesRemaining = 7;
    },

    promptUser: function () {
        var that = this;
        inquirer.prompt([{
            name: "ltrGuessed",
            type: "input",
            message: "Guess a letter -",
            validate: function (value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (lett) {
            var ltrReturned = (lett.ltrGuessed).toUpperCase();
            var guessedAlready = false;
            for (var i = 0; i <that.userGuess.length; i++) {
                if (ltrReturned === that.userGuess[i]) {
                    guessedAlready = true;
                }
            }
            if (guessedAlready === false) {
                that.userGuess.push(ltrReturned);
                var userLetter = that.currentWord.checkLetter(ltrReturned);
                if (userLetter === 0) {
                    console.log("Try again.");
                    that.guessesRemaining--;
                    console.log("Guesses remaining: " + that.guessesRemaining);
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log(that.currentWord.displayWord());
                    console.log("Letters already used: " + that.userGuess);
                } else {
                    console.log("Correct! Getting closer!");
                    if (that.currentWord.guessedRight() === true) {
                        console.log(that.currentWord.displayWord());
                        console.log("Awesome! You won!");
                    } else {
                        console.log("Guesses Remaining: " + that.guessesRemaining);
                        console.log(that.currentWord.displayWord());
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log("Letters used: " + that.userGuess);
                    }

                }
                if (that.guessesRemaining > 0 && that.currentWord.answerFound === false) {
                    that.promptUser();
                } else if (that.guessesRemaining === 0) {
                    console.log("Game Over!");
                    console.log("The Answer is: " + that.currentWord.Answer);
                }
            }
            else {
                console.log("You've guessed the letter already! Try a different one.")
                that.promptUser();
            }
        });
    }
}

letsPlay.startGame();