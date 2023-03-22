// vstavim cordinati koroblya
function shipDisabledCoords(x, y, ship) {
  if (x < 10 && x >= 0 && y < 10 && y >= 0) {
    const hasCoords = ship.shipDisabledCoords.some(el => el.x === x && el.y === y)
    if (!hasCoords) ship.shipDisabledCoords.push({ x: x, y: y })
  }
}

export default shipDisabledCoords;