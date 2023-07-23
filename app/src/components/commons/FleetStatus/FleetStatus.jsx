import React, { useCallback } from 'react'
import './FleetStatus.scss';
import { FLEET_STATUS_SHIPS } from '../../../constants/constants';

const FleetStatus = ({ data }) => {

  // Actions
  const crashedShips = useCallback((data, item) => {
    return data.filter(el => el.length === item.length).length
  }, [data.length])

  return (
    <div className='fleet-status-wrapper'>
      <div className='fleet-status--title'>Fleet</div>
      <div className='fleet-status'>
        {FLEET_STATUS_SHIPS.map(item => (
          <div key={item.length} className={`fleet-ship-item ${crashedShips(data, item) === item.count && 'crashed'}`}>
            <div className='fleet-ship'>
              {Array.from({ length: item.length }).map((el, idx) => (<div key={idx} className='fleet-ship-square'></div>))}
            </div>
            <div className='fleet-ship-status'>{crashedShips(data, item)}/{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FleetStatus