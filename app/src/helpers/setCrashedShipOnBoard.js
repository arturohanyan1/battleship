// vstavim utoplenniy korabl na dosku
const setCrashedShipOnBoard = (crashedShip, board) => {
  for (let i = 0; i < crashedShip.shipCoords.length; i++) {
    const { x, y } = crashedShip.shipCoords[i]
    board[x][y].shipStatus = 'crashed';
  }
  for (let i = 0; i < crashedShip.shipDisabledCoords.length; i++) {
    const { x, y } = crashedShip.shipDisabledCoords[i]
    if (!board[x][y].shoted) board[x][y].shipStatus = 'disabled';
  }
  return board
}

export default setCrashedShipOnBoard;