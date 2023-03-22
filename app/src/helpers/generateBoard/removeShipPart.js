// vstavim chast koroblya

// need to be enhanced
function removeShipPart(x, y, board) {
  if (x < 10 && x >= 0 && y < 10 && y >= 0 && board[x][y]?.empty) {
    board[x][y].body = "-";
    board[x][y].empty = true;
    board[x][y].dir = null;
  }
}

export default removeShipPart;
