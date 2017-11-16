var Letter = function (lett) {
    this.letter = lett;
    this.appear = false;

    this.displayLetter = function () {
        if (this.letter == ' ') {
            this.appear = true;
            return '  ';
        }
        if (this.appear === false) {
            return ' _ ';
        } else {
            return this.letter;
        }
    };
};

module.exports = Letter;