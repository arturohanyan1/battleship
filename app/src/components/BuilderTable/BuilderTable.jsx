import React from "react";
import { ReactSVG } from "react-svg";
import "./BuilderTable.scss";
import BoardSideCoords from "../commons/BoardSideCoords/BoardSideCoords";
import { BOARD_LETTERS, BOARD_NUMBERS } from "../../constants/constants";
import setBoardTableClasses from "../../helpers/classNames/setBoardTableClasses";

const BuilderTable = ({
  board,
  setHoverCoordinates,
  onClickHandler,
  onDragOverHandler,
  onDragLeaveHandler,
  onDropHandler,
  selectedShip,
  hoverCoordinates,
}) => {

  return (
    <div className="board-builder-table">
      <div className='board-letters'><BoardSideCoords info={BOARD_LETTERS} horizontal builder /></div>
      <div className='board-numbers'><BoardSideCoords info={BOARD_NUMBERS} vertical builder /></div>
      <table>
        <tbody>
          {board.map((row, x) => (
            <tr key={x}>
              {row.map((col, y) => (
                <td key={col.id}>
                  <div
                    className={`${setBoardTableClasses(col)} ${col.dir}`}
                    onMouseOver={() => setHoverCoordinates({ x, y })}
                    onMouseOut={() => setHoverCoordinates(null)}
                    onClick={() => onClickHandler(x, y)}
                    draggable={true}
                    onDragOver={(e) => onDragOverHandler(e, x, y, selectedShip)}
                    onDragLeave={(e) => onDragLeaveHandler(e, selectedShip)}
                    onDrop={(e) => onDropHandler(e, board, selectedShip, x, y)}
                  >
                    {col.hasShipPart && col.hasShipImg && (
                      <ReactSVG
                        src={`./images/ships/ship-${col.body}-${col.dir}.svg`}
                        className={`seted-ship ship-${col.body} dir-${col.dir}`}
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuilderTable;
