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
var progressTable = document.querySelector('.progressTable');
var tableHeader = document.querySelector('.modal h1');

var params = {
  round: 0,
  userResult: 0,
  computerResult: 0,
  roundsLeft: 0,
  progress: []
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
    blockButtons(true);
  }

  else if (!isNaN(numberOfRounds)) {
    params.roundsLeft = numberOfRounds;
    outputRoundsLeft.innerHTML = params.roundsLeft;
    newGameMsg(choice);
    params.round = 0;
    outputRound.innerHTML = params.round;
    params.userResult = 0;
    outputPlayerScore.innerHTML = params.userResult;
    params.computerResult = 0;
    outputComputerScore.innerHTML = params.computerResult;
    blockButtons(false);
  }

  else {
    newGameOutput.innerHTML = ('It is not a number!');
    blockButtons(true);
  }
  resetTable();
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
  params.roundsLeft--;
  outputRoundsLeft.innerHTML = params.roundsLeft;

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
    params.round++;
    outputRound.innerHTML = params.round;
    params.winner = 'DRAW';
  }
  else if ((playerChoice === 'ROCK' && computerChoice === 'SCISSORS') || (playerChoice === 'PAPER' && computerChoice === 'ROCK') || (playerChoice === 'SCISSORS' && computerChoice === 'PAPER')) {
    resultsOutput('YOU WON!<br>You played: ' + playerChoice + '<br>' + 'Computer played: ' + computerChoice);
    params.userResult++;
    outputPlayerScore.innerHTML = params.userResult;
    params.round++;
    outputRound.innerHTML = params.round;
    params.winner = 'PLAYER';
  }
  else {
    resultsOutput('YOU LOST!<br>You played: ' + playerChoice + '<br>' + 'Computer played: ' + computerChoice);
    params.computerResult ++;
    outputComputerScore.innerHTML = params.computerResult;
    params.round ++;
    outputRound.innerHTML = params.round;
    params.winner = 'COMPUTER';
  }

  if (params.roundsLeft === 0) {
    endGame();
  }
  else {
    newGameMsg(choice);
  }
  params.progress.push({
    gameRounds: params.round,
    gamePlayerMove: playerChoice,
    gameComputerMove: computerChoice,
    roundWinner: params.winner,
    finalResult: params.userResult + ' - ' + params.computerResult
});
};

var endGame = function() {
  if (params.userResult > params.computerResult) {
    tableHeader.innerHTML = ('GAME OVER<br><strong>YOU</strong> won entire game!');
    resultsOutput('GAME OVER<br><strong>YOU</strong> won entire game!');
  }
  else if (params.userResult < params.computerResult) {
    tableHeader.innerHTML = ('GAME OVER<br><strong>COMPUTER</strong> won entire game!');
    resultsOutput('GAME OVER<br><strong>COMPUTER</strong> won entire game!');
  }
  else if (params.userResult == params.computerResult) {
    tableHeader.innerHTML = ('GAME OVER<br><strong>DRAW!</strong>');
    resultsOutput('GAME OVER<br><strong>DRAW!</strong>');
  }
  newGameMsg(firstMessage);
  blockButtons(true);
  showModal();
  buildTable();
};

//Player choice
for (var i = 0; i < buttons.length; i++) {
  var self = buttons[i];
  self.addEventListener('click', function (event) {  
      playerMove(event.currentTarget.dataset.move);
  }, false);
  if (params.roundsLeft === 0) {
    blockButtons(true);
  }
}

//MODAL
var modal = document.querySelector('#modal');
var overlay = document.querySelector('#modal-overlay');

function showModal(){
  //event.preventDefault();
  overlay.classList.add('show');
  modal.classList.add('show');
}

//CLOSE MODAL
function closeModal() {
  overlay.classList.remove('show');
}

var closeButton = document.querySelector('#modal .close-modal');
closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//CLOSE MODAL ESC BUTTON
document.addEventListener('keyup', function(e) {
  if(e.keyCode === 27) {
    closeModal();
  }
});

modal.addEventListener('click', function(event) {
  event.stopPropagation();
});

//TABLE
function resetTable() {
  params.wins = 0;
  params.lost = 0;
  params.round = 0;
  params.userResult = 0;
  params.computerResult = 0;
  params.winner = 0;
  params.progress = [];
}

function buildTable() {
   for (var i = 0; i < params.progress.length; i++) {
     var tbody = document.getElementById('tableBody');
     var tr = document.createElement('tr');
     //var td = document.createElement('td');
     tbody.appendChild(tr);
     //tr.appendChild(td);
     var td = '<td>'+ params.progress[i].gameRounds + '</td>' + '<td>' + params.progress[i].gamePlayerMove + '</td>' + '<td>' + params.progress[i].gameComputerMove + '</td>' + '<td>' + params.progress[i].roundWinner + '</td>' + '<td>' + params.progress[i].finalResult + '</td>';
     tr.innerHTML = td;
  }
}