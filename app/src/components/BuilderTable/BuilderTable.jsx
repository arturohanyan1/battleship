import React from 'react';
import './BuilderTable.scss'

const BuilderTable = ({
  board,
  setHoverCoordinates,
  onClickHandler,
  onDragOverHandler,
  onDragLeaveHandler,
  onDropHandler,
  selectedShip,
  hoverCoordinates }) => {

  const setClasses = (item) => {
    switch (item.body) {
      case '+':
        return 'disabled'
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

  return (
    <div className='board-builder-table'>
      <table>
        <tbody>
          {board.map((row, x) => (
            <tr key={x}>{row.map((col, y) => (
              <td key={col.id}>
                <div
                  className={`${setClasses(col)} ${col.dir}`}
                  onMouseOver={() => setHoverCoordinates({ x, y })}
                  onMouseOut={() => setHoverCoordinates(null)}
                  onClick={() => onClickHandler(x, y)}
                  draggable={true}
                  onDragOver={(e) => onDragOverHandler(e, x, y, selectedShip)}
                  onDragLeave={(e) => onDragLeaveHandler(e, selectedShip)}
                  onDrop={(e) => onDropHandler(e, board, selectedShip, x, y)}
                >
                  {/* {col.hasShipPart && col.hasShipImg && (<img src={`./images/ships/ship-${col.body}-${col.dir}.svg`} alt='' />)} */}
                </div>
              </td>))}
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default BuilderTable