const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const cellElements = document.querySelectorAll('[data-cell]');
const activePlayer = document.getElementById('board');
let circleTurn;

cellElements.forEach((cell) => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // place mark
  placeMark(cell, currentClass);
  // check for win
  // check for draw
  // switch turns
  switchTurns(currentClass);
  console.log('clicked');
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  circleTurn = !circleTurn;
  activePlayer.classList.remove('x');
  activePlayer.classList.remove('circle');
  const nextPlayer = circleTurn ? CIRCLE_CLASS : X_CLASS;
  activePlayer.classList.add(nextPlayer);
}
