import React, { useState } from 'react';
import './GameBoard.scss';

const GameBoard = ({ board, isPlayerBoard, onClick, playerTurn, gameOver }) => {

  const [hoverCoordinates, setHoverCoordinates] = useState()

  const setClasses = (item, isPlayerBoard) => {
    if (isPlayerBoard || gameOver) {
      switch (item.body) {
        case '1-1':
        case '1-2':
        case '1-3':
        case '1-4':
          return 'one'
        case '2-1':
        case '2-2':
        case '2-3':
          return 'two'
        case '3-1':
        case '3-2':
          return 'three'
        case '4-1':
          return 'four'
        default:
          break;
      }
    }
  }

  const setContentClasses = (item, isPlayerBoard) => {
    if (item.shoted && !item.hasShipPart && !['injured', 'crashed'].includes(item.shipStatus)) {
      return 'shoted'
    }
    if (item.shoted && item.hasShipPart && item.shipStatus === 'injured') {
      return 'injured'
    }
    if (item.shoted && item.hasShipPart && item.shipStatus === 'crashed') {
      return 'crashed'
    }
    if (item.shipStatus === 'disabled') {
      return 'disabled'
    }

    // if(item.body === '+') {
    //   return 'ex'
    // }
  }

  return (
    <div className='board_container'>
      <table>
        <tbody>
          {board.map((row, x) => (
            <tr key={x}>{row.map((col, y) => (
              <td key={col.id}>
                {/* <div className={`container ${hoverCoordinates?.x === x || hoverCoordinates?.y === y ? 'targeted' : null}`}> */}
                <div
                  className={`content-wrapper ${setClasses(col, isPlayerBoard)} ${col.dir} ${!isPlayerBoard ? playerTurn ? 'enableShot' : 'disableShot' : ''}`}
                  onClick={(e) => onClick(x, y, isPlayerBoard, col.shipId)}
                  onMouseOver={() => setHoverCoordinates({ x, y })}
                  onMouseOut={() => setHoverCoordinates(null)}
                >
                  <div className={`content ${setContentClasses(col, isPlayerBoard)}`}>
                    <div className={`container ${hoverCoordinates?.x === x || hoverCoordinates?.y === y ? 'targeted' : null}`}>

                    </div>
                  </div>
                </div>
                {/* </div> */}
              </td>))}
            </tr>))}
        </tbody>
      </table>
      {!!hoverCoordinates && <div className='game-board-toaster'>{`X - ${hoverCoordinates.x} - Y - ${hoverCoordinates.y}`}</div>}
    </div>
  )
}

export default GameBoard