'use strict'
var output = document.getElementById('result-output');
var firstMessage = 'Please click <strong>"New Game"</strong> button<br>to set the number of rounds';
var choice = 'What you choose? Rock, paper or scissors?';
var buttons = document.querySelectorAll('.buttons');
var outputPlayerScore = document.getElementById('player-result');
var outputComputerScore = document.getElementById('pc-result');
var outputRound = document.getElementById('round');
var outputRoundsLeft = document.getElementById('rounds-left');
var newGameBtn = document.getElementById('new-game-btn');
var newGameOutput = document.getElementById('new-game-output');

var results = {
  round: 0,
  userResult: 0,
  computerResult: 0,
  roundsLeft: 0,
};
//Block buttons
var blockButtons = function (event) {
  for(var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = event;
  }
};

//Random computer choice
var randomPcChoice = function() {
  return Math.floor(Math.random() * 3 + 1);
};

newGameBtn.addEventListener('click', function() {
  var numberOfRounds = window.prompt('Enter the number of rounds');

  if (numberOfRounds == null || numberOfRounds == '') {
    newGameOutput.innerHTML = ('Enter the number of rounds!');
  }

  else if (!isNaN(numberOfRounds)) {
    results.roundsLeft = numberOfRounds;
    outputRoundsLeft.innerHTML = results.roundsLeft;
    newGameMsg(choice);
    results.round = 0;
    outputRound.innerHTML = results.round;
    results.userResult = 0;
    outputPlayerScore.innerHTML = results.userResult;
    results.computerResult = 0;
    outputComputerScore.innerHTML = results.computerResult;
  }

  else {
    newGameOutput.innerHTML = ('It is not a number!');
  }
  blockButtons(false);
});

var resultsOutput = function(text) {
  output.innerHTML = text;
};
var newGameMsg = function(text) {
  newGameOutput.innerHTML = text;
};
//First message
newGameMsg(firstMessage);

//Player move
var playerMove = function(playerChoice) {
  var computerChoice = randomPcChoice();
  results.roundsLeft--;
  outputRoundsLeft.innerHTML = results.roundsLeft;

  if (computerChoice === 1) {
    computerChoice = 'ROCK';
  }
  else if (computerChoice === 2) {
    computerChoice = 'PAPER';
  }
  else {
    computerChoice = 'SCISSORS';
  }
  
  if (playerChoice === computerChoice) {
    resultsOutput('DRAW!<br>You and Computer played:<br>' + playerChoice);
    results.round += 1;
    outputRound.innerHTML = results.round;
  }
  else if ((playerChoice === 'ROCK' && computerChoice === 'SCISSORS') || (playerChoice === 'PAPER' && computerChoice === 'ROCK') || (playerChoice === 'SCISSORS' && computerChoice === 'PAPER')) {
    resultsOutput('YOU WON!<br>You played: ' + playerChoice + '<br>' + 'Computer played: ' + computerChoice);
    results.userResult += 1;
    outputPlayerScore.innerHTML = results.userResult;
    results.round += 1;
    outputRound.innerHTML = results.round;
  }
  else {
    resultsOutput('YOU LOST!<br>You played: ' + playerChoice + '<br>' + 'Computer played: ' + computerChoice);
    results.computerResult += 1;
    outputComputerScore.innerHTML = results.computerResult;
    results.round += 1;
    outputRound.innerHTML = results.round;
  }

  if (results.roundsLeft === 0) {
    endGame();
  }
  else {
    newGameMsg(choice);
  }
};

var endGame = function() {
  if (results.userResult > results.computerResult) {
    resultsOutput('GAME OVER<br><strong>YOU</strong> won entire game!');
  }
  else if (results.userResult < results.computerResult) {
    resultsOutput('GAME OVER<br><strong>COMPUTER</strong> won entire game!');
  }
  else if (results.userResult == results.computerResult) {
    resultsOutput('GAME OVER<br><strong>DRAW!</strong>');
  }
  newGameMsg(firstMessage);
  blockButtons(true);
};

//Player choice
for (var i = 0; i < buttons.length; i++) {
  var self = buttons[i];
  self.addEventListener('click', function (event) {  
      playerMove(event.currentTarget.dataset.move);
  }, false);
  if (results.roundsLeft === 0) {
    blockButtons(true);
  }
}