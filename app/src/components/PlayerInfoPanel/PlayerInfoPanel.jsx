import React from "react";
import "./PlayerInfoPanel.scss";
import FleetStatus from "../commons/FleetStatus/FleetStatus";
import Statistics from "../commons/Statistics/Statistics";

const PlayerInfoPanel = ({ infoData, reverse }) => {
  if (!infoData) return null;

  return (
    <div className={`player-info-panel-wrapper ${reverse ? "player-info-panel-wrapper--reverse" : ''}`}>
      <div className="player_name_info">
        <div className="player-info-panel__avatar-row">
          <img src={`./images/avatars/${infoData.avatar}.jpg`} alt="avatar" />
        </div>
        <div className="player-info-panel__username-row">
          <span>{infoData.username}</span>
        </div>
      </div>
      <div className="player-info-panel__fleet-row">
        <FleetStatus data={infoData.crashedShips} />
      </div>
      <div className="player-info-panel__statistics-row">
        <Statistics data={infoData} />
      </div>
      <div className="player-info-panel__flag-row">
        <img src={`./images/flags/${infoData.flag}.png`} alt="" />
      </div>
    </div>
  );
};

export default PlayerInfoPanel;
