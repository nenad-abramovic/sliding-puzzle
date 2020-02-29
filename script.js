const container = document.getElementById('container');

const board = [];

for (let i = 0; i < 4; i++) {
  board.push([]);

  for (let j = 1; j < 5; j++) {
    let field = document.createElement('div');
    field.textContent = i * 4 + j;

    board[i].push(field);
    container.appendChild(field);
  }
}

board[3][3].id = 'f-empty';
board[3][3].textContent = '';

let emptyField = {
  row: 3,
  col: 3
};

const handleKeyUp = (e) => {
  let tmp = board[emptyField.row][emptyField.col].textContent;

  switch (e.keyCode) {
    case 37:
      if (emptyField.col === 3) {
        break;
      }
      board[emptyField.row][emptyField.col].textContent = board[emptyField.row][emptyField.col + 1].textContent;

      board[emptyField.row][emptyField.col + 1].textContent = tmp;

      emptyField.col++;
      break;
    case 38:
      if (emptyField.row === 3) {
        break;
      }
      board[emptyField.row][emptyField.col].textContent = board[emptyField.row + 1][emptyField.col].textContent;

      board[emptyField.row + 1][emptyField.col].textContent = tmp;

      emptyField.row++;
      break;
    case 39:
      if (emptyField.col === 0) {
        break;
      }
      board[emptyField.row][emptyField.col].textContent = board[emptyField.row][emptyField.col - 1].textContent;

      board[emptyField.row][emptyField.col - 1].textContent = tmp;

      emptyField.col--;
      break;
    case 40:
      if (emptyField.row === 0) {
        break;
      }
      board[emptyField.row][emptyField.col].textContent = board[emptyField.row - 1][emptyField.col].textContent;

      board[emptyField.row - 1][emptyField.col].textContent = tmp;

      emptyField.row--;
      break;
    default:
      break;
  }
}

window.addEventListener('keyup', handleKeyUp);

