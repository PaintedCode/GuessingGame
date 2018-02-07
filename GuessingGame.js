/*
Last Update on 2/7
*/

function Game () {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    
}



function generateWinningNumber () {
    return Math.floor(Math.random()*100)+1.
}


function shuffle (array) {

    // copied from https://bost.ocks.org/mike/shuffle/

    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function newGame () {

    return new Game()
}

Game.prototype.playersGuessSubmission = function (guess) {

    this.playersGuess = guess;
    return Game.prototype.checkGuess.apply(this)

}

Game.prototype.checkGuess = function () {
    
    if (!(this.playersGuess >= 1 && this.playersGuess <= 100)) {
        
        throw("That is an invalid guess.")
    }

    if (this.playersGuess === this.winningNumber){

        return 'You Win!';
    }
 
    if (this.pastGuesses.indexOf(this.playersGuess)>=0 ){
        return 'You have already guessed that number.';
    } else {
        this.pastGuesses.push(this.playersGuess)
    }

    if (this.pastGuesses.length > 4 ) {

        return "You Lose." 
    }

    if ( Game.prototype.difference.apply(this) < 10 ){

        return "You\'re burning up!";
    }

    if ( Game.prototype.difference.apply(this) < 25 ){

        return 'You\'re lukewarm.';
    }

    if ( Game.prototype.difference.apply(this) < 50 ){

        return 'You\'re a bit chilly.';
    }

    if ( Game.prototype.difference.apply(this) < 100 ){

        return 'You\'re ice cold!';
    }
    
    return this.playersGuess.toString()
}

Game.prototype.difference = function () {    

    if (this.playersGuess > this.winningNumber) {
        return this.playersGuess - this.winningNumber
    } else {
        return  this.winningNumber - this.playersGuess 
    }
}

Game.prototype.isLower = function () {

    if (this.playersGuess < this.winningNumber) {
        return true
    } else {
        return false
    }
}

Game.prototype.provideHint = function () {

    var hint = [];
    hint.push(this.winningNumber);
    hint.push( generateWinningNumber() );
    hint.push( generateWinningNumber() );
    return shuffle(hint)
}
