const getCoordsForLevel4 = (board, ships, coords) => {
  const { x, y } = coords[0];
  const { shipId } = board[x][y];
  const targetedShipCoords = ships.filter(ship => Number(shipId) === Number(ship.id))[0].shipCoords;
  const availablePlacesForShot = targetedShipCoords.filter(coord => !board[coord.x][coord.y].shoted);
  if (availablePlacesForShot.length) {
    const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
    return availablePlacesForShot[randomPlace]
  } else {
    return null
  }
}

export default getCoordsForLevel4