// poluchaem dostupnie kordinati dlya vistrela
const getAvailablePlacesForShot = (board) => {
  const availablePlacesForShot = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j].shipStatus && !board[i][j].shoted) {
        availablePlacesForShot.push({ x: i, y: j })
      }
    }
  }
  if (availablePlacesForShot.length) {
    const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
    return availablePlacesForShot[randomPlace];
  }
  return null
}

export default getAvailablePlacesForShot