import React from "react";
import { Route, Routes } from "react-router";
import MainPage from "../MainPage/MainPage";
import Game from "../Game/Game";
import BoardBuilder from "../BoardBuilder/BoardBuilder";
import { getPlayer } from "../../store/selectors";
import { useSelector } from "react-redux";
import Login from "../Login/Login";

const Routing = () => {
  // Selectors
  const player = useSelector(getPlayer);

  return (
    <Routes>
      {player.username ? (
        <>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/board-builder"} element={<BoardBuilder />} />
          <Route path="/game" element={<Game />} />
        </>
      ) : (
        <Route path={"/"} element={<Login />} />
      )}
    </Routes>
  );
};

export default Routing;
