import React from "react";
import { useDispatch } from "react-redux";
import { openDialog } from "../../store/actionCreators/dialodManager";
import Button from "../commons/Button/Button";
import './MainPage.scss';

const MainPage = () => {
  const dispatch = useDispatch();

  const handlePlay = (mode) => {
    if (mode === "computer") {
      dispatch(openDialog("RandomBoardBuilderDialog"));
    } else if (mode === "player") {
      alert("comming soon");
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
