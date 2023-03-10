import EMPTY_BOARD from "../constants/emptyBoard";
import SHIPS from "../constants/ships";
import setRandomShip from "./setRandomShip";

const randomBoard = () => {
  const ships = JSON.parse(JSON.stringify(SHIPS));
  const board = JSON.parse(JSON.stringify(EMPTY_BOARD));

  ships.forEach(ship => setRandomShip(board, ship))
  return { board, ships }
}

export default randomBoard