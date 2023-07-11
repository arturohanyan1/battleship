import React from "react";
import { useDispatch } from "react-redux";
import { openDialog } from "../../store/actionCreators/dialodManager";

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
    <div>
      <button onClick={() => handlePlay("computer")}>play vs computer</button>
      <button onClick={() => handlePlay("player")}>play vs friend</button>
    </div>
  );
};

export default MainPage;
