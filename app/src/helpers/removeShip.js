import removeShipPart from "./removeShipPart";

// udalim odin korabl iz boarda
function removeShip(board, ship) {
  console.log(ship);
  const { x, y } = ship.imageCoords;
  if (ship.dir === "x") {
    if (x && y) {
      board[x][y].hasShipImg = false;
      ship.imageCoords = null;
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i].body = "-";
        board[x][y + i].empty = true;
        board[x][y + i].dir = null;
        board[x][y + i].hasShipPart = false;
        board[x][y + i].shipId = null;
        ship.shipCoords = [];
        ship.shipDisabledCoords = [];

        removeShipPart(x - 1, y + i, board);

        removeShipPart(x - 1, y - 1, board);

        removeShipPart(x - 1, y + i + 1, board);

        removeShipPart(x + 1, y + i, board);

        removeShipPart(x + 1, y - 1, board);

        removeShipPart(x + 1, y + i + 1, board);

        removeShipPart(x, y - 1, board);

        removeShipPart(x, y + ship.length, board);
      }
      return { board, ship };
    } else {
      console.log("no-available-place");
      return false;
    }
  } else if (ship.dir === "y") {
    if (x && y) {
      board[x][y].hasShipImg = false;
      ship.imageCoords = null;
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y].body = "-";
        board[x + i][y].empty = true;
        board[x + i][y].dir = null;
        board[x + i][y].hasShipPart = false;
        board[x + i][y].shipId = null;
        ship.shipCoords = [];
        ship.shipDisabledCoords = [];

        removeShipPart(x + i, y + 1, board);

        removeShipPart(x + i, y - 1, board);

        removeShipPart(x + i + 1, y - 1, board);

        removeShipPart(x + i + 1, y + 1, board);

        removeShipPart(x + ship.length, y, board);

        removeShipPart(x - 1, y, board);

        removeShipPart(x - 1, y - 1, board);

        removeShipPart(x - 1, y + 1, board);
      }
      return { board, ship };
    } else {
      console.log("no-available-places");
      return false;
    }
  } else {
    console.log("incorrect coordinates");
    return false;
  }
}

export default removeShip;
