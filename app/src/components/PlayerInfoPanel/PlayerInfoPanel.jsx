import React from 'react';
import './PlayerInfoPanel.scss';

const PlayerInfoPanel = () => {
  return (
    <div className='player-info-panel-wrapper'>
      <div className='player-info-panel__avatar-row'>
        <img src={`./images/avatars/avatar_1.jpg`} alt="" />
      </div>
      <div className='player-info-panel__username-row'><span>name</span></div>
      <div className='player-info-panel__shots-row'>total shots: <span className='shots-count'>12</span></div>
      <div className='player-info-panel__exact-shots-row'>exact-shots: <span className='exact-shots-count'>12</span></div>
      <div className='player-info-panel__points-row'>total points: <span className='points-count'>12</span></div>
      <div className='player-info-panel__sunken-ships-row'>sunken-ships: <span className='sunken-ships-count'>12</span></div>
      <div className='player-info-panel__statistics-row'>
        <div className='statistics--title'><span>statistics</span></div>
        <div className='statistics--info'>
          <div className='statistics--info-col'>
            <span>won: 0</span>
          </div>
          <div className='statistics--info-col lost'>
            <span>lost: 0</span>
          </div>
        </div>
      </div>
      <div className='player-info-panel__flag-row'>
        <img src={`./images/flags/flag_1.png`} alt="" />
      </div>
    </div>
  )
}

export default PlayerInfoPanel