const container = document.getElementById('container');
const newGameBtn = document.getElementById('new-game-btn');
const moveCount = document.getElementById('move-count');

const board = [];
let totalMoves;
resetMoveCount();
startNewGame();
let emptyField = { row: 3, col: 3 };


window.addEventListener('keyup', handleKeyUp);
newGameBtn.addEventListener('click', function () {
  clearDOMContainer();
  startNewGame();
});

function createBoard() {
  for (let i = 0; i < 4; i++) {
    board.push([]);

    for (let j = 1; j < 5; j++) {
      let field = document.createElement('div');
      field.textContent = i * 4 + j;
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
}

function addBoardToDOMContainer() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      container.appendChild(board[i][j]);
    }
  }
}

function clearDOMContainer() {
  container.innerHTML = '';
}

function startNewGame() {
  resetMoveCount();
  createBoard();
  shuffleBoard();
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
}