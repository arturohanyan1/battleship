import React from 'react';
import './BuilderShips.scss';
import { ReactSVG } from 'react-svg'

const BuilderShips = ({ ships, setShips, onDragEndHandler, selectedShip, onDragStartHandler }) => {
  const rotateShip = (id) => {
    const rotatedShip = ships.map(el => el.id === id ? el.dir === 'x' ? { ...el, dir: 'y' } : { ...el, dir: 'x' } : { ...el })
    setShips(rotatedShip)
  }
  return (
    <div className='builder-ships-container'>
      <div className='ships'>
        {ships.map(el => (
          <ReactSVG
            key={el.id}
            className={`ship ship${el.shipName} ${selectedShip.id === el.id && 'selected'} dir-${el.dir}`}
            onClick={() => rotateShip(el.id)}
            draggable={true}
            onDragEnd={(e) => onDragEndHandler(e)}
            onDragStart={(e) => onDragStartHandler(e, el)}
            src={`./images/ships/ship-${el.shipName}-${el.dir}.svg`}
            alt=''
            fill='red'
          />

        ))}
      </div>
    </div>
  )
}

export default BuilderShips