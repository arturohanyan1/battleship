import React from "react";
import { useSelector } from "react-redux";
import { getDialogs } from "../../store/selectors";
import AvatarsDialog from "./AvatarsDialog/AvatarsDialog";
import FlagsDialog from "./FlagsDialog/FlagsDialog";
import SettingsDialog from "./SettingsDialog/SettingsDialog";
import UserProfileDialog from "./UserProfileDialog/UserProfileDialog";
import RandomBoardBuilderDialog from "./RandomBoardBuilderDialog/RandomBoardBuilderDialog";
import GameOverDialog from "./GameOverDialog/GameOverDialog";
import LogOutDialog from "./LogOutDialog/LogOutDialog";
import CloseGameDialog from "./CloseGameDialog/CloseGameDialog";
import ComingSoonDialog from "./ComingSoonDialog/ComingSoonDialog";

const Dialogs = () => {
  // Selectors
  const dialogs = useSelector(getDialogs);

  return (
    <>
      {!Object.keys(dialogs).length && null}
      {dialogs?.UserProfileDialog && <UserProfileDialog />}
      {dialogs?.AvatarsDialog && <AvatarsDialog />}
      {dialogs?.FlagsDialog && <FlagsDialog />}
      {dialogs?.SettingsDialog && <SettingsDialog />}
      {dialogs?.RandomBoardBuilderDialog && <RandomBoardBuilderDialog />}
      {dialogs?.ComingSoonDialog && <ComingSoonDialog />}
      {dialogs?.GameOverDialog && <GameOverDialog data={dialogs.GameOverDialog.data} />}
      {dialogs?.LogOutDialog && <LogOutDialog />}
      {dialogs?.CloseGameDialog && <CloseGameDialog />}
    </>
  );
};

export default Dialogs;
