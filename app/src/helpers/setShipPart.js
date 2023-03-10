// vstavim chast koroblya
function setShipPart(x, y, board, part = '+', direction) {
  if (x < 10 && x >= 0 && y < 10 && y >= 0 && board[x][y]?.empty) {
    board[x][y].body = part;
    board[x][y].empty = false;
    board[x][y].dir = direction;
  }
}

export default setShipPart;