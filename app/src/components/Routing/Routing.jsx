import React from "react";
import { Route, Routes } from "react-router";
import MainPage from "../MainPage/MainPage";
import Game from "../Game/Game";
import BoardBuilder from "../BoardBuilder/BoardBuilder";

const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/board-builder"} element={<BoardBuilder />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default Routing;
