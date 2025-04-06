import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openDialog } from "../../store/actionCreators/dialodManager";
import Button from "../commons/Button/Button";
import './MainPage.scss';
import config from "../../configs/config";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), 50); // delay to avoid flash
    return () => clearTimeout(timeout);
  }, []);

  const handlePlay = (mode) => {
    if (mode === "bot") {
      config.allowPlayerBuildBoard
        ? navigate('/board-builder')
        : dispatch(openDialog("RandomBoardBuilderDialog"));
    } else if (mode === "player") {
      config.allowPlayerBuildBoard
        ? dispatch(openDialog("ComingSoonDialog"))
        : dispatch(openDialog("ComingSoonDialog"));
    }
  };

  return (
    <div className="main_page">
      <div className="main_page--buttons">
        <Button
          className={`bot-button ${animated ? "animated" : ""}`}
          name="play vs bot"
          onClick={() => handlePlay("bot")}
        />
        <Button
          className={`player-button ${animated ? "animated" : ""}`}
          name="play vs friends"
          onClick={() => handlePlay("player")}
        />
      </div>
    </div>
  );
};

export default MainPage;
