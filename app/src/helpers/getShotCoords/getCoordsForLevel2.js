const getCoordsForLevel2 = (board, coords) => {
  const { x, y } = coords[0];
  const coordsLength = coords.length;
  const availablePlacesForShot = [];
  if (coordsLength === 1) {
    if (y + 1 <= 9) if (!board[x][y + 1].shoted) availablePlacesForShot.push({ x: x, y: y + 1 })
    if (y - 1 >= 0) if (!board[x][y - 1].shoted) availablePlacesForShot.push({ x: x, y: y - 1 })
    if (x + 1 <= 9) if (!board[x + 1][y].shoted) availablePlacesForShot.push({ x: x + 1, y: y })
    if (x - 1 >= 0) if (!board[x - 1][y].shoted) availablePlacesForShot.push({ x: x - 1, y: y })
  } else {
    if (coords.every(el => el.x === x)) {
      coords.sort((a, b) => a.y - b.y);
      const minY = coords[0].y;
      const maxY = coords[coordsLength - 1].y;
      if (minY - 1 >= 0) if (!board[x][minY - 1].shoted) availablePlacesForShot.push({ x: x, y: minY - 1 })
      if (maxY + 1 <= 9) if (!board[x][maxY + 1].shoted) availablePlacesForShot.push({ x: x, y: maxY + 1 })
    } else if (coords.every(el => el.y === y)) {
      coords.sort((a, b) => a.x - b.x);
      const minX = coords[0].x;
      const maxX = coords[coordsLength - 1].x;
      if (minX - 1 >= 0) if (!board[minX - 1][y].shoted) availablePlacesForShot.push({ x: minX - 1, y: y })
      if (maxX + 1 <= 9) if (!board[maxX + 1][y].shoted) availablePlacesForShot.push({ x: maxX + 1, y: y })
    }
  }
  if (availablePlacesForShot.length) {
    const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
    return availablePlacesForShot[randomPlace]
  } else {
    return null
  }
}

export default getCoordsForLevel2