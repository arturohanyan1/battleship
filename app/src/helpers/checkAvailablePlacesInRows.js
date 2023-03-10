import checkIsRowEmpty from "./checkIsRowEmpty";

// naxodim dostupnie kordinati in Rows dlya koroblya
function checkAvailablePlacesInRows(board, shipLength) {
  let places = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (checkIsRowEmpty(board[i], shipLength, j)) {
        places.push({ x: i, y: j })
      }
    }
  }
  return places
}

export default checkAvailablePlacesInRows;