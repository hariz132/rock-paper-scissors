function computerPlay(){
  const result = Math.floor(Math.random() * 3); // returns either 0, 1, or 2
  switch (result) {
    case 0: return 'rock';
    case 1: return 'paper';
    case 2: return 'scissors';
  }
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  let r = 'rock';
  let p = 'paper';
  let s = 'scissors';
  let result;

  if (playerSelection === computerSelection) {
    return [null, `It's a Tie! Both chose ${playerSelection}.`];
  }

  switch (true) {
    // case for paper vs rock
    case (playerSelection === p && computerSelection === r) || 
    (playerSelection === r && computerSelection === p):
      result = (playerSelection === p) ? 'Win' : 'Lose';
      return [playerSelection === p, `You ${result}!, Paper beats Rock.`];
    // case for scissors vs paper
    case (playerSelection === s && computerSelection === p) || 
    (playerSelection === p && computerSelection === s):
      result = (playerSelection === s) ? 'Win' : 'Lose';
      return [playerSelection === s, `You ${result}!, Scissors beats Paper.`];
    // case for rock vs scissors
    case (playerSelection === r && computerSelection === s) || 
    (playerSelection === s && computerSelection === r):
      result = (playerSelection === r) ? 'Win' : 'Lose';
      return [playerSelection === r, `You ${result}!, Rock beats Scissors.`];
  }
}

const buttons = document.querySelectorAll('.buttons img');
const resultBoard = document.querySelector('#result');
const playerScoreBoard = document.querySelector('#playerScoreBoard');
const computerScoreBoard = document.querySelector('#computerScoreBoard');

buttons.forEach(btn => btn.addEventListener('click', buttonClick));

function buttonClick(e) {
  const roundResult = playRound(e.target.id, computerPlay());
  resultBoard.textContent = roundResult[1];
  if (roundResult[0] !== null) {
    updateGameScore(roundResult[0]);
  }
  if(playerScore === 5 || computerScore === 5) {
    setGameOver();
  }
}

let playerScore = 0;
let computerScore = 0;
let resetButton;
let gameOverBoard;

function updateGameScore(roundResult) {
  roundResult ? playerScore++ : computerScore++;
  playerScoreBoard.textContent = playerScore;
  computerScoreBoard.textContent = computerScore;
}

function displayWinner() {
  gameOverBoard = document.createElement('div');
  if (playerScore > computerScore) {
    gameOverBoard.textContent = 'You won the game!';
  } else {
    gameOverBoard.textContent = 'You lost the game!';
  }
  resultBoard.parentNode.appendChild(gameOverBoard);
}

function setGameOver(){
  displayWinner();
  buttons.forEach(btn => btn.removeEventListener('click', buttonClick));
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  resultBoard.parentNode.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreBoard.textContent = 0;
  computerScoreBoard.textContent = 0;
  resultBoard.textContent = '';
  buttons.forEach(btn => btn.addEventListener('click', buttonClick));
  gameOverBoard.parentNode.removeChild(gameOverBoard);
  resetButton.parentNode.removeChild(resetButton);
}
