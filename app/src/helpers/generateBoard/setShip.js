import checkAvailablePlacesInColls from "./checkAvailablePlacesInColls";
import checkAvailablePlacesInRows from "./checkAvailablePlacesInRows";
import direction from "./direction";
import setShipPart from "./setShipPart";
import shipDisabledCoords from "./shipDisabledCoords";

// vstavim odin korabl na randomnom mest
function setShip(board, ship, x, y) {
  if (!ship.dir) ship.dir = direction()
  if (ship.dir === 'x') {
    const availablePlaces = checkAvailablePlacesInRows(board, ship.length);
    const isPlaceAvailable = availablePlaces.some(el => (el.x === x && el.y === y))
    if (isPlaceAvailable) {
      board[x][y].hasShipImg = true
      ship.imageCoords = { x, y }
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i].body = ship.shipName;
        board[x][y + i].empty = false;
        board[x][y + i].dir = 'x';
        board[x][y + i].hasShipPart = true;
        board[x][y + i].shipId = ship.id;
        ship.shipCoords.push({ x: x, y: y + i });

        setShipPart(x - 1, y + i, board);
        shipDisabledCoords(x - 1, y + i, ship);

        setShipPart(x - 1, y - 1, board);
        shipDisabledCoords(x - 1, y - 1, ship);

        setShipPart(x - 1, y + i + 1, board);
        shipDisabledCoords(x - 1, y + i + 1, ship);

        setShipPart(x + 1, y + i, board);
        shipDisabledCoords(x + 1, y + i, ship);

        setShipPart(x + 1, y - 1, board);
        shipDisabledCoords(x + 1, y - 1, ship);

        setShipPart(x + 1, y + i + 1, board);
        shipDisabledCoords(x + 1, y + i + 1, ship);

        setShipPart(x, y - 1, board)
        shipDisabledCoords(x, y - 1, ship);

        setShipPart(x, y + ship.length, board);
        shipDisabledCoords(x, y + ship.length, ship);
      }
      return { board, ship }
    } else {
      console.log('no-available-place')
      return false
    }
  } else if (ship.dir === 'y') {
    const availablePlaces = checkAvailablePlacesInColls(board, ship.length);
    const isPlaceAvailable = availablePlaces.some(el => (el.x === x && el.y === y))
    if (isPlaceAvailable) {
      board[x][y].hasShipImg = true
      ship.imageCoords = { x, y }
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y].body = ship.shipName;
        board[x + i][y].empty = false;
        board[x + i][y].dir = 'y';
        board[x + i][y].hasShipPart = true;
        board[x + i][y].shipId = ship.id;
        ship.shipCoords.push({ x: x + i, y: y });

        setShipPart(x + i, y + 1, board);
        shipDisabledCoords(x + i, y + 1, ship);

        setShipPart(x + i, y - 1, board);
        shipDisabledCoords(x + i, y - 1, ship);

        setShipPart(x + i + 1, y - 1, board);
        shipDisabledCoords(x + i + 1, y - 1, ship);

        setShipPart(x + i + 1, y + 1, board);
        shipDisabledCoords(x + i + 1, y + 1, ship);

        setShipPart(x + ship.length, y, board);
        shipDisabledCoords(x + ship.length, y, ship);

        setShipPart(x - 1, y, board);
        shipDisabledCoords(x - 1, y, ship);

        setShipPart(x - 1, y - 1, board);
        shipDisabledCoords(x - 1, y - 1, ship);

        setShipPart(x - 1, y + 1, board);
        shipDisabledCoords(x - 1, y + 1, ship);
      }
      return { board, ship }
    } else {
      console.log('no-available-places')
      return false
    }
  } else {
    console.log('incorrect coordinates')
    return false
  }
}

export default setShip;