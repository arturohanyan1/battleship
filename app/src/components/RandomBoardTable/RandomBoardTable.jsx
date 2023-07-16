import React from 'react'
import BoardSideCoords from '../commons/BoardSideCoords/BoardSideCoords';
import { BOARD_LETTERS, BOARD_NUMBERS } from '../../constants/constants';
import setBoardTableClasses from '../../helpers/classNames/setBoardTableClasses';
import { ReactSVG } from 'react-svg';
import './RandomBoardTable.scss'

const RandomBoardTable = ({ board }) => {

  return (
    <div className="random_board-builder-table">
      <div className='random_board-letters'><BoardSideCoords info={BOARD_LETTERS} horizontal builder /></div>
      <div className='random_board-numbers'><BoardSideCoords info={BOARD_NUMBERS} vertical builder /></div>
      <table>
        <tbody>
          {board.map((row, x) => (
            <tr key={x}>
              {row.map((col, y) => (
                <td key={col.id}>
                  <div
                    className={`${setBoardTableClasses(col)} ${col.dir}`}
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
}

export default RandomBoardTable