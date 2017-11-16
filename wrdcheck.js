var Letter = require('./ltrcheck.js');

function Answer(ans) {
    var that = this;

    this.answer = ans;

    this.letters = [];
    this.answerFound = false;

    this.getLttr = function () {
        for (var i = 0; i < that.answer.length; i++) {
            var newLetter = new Letter(that.answer[i]);
            this.letters.push(newLetter);
        }
    };

    this.guessedRight = function () {
        if (this.letters.every(function(ltr) {
                return ltr.appear === true;
            })) {
            this.answerFound = true;
            return true;
        }

    };

    this.checkLetter = function(userGuess) {
        var comingBack = 0;
        this.letters.forEach(function(ltr) {
            if (ltr.letter === userGuess) {
                ltr.appear = true;
                comingBack++;
            }
        })
        return comingBack;
    };

    this.displayWord = function() {
        var display = '';
        that.letters.forEach(function(ltr) {
            var usedLetter = ltr.displayLetter();
            display+= usedLetter;
        });

        return display;
    };
}

module.exports = Answer;