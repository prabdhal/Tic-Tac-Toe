const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const cellElements = document.querySelectorAll('[data-cell]');
const activePlayer = document.getElementById('board');
let circleTurn;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winningMessageElement = document.getElementById('winningMessage');
const dataWinningMessageText = document.querySelector(
  '[data-winning-message-text]'
);
const restartButton = document.getElementById('restartButton');

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // place mark
  placeMark(cell, currentClass);
  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    // switch turns
    switchTurns(currentClass);
    // change hover class to next player symbol
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  // reset board class
  activePlayer.classList.remove(X_CLASS);
  activePlayer.classList.remove(CIRCLE_CLASS);
  // get next player class: x or circle
  const nextPlayer = circleTurn ? CIRCLE_CLASS : X_CLASS;
  activePlayer.classList.add(nextPlayer);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function checkDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    dataWinningMessageText.textContent = `Draw!`;
  } else {
    dataWinningMessageText.textContent = `${circleTurn ? 'O' : 'X'} Wins!`;
  }
  winningMessageElement.classList.add('show');
}
