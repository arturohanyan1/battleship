import React, { useState } from 'react';
import { ReactSVG } from "react-svg";
import { BOARD_LETTERS, BOARD_NUMBERS } from '../../constants/constants';
import setGameCollContentClasses from '../../helpers/classNames/setGameCollContentClasses';
import setShotSVGClasses from '../../helpers/classNames/setShotSVGClasses';
import BoardSideCoords from '../commons/BoardSideCoords/BoardSideCoords';
import './GameBoard.scss';

const GameBoard = ({ board, isPlayerBoard, onClick, playerTurn, gameOver }) => {

  const [hoverCoordinates, setHoverCoordinates] = useState();

  return (
    <div className='board_container'>
      <div className='board-letters'><BoardSideCoords info={BOARD_LETTERS} horizontal game  /></div>
      <div className='board-numbers'><BoardSideCoords info={BOARD_NUMBERS} vertical game  /></div>
      <table>
        <tbody>
          {board.map((row, x) => (
            <tr key={x}>{row.map((col, y) => (
              <td key={col.id}>
                <div
                  className={`content-wrapper ${col.dir} ${!isPlayerBoard ? playerTurn ? 'enableShot' : 'disableShot' : ''}`}
                  onClick={(e) => onClick(x, y, isPlayerBoard, col.shipId)}
                  onMouseOver={() => setHoverCoordinates({ x, y })}
                  onMouseOut={() => setHoverCoordinates(null)}
                >
                  <div className={`content ${setGameCollContentClasses(col, isPlayerBoard)}`}>
                    <div className={`container ${(hoverCoordinates?.x === x || hoverCoordinates?.y === y) && !isPlayerBoard ? 'targeted' : null}`}>
                      {((col.hasShipPart && col.shipStatus === 'crashed') || gameOver || isPlayerBoard) && col.hasShipImg && (
                        <ReactSVG
                          src={`./images/ships/ship-${col.body}-${col.dir}.svg`}
                          alt=""
                          className={`seted-ship ship-${col.body} dir-${col.dir}`}
                        />
                      )}
                      {col.shoted && (
                        <ReactSVG
                          src={`./images/board/ship.svg`}
                          alt=""
                          className={`shot-img ${setShotSVGClasses(col)}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </td>))}
            </tr>))}
        </tbody>
      </table>
      {!!hoverCoordinates && <div className='game-board-toaster'>{`X - ${hoverCoordinates.x} - Y - ${hoverCoordinates.y}`}</div>}
    </div>
  )
}

export default GameBoard