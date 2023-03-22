const getCoordsForLevel5 = (board) => {
  const availablePlacesForShot = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].hasShipPart && !board[i][j].shoted) {
        availablePlacesForShot.push({ x: i, y: j })
      }
    }
  }
  if (availablePlacesForShot.length) {
    const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
    return availablePlacesForShot[randomPlace]
  } else {
    return null
  }
}

export default getCoordsForLevel5;