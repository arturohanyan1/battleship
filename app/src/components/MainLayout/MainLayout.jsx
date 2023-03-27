import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../store/actionCreators/dialodManager";
import { setPlayer } from "../../store/actionCreators/player";
import { getMusic, getPlayer, getPlayerBoard } from "../../store/selectors";
import BoardBuilder from "../BoardBuilder/BoardBuilder";
import Dialogs from "../Dialogs";
import Game from "../Game/Game";
import NavBar from "../NavBar/NavBar";
import musicSound1 from "../../assets/sounds/game/music1.mp3";

const MainLayout = () => {
  const dispatch = useDispatch();
  const audio = new Audio(musicSound1);
  audio.loop = true;

  const playerBoard = useSelector(getPlayerBoard);
  const player = useSelector(getPlayer);
  const music = useSelector(getMusic);

  useEffect(() => {
    music ? audio.play() : audio.pause();
  }, [audio, music]);

  useEffect(() => {
    if (player.playerName) {
      localStorage.setItem("player", JSON.stringify(player));
    } else {
      if (Boolean(localStorage.getItem("player"))) {
        dispatch(setPlayer(JSON.parse(localStorage.getItem("player"))));
      } else {
        dispatch(openDialog("UserProfileDialog"));
      }
    }
  }, [player]);
  return (
    <div>
      <NavBar />
      <Dialogs />
      {player.playerName ? (
        playerBoard.length ? (
          <Game />
        ) : (
          <BoardBuilder />
        )
      ) : null}
    </div>
  );
};

export default MainLayout;
