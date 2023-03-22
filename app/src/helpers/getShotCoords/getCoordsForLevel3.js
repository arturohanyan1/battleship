const getCoordsForLevel3 = (board, ships, coords) => {
  const { x, y } = coords[0];
  const { shipId } = board[x][y];
  let availablePlacesForShot = [];
  if (coords.length === 1) {
    if (y + 1 <= 9) if (!board[x][y + 1].shoted) availablePlacesForShot.push({ x: x, y: y + 1 })
    if (y - 1 >= 0) if (!board[x][y - 1].shoted) availablePlacesForShot.push({ x: x, y: y - 1 })
    if (x + 1 <= 9) if (!board[x + 1][y].shoted) availablePlacesForShot.push({ x: x + 1, y: y })
    if (x - 1 >= 0) if (!board[x - 1][y].shoted) availablePlacesForShot.push({ x: x - 1, y: y })
  } else {
    const targetedShipCoords = ships.filter(ship => Number(shipId) === Number(ship.id))[0].shipCoords;
    availablePlacesForShot = targetedShipCoords.filter(coord => !board[coord.x][coord.y].shoted);
  }
  if (availablePlacesForShot.length) {
    const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
    return availablePlacesForShot[randomPlace]
  } else {
    return null
  }
}

export default getCoordsForLevel3