// for level1 level
// const handleAvailablePlacesForShot = (board) => {
//   const availablePlacesForShot = []
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       if (!board[i][j].shipStatus && !board[i][j].shoted) {
//         availablePlacesForShot.push({ x: i, y: j })
//       }
//     }
//   }
//   if (availablePlacesForShot.length) {
//     const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
//     return availablePlacesForShot[randomPlace];
//   }
//   return null
// }

import getAvailablePlacesForShot from "./getAvailablePlacesForShot";
import getCoordsForLevel2 from "./getCoordsForLevel2";
import getCoordsForLevel3 from "./getCoordsForLevel3";
import getCoordsForLevel4 from "./getCoordsForLevel4";
import getCoordsForLevel5 from "./getCoordsForLevel5";




// for level2 level
// const getCoordsForPlayerInjuredShips = (board, coords) => {
//   const { x, y } = coords[0];
//   const coordsLength = coords.length;
//   const availablePlacesForShot = [];
//   if (coordsLength === 1) {
//     if (y + 1 <= 9) if (!board[x][y + 1].shoted) availablePlacesForShot.push({ x: x, y: y + 1 })
//     if (y - 1 >= 0) if (!board[x][y - 1].shoted) availablePlacesForShot.push({ x: x, y: y - 1 })
//     if (x + 1 <= 9) if (!board[x + 1][y].shoted) availablePlacesForShot.push({ x: x + 1, y: y })
//     if (x - 1 >= 0) if (!board[x - 1][y].shoted) availablePlacesForShot.push({ x: x - 1, y: y })
//   } else {
//     if (coords.every(el => el.x === x)) {
//       coords.sort((a, b) => a.y - b.y);
//       const minY = coords[0].y;
//       const maxY = coords[coordsLength - 1].y;
//       if (minY - 1 >= 0) if (!board[x][minY - 1].shoted) availablePlacesForShot.push({ x: x, y: minY - 1 })
//       if (maxY + 1 <= 9) if (!board[x][maxY + 1].shoted) availablePlacesForShot.push({ x: x, y: maxY + 1 })
//     } else if (coords.every(el => el.y === y)) {
//       coords.sort((a, b) => a.x - b.x);
//       const minX = coords[0].x;
//       const maxX = coords[coordsLength - 1].x;
//       if (minX - 1 >= 0) if (!board[minX - 1][y].shoted) availablePlacesForShot.push({ x: minX - 1, y: y })
//       if (maxX + 1 <= 9) if (!board[maxX + 1][y].shoted) availablePlacesForShot.push({ x: maxX + 1, y: y })
//     }
//   }
//   if (availablePlacesForShot.length) {
//     const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
//     return availablePlacesForShot[randomPlace]
//   } else {
//     return null
//   }
// }

//for level3
// const getAllCoordsForPlayerInjuredShips1 = (board, ships, coords) => {
//   const { x, y } = coords[0];
//   const { shipId } = board[x][y];
//   let availablePlacesForShot = [];
//   if (coords.length === 1) {
//     if (y + 1 <= 9) if (!board[x][y + 1].shoted) availablePlacesForShot.push({ x: x, y: y + 1 })
//     if (y - 1 >= 0) if (!board[x][y - 1].shoted) availablePlacesForShot.push({ x: x, y: y - 1 })
//     if (x + 1 <= 9) if (!board[x + 1][y].shoted) availablePlacesForShot.push({ x: x + 1, y: y })
//     if (x - 1 >= 0) if (!board[x - 1][y].shoted) availablePlacesForShot.push({ x: x - 1, y: y })
//   } else {
//     const targetedShipCoords = ships.filter(ship => shipId == ship.id)[0].shipCoords;
//     availablePlacesForShot = targetedShipCoords.filter(coord => !board[coord.x][coord.y].shoted);
//   }
//   if (availablePlacesForShot.length) {
//     const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
//     return availablePlacesForShot[randomPlace]
//   } else {
//     return null
//   }
// }

// for level4 level
// const getAllCoordsForPlayerInjuredShips = (board, ships, coords) => {
//   const { x, y } = coords[0];
//   const { shipId } = board[x][y];
//   const targetedShipCoords = ships.filter(ship => shipId == ship.id)[0].shipCoords;
//   const availablePlacesForShot = targetedShipCoords.filter(coord => !board[coord.x][coord.y].shoted);
//   if (availablePlacesForShot.length) {
//     const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
//     return availablePlacesForShot[randomPlace]
//   } else {
//     return null
//   }
// }

// for level5 level
// const handlePlayerAllShipsCoords = (board) => {
//   const availablePlacesForShot = []
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       if (board[i][j].hasShipPart && !board[i][j].shoted) {
//         availablePlacesForShot.push({ x: i, y: j })
//       }
//     }
//   }
//   if (availablePlacesForShot.length) {
//     const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
//     return availablePlacesForShot[randomPlace]
//   } else {
//     return null
//   }
// }

// get coords for shot
const getShotCoords = (level, board, ships, coords) => {
  if (level === 'level1') {
    return getAvailablePlacesForShot(board)
  } else if (level === 'level2' && coords.length) {
    return getCoordsForLevel2(board, coords)
  } else if (level === 'level3' && coords.length) {
    return getCoordsForLevel3(board, ships, coords)
  } else if (level === 'level4' && coords.length) {
    return getCoordsForLevel4(board, ships, coords)
  } else if (level === 'level5') {
    return getCoordsForLevel5(board)
  } else {
    return getAvailablePlacesForShot(board)
  }
}

export default getShotCoords