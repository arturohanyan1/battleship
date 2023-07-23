import React from 'react';
import './Statistics.scss';

const Statistics = ({ data }) => {
  return (
    <div className="statistics-wrapper">
      <div className="statistics--title">
        <span>statistics</span>
      </div>
      <div className="statistics--info">
        <div className="statistics--info-col">
          <span>won: {data.won}</span>
        </div>
        <div className="statistics--info-col lost">
          <span>lost: {data.lost}</span>
        </div>
      </div>
    </div>
  )
}

export default Statistics