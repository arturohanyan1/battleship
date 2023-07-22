import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../store/actionCreators/dialodManager";
import { setPlayer } from "../../store/actionCreators/player";
import { getMusic, getPlayer } from "../../store/selectors";
import Dialogs from "../Dialogs";
import NavBar from "../NavBar/NavBar";
import musicSound1 from "../../assets/sounds/game/music1.mp3";
import useSound from "use-sound";
import Routing from "../Routing/Routing";

const MainLayout = () => {
  const dispatch = useDispatch();

  const player = useSelector(getPlayer);
  const music = useSelector(getMusic);

  const [playMusic1, { stop, }] = useSound(musicSound1, { volume: 0.2, loop: true });

  useEffect(() => {
    music ? playMusic1() : stop();
  }, [music]);

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
      <Routing />
    </div>
  );
};

export default MainLayout;
