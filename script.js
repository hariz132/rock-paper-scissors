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
    return [null, `Tie! Both chose ${playerSelection}.`];
  }

  switch (true) {
    // case for paper vs rock
    case (playerSelection === p && computerSelection === r) || 
    (playerSelection === r && computerSelection === p):
      result = (playerSelection === p) ? 'win' : 'lose';
      return [playerSelection === p, `You ${result}! paper beats rock.`];
    // case for scissors vs paper
    case (playerSelection === s && computerSelection === p) || 
    (playerSelection === p && computerSelection === s):
      result = (playerSelection === s) ? 'win' : 'lose';
      return [playerSelection === s, `You ${result}! scissors beats paper.`];
    // case for rock vs scissors
    case (playerSelection === r && computerSelection === s) || 
    (playerSelection === s && computerSelection === r):
      result = (playerSelection === r) ? 'win' : 'lose';
      return [playerSelection === r, `You ${result}! rock beats scissors.`];
  }
}

const choices = document.querySelectorAll('.choicescontainer img');
const choicescontainer = document.querySelector('.choicescontainer');
const resultBoard = document.querySelector('#result');
const playerScoreBoard = document.querySelector('#playerScoreBoard');
const computerScoreBoard = document.querySelector('#computerScoreBoard');
const playerChoiceDisplay = document.querySelector('.playerChoiceDisplay');
const computerChoiceDisplay = document.querySelector('.computerChoiceDisplay')

let playerScore = 0;
let computerScore = 0;
let resetButton;
let gameOverBoard;

choices.forEach(btn => btn.addEventListener('click', buttonClick));

function buttonClick(e) {
  const computerChoice = computerPlay();
  displayChoices(e.target.id, computerChoice);
  const roundResult = playRound(e.target.id, computerChoice);
  resultBoard.textContent = roundResult[1];
  highlightWinningLosingChoice(roundResult[0]);
  if (roundResult[0] !== null) {
    updateGameScore(roundResult[0]);
  }
  if(playerScore === 5 || computerScore === 5) {
    setGameOver();
  }
}

function highlightWinningLosingChoice(isPlayerWin) {
  // clear current highlights:
  playerChoiceDisplay.classList.remove('winhighlight', 'losehighlight', 'tiehighlight');
  computerChoiceDisplay.classList.remove('winhighlight', 'losehighlight', 'tiehighlight');
  
  switch (isPlayerWin) {
    case true:
      playerChoiceDisplay.classList.add('winhighlight');
      computerChoiceDisplay.classList.add('losehighlight');    
      break;
    case false:
      playerChoiceDisplay.classList.add('losehighlight');
      computerChoiceDisplay.classList.add('winhighlight');    
      break;
    case null:
      playerChoiceDisplay.classList.add('tiehighlight');
      computerChoiceDisplay.classList.add('tiehighlight');
  }
}

function displayChoices(playerChoice, computerChoice) {
  playerChoiceDisplay.setAttribute('src', `images/${playerChoice}.png`);
  computerChoiceDisplay.setAttribute('src', `images/${computerChoice}.png`);
}

function updateGameScore(roundResult) {
  roundResult ? playerScore++ : computerScore++;
  playerScoreBoard.textContent = playerScore;
  computerScoreBoard.textContent = computerScore;
}

function displayWinner() {
  gameOverBoard = document.createElement('div');
  if (playerScore > computerScore) {
    gameOverBoard.classList.add('gameoverResultWin');
    gameOverBoard.textContent = 'You won the game!';
  } else {
    gameOverBoard.classList.add('gameoverResultLose');
    gameOverBoard.textContent = 'You lost the game!';
  }
  resultBoard.parentNode.appendChild(gameOverBoard);
}

function setGameOver(){
  displayWinner();
  choices.forEach(btn => choicescontainer.removeChild(btn));
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
  choices.forEach(btn => choicescontainer.appendChild(btn));
  gameOverBoard.parentNode.removeChild(gameOverBoard);
  resetButton.parentNode.removeChild(resetButton);
  displayChoices('question-mark', 'question-mark');
  playerChoiceDisplay.classList.remove('winhighlight', 'losehighlight', 'tiehighlight');
  computerChoiceDisplay.classList.remove('winhighlight', 'losehighlight', 'tiehighlight');
}
