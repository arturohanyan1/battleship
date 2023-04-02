import React from 'react';
import './PlayerInfoPanel.scss';

const PlayerInfoPanel = ({ infoData }) => {
  console.log('infoData', infoData)
  if (!infoData) return null;
  return (
    <div className='player-info-panel-wrapper'>
      <div className='player-info-panel__avatar-row'>
        <img src={`./images/avatars/${infoData.avatar}.jpg`} alt="" />
      </div>
      <div className='player-info-panel__username-row'><span>{infoData.username}</span></div>
      <div className='player-info-panel__shots-row'>total shots: <span className='shots-count'>{infoData.totalShots}</span></div>
      <div className='player-info-panel__exact-shots-row'>exact-shots: <span className='exact-shots-count'>{infoData.exactShots}</span></div>
      <div className='player-info-panel__points-row'>total points: <span className='points-count'>{infoData.points}</span></div>
      <div className='player-info-panel__sunken-ships-row'>sunken-ships: <span className='sunken-ships-count'>{infoData.sunkenShips}</span></div>
      <div className='player-info-panel__statistics-row'>
        <div className='statistics--title'><span>statistics</span></div>
        <div className='statistics--info'>
          <div className='statistics--info-col'>
            <span>won: {infoData.won}</span>
          </div>
          <div className='statistics--info-col lost'>
            <span>lost: {infoData.lost}</span>
          </div>
        </div>
      </div>
      <div className='player-info-panel__flag-row'>
        <img src={`./images/flags/${infoData.flag}.png`} alt="" />
      </div>
    </div>
  )
}

export default PlayerInfoPanel