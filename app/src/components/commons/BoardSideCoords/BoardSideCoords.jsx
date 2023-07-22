import React from 'react';
import classNames from "classnames";
import './BoardSideCoords.scss';

const BoardSideCoords = ({ info, horizontal, vertical, game, builder }) => {

  if (!info) return null;

  // Actions
  const boardSideCoordsClasses = classNames('coords-info-wrapper', {
    'horizontal': horizontal,
    'vertical': vertical,
    'game': game,
    'builder': builder
  })

  return (
    <div className={boardSideCoordsClasses} >
      {info.map(el => <div key={el} className='coords-info-item'>{el}</div>)}
    </div>
  )
}

export default BoardSideCoords