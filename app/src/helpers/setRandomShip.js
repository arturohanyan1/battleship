import checkAvailablePlacesInColls from "./checkAvailablePlacesInColls";
import checkAvailablePlacesInRows from "./checkAvailablePlacesInRows";
import direction from "./direction";
import setShipPart from "./setShipPart";
import shipDisabledCoords from "./shipDisabledCoords";

// vstavim odin korabl na randomnom mest
function setRandomShip(board, ship) {
  const dir = direction()
  if (dir === 'x') {
    const availablePlaces = checkAvailablePlacesInRows(board, ship.length)
    if (availablePlaces.length) {
      const randomPlace = Math.floor(Math.random() * availablePlaces.length);
      const { x, y } = availablePlaces[randomPlace];
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
      ship.dir = 'x'
      return { board, ship }
    } else {
      console.log('no-available-places')
      setRandomShip(board, ship)
    }
  } else if (dir === 'y') {
    const availablePlaces = checkAvailablePlacesInColls(board, ship.length);
    if (availablePlaces.length) {
      const randomPlace = Math.floor(Math.random() * availablePlaces.length);
      const { x, y } = availablePlaces[randomPlace];
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
      ship.dir = 'y'
      return { board, ship }
    } else {
      console.log('no-available-places')
      setRandomShip(board, ship)
    }
  } else {
    console.log('incorrect coordinates')
  }
}

export default setRandomShip;