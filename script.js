const container = document.getElementById('container');
const newGameBtn = document.getElementById('new-game-btn');
const moveCount = document.getElementById('move-count');
const message = document.getElementById('message');

const board = [];
let emptyField = { row: 3, col: 3 };
let totalMoves;
resetMoveCount();
startNewGame();


window.addEventListener('keyup', handleKeyUp);
newGameBtn.addEventListener('click', startNewGame);

function createBoard() {
  board.length = 0;
  for (let i = 0; i < 4; i++) {
    board.push([]);

    for (let j = 1; j < 5; j++) {
      let field = document.createElement('div');
      field.textContent = i * 4 + j;
      field.id = '';
      board[i].push(field);
    }
  }

  board[3][3].id = 'f-empty';
  board[3][3].textContent = '';
}

function shuffleBoard() {
  for (let i = 14; i > -1; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = board[Math.floor(i / 4)][i % 4];
    board[Math.floor(i / 4)][i % 4] = board[Math.floor(j / 4)][j % 4];
    board[Math.floor(j / 4)][j % 4] = tmp;
  }

  let permutationCount = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      permutationCount += Math.abs(Math.floor(board[i][j].textContent / 4) - i) + Math.abs(board[i][j].textContent % 4 - j);
    }
  }

  if ((permutationCount / 2) % 2 === 0) {
    let tmp = board[0][0];
    board[0][0] = board[0][1];
    board[0][1] = tmp;
  }
}

function resetEmptyFieldPos() {
  emptyField = {
    row: 3,
    col: 3
  };
}

function addBoardToDOMContainer() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      container.appendChild(board[i][j]);
    }
  }
}

function clearDOMContainer() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function startNewGame() {
  clearDOMContainer();
  resetMoveCount();
  createBoard();
  shuffleBoard();
  resetEmptyFieldPos();
  addBoardToDOMContainer();
}

function updateMoveCount() {
  totalMoves++;
  moveCount.textContent = totalMoves;
}

function resetMoveCount() {
  totalMoves = 0;
  moveCount.textContent = totalMoves;
}

function handleKeyUp(e) {
  switch (e.keyCode) {
    case 37:
      if (emptyField.col === 3) {
        break;
      }

      updateMoveCount();
      board[emptyField.row][emptyField.col].textContent = board[emptyField.row][emptyField.col + 1].textContent;
      board[emptyField.row][emptyField.col].id = '';

      board[emptyField.row][emptyField.col + 1].textContent = '';
      board[emptyField.row][emptyField.col + 1].id = 'f-empty';

      emptyField.col++;
      break;

    case 38:
      if (emptyField.row === 3) {
        break;
      }

      updateMoveCount();
      board[emptyField.row][emptyField.col].textContent = board[emptyField.row + 1][emptyField.col].textContent;
      board[emptyField.row][emptyField.col].id = '';

      board[emptyField.row + 1][emptyField.col].textContent = '';
      board[emptyField.row + 1][emptyField.col].id = 'f-empty';

      emptyField.row++;
      break;

    case 39:
      if (emptyField.col === 0) {
        break;
      }

      updateMoveCount();
      board[emptyField.row][emptyField.col].textContent = board[emptyField.row][emptyField.col - 1].textContent;
      board[emptyField.row][emptyField.col].id = '';

      board[emptyField.row][emptyField.col - 1].textContent = '';
      board[emptyField.row][emptyField.col - 1].id = 'f-empty';

      emptyField.col--;
      break;

    case 40:
      if (emptyField.row === 0) {
        break;
      }

      updateMoveCount();
      board[emptyField.row][emptyField.col].textContent = board[emptyField.row - 1][emptyField.col].textContent;
      board[emptyField.row][emptyField.col].id = '';

      board[emptyField.row - 1][emptyField.col].textContent = '';
      board[emptyField.row - 1][emptyField.col].id = 'f-empty';

      emptyField.row--;
      break;

    default:
      break;
  }

  if (isSolved()) {
    message.textContent = `Браво! Победио си! Свака част! Игру си завршио у ${totalMoves} потеза.`;
    startNewGame();
  }
}

function isSolved() {
  for (let i = 14; i > -1; i--) {
    if (board[Math.floor(i / 4)][i % 4].textContent !== `${i + 1}`) {
      return false;
    }
  }
  return true;
}