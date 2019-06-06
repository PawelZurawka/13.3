'use strict'
const output = document.getElementById('result-output');
const firstMessage = 'Please click <strong>"New Game"</strong> button<br>to set the number of rounds';
const choice = 'What you choose? Rock, paper or scissors?';
const buttons = document.querySelectorAll('.buttons');
const outputPlayerScore = document.getElementById('player-result');
const outputComputerScore = document.getElementById('pc-result');
const outputRound = document.getElementById('round');
const outputRoundsLeft = document.getElementById('rounds-left');
const newGameBtn = document.getElementById('new-game-btn');
const newGameOutput = document.getElementById('new-game-output');
const progressTable = document.querySelector('.progressTable');
const tableHeader = document.querySelector('.modal h1');
const tbody = document.getElementById('tableBody');

const params = {
  round: 0,
  userResult: 0,
  computerResult: 0,
  roundsLeft: 0,
  progress: []
};
//Block buttons
const blockButtons = function (event) {
  for(var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = event;
  }
};

//Random computer choice
const randomPcChoice = function() {
  return Math.floor(Math.random() * 3 + 1);
};

newGameBtn.addEventListener('click', function() {
  const numberOfRounds = window.prompt('Enter the number of rounds');

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

const resultsOutput = function(text) {
  output.innerHTML = text;
};
const newGameMsg = function(text) {
  newGameOutput.innerHTML = text;
};
//First message
newGameMsg(firstMessage);

//Player move
const playerMove = function(playerChoice) {
  let computerChoice = randomPcChoice();
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
    resultsOutput(`DRAW!<br>You and Computer played:<br>${playerChoice}`);
    params.round++;
    outputRound.innerHTML = params.round;
    params.winner = 'DRAW';
  }
  else if ((playerChoice === 'ROCK' && computerChoice === 'SCISSORS') || (playerChoice === 'PAPER' && computerChoice === 'ROCK') || (playerChoice === 'SCISSORS' && computerChoice === 'PAPER')) {
    resultsOutput(`YOU WON!<br>You played: ${playerChoice}<br>Computer played: ${computerChoice}`);
    params.userResult++;
    outputPlayerScore.innerHTML = params.userResult;
    params.round++;
    outputRound.innerHTML = params.round;
    params.winner = 'PLAYER';
  }
  else {
    resultsOutput(`YOU LOST!<br>You played: ${playerChoice}<br>Computer played: ${computerChoice}`);
    params.computerResult ++;
    outputComputerScore.innerHTML = params.computerResult;
    params.round ++;
    outputRound.innerHTML = params.round;
    params.winner = 'COMPUTER';
  }

  params.progress.push({
    gameRounds: params.round,
    gamePlayerMove: playerChoice,
    gameComputerMove: computerChoice,
    roundWinner: params.winner,
    finalResult: params.userResult + ' - ' + params.computerResult
});

  if (params.roundsLeft === 0) {
    endGame();
  }
  else {
    newGameMsg(choice);
  }
};

const endGame = function() {
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
for (let i = 0; i < buttons.length; i++) {
  let self = buttons[i];
  self.addEventListener('click', function (event) {  
      playerMove(event.currentTarget.dataset.move);
  }, false);
  if (params.roundsLeft === 0) {
    blockButtons(true);
  }
}

//MODAL
const modal = document.querySelector('#modal');
const overlay = document.querySelector('#modal-overlay');

function showModal(){
  //event.preventDefault();
  overlay.classList.add('show');
  modal.classList.add('show');
}

//CLOSE MODAL
function closeModal() {
  overlay.classList.remove('show');
}

const closeButton = document.querySelector('#modal .close-modal');
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
  params.winner = null;
  params.progress = [];

  tbody.innerHTML = '';
}

function buildTable() {
   for (let i = 0; i < params.progress.length; i++) {
     const tr = document.createElement('tr');
     
     Object.entries(params.progress[i]).forEach(function(item) {
       const currentTd = document.createElement('td');

       currentTd.textContent = item[1];
       tr.appendChild(currentTd);
     });

     tbody.appendChild(tr);
  }
}