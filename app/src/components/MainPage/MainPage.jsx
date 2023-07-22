import React from "react";
import { useDispatch } from "react-redux";
import { openDialog } from "../../store/actionCreators/dialodManager";
import Button from "../commons/Button/Button";
import './MainPage.scss';
import config from "../../configs/config";
import { useNavigate } from "react-router";

const MainPage = () => {
  // Hooks
  const navigate = useNavigate()
  const dispatch = useDispatch();

  // Actions
  const handlePlay = (mode) => {
    if (mode === "computer") {
      config.allowPlayerBuildBoard ? navigate('/board-builder') : dispatch(openDialog("RandomBoardBuilderDialog"));
    } else if (mode === "player") {
      config.allowPlayerBuildBoard ? alert("comming soon") : alert("comming soon");
    }
  };

  return (
    <div className="main_page">
      <div className="main_page--buttons">
        <Button icon={'computer'} name={'play vs computer'} onClick={() => handlePlay("computer")} />
        <Button icon={'friends'} name={'play vs friends'} onClick={() => handlePlay("player")} />
      </div>
    </div>
  );
};

export default MainPage;
