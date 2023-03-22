import checkIsCollEmpty from "./checkIsCollEmpty";

// naxodim dostupnie kordinati in Colls dlya koroblya
function checkAvailablePlacesInColls(board, shipLength) {
  let places = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (checkIsCollEmpty(board, i, j, shipLength)) {
        places.push({ x: i, y: j })
      }
    }
  }
  return places
}

export default checkAvailablePlacesInColls;