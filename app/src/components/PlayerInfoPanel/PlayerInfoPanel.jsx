import React from "react";
import "./PlayerInfoPanel.scss";
import FleetStatus from "../commons/FleetStatus/FleetStatus";

const PlayerInfoPanel = ({ infoData }) => {
  if (!infoData) return null;

  return (
    <div className="player-info-panel-wrapper">
      <div className="player-info-panel__avatar-row">
        <img src={`./images/avatars/${infoData.avatar}.jpg`} alt="" />
      </div>
      <div className="player-info-panel__username-row">
        <span>{infoData.username}</span>
      </div>
      <div className="player-info-panel__fleet-row">
        <FleetStatus data={infoData.crashedShips} />
      </div>
      <div className="player-info-panel__statistics-row">
        <div className="statistics--title">
          <span>statistics</span>
        </div>
        <div className="statistics--info">
          <div className="statistics--info-col">
            <span>won: {infoData.won}</span>
          </div>
          <div className="statistics--info-col lost">
            <span>lost: {infoData.lost}</span>
          </div>
        </div>
      </div>
      <div className="player-info-panel__flag-row">
        <img src={`./images/flags/${infoData.flag}.png`} alt="" />
      </div>
    </div>
  );
};

export default PlayerInfoPanel;
