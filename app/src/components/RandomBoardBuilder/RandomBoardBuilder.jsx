import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import RandomBoardTable from "../RandomBoardTable/RandomBoardTable";
import EMPTY_BOARD from "../../constants/board";
import {
  setPlayerBoard,
  setPlayerSavedBoard,
} from "../../store/actionCreators/playerBoard";
import {
  setPlayerSavedShips,
  setPlayersShips,
} from "../../store/actionCreators/playerShips";
import randomBoard from "../../helpers/generateBoard/generateRandomBoard";
import { setBotBoard } from "../../store/actionCreators/botBoard";
import { setBotShips } from "../../store/actionCreators/botShips";
import "./RandomBoardBuilder.scss";
import {
  getPlayerSavedBoard,
  getPlayerSavedShips,
} from "../../store/selectors";
import { ReactSVG } from "react-svg";
import { closeDialog } from "../../store/actionCreators/dialodManager";
import parseObj from "../../helpers/parseObj";
import { message } from "antd";

const RandomBoardBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Selectors
  const savedPlayerBoard = useSelector(getPlayerSavedBoard);
  const savedPlayerShips = useSelector(getPlayerSavedShips);

  // States
  const [board, setBoard] = useState(parseObj(EMPTY_BOARD));
  const [playerShips, setPlayerShips] = useState([]);

  //Actions
  const randomBoardBuilder = () => {
    const generatedRandomBoard = randomBoard();
    setBoard(generatedRandomBoard.board);
    setPlayerShips(generatedRandomBoard.ships);
  };

  const savePlayerBoard = (playerBoard, playerShips) => {
    dispatch(setPlayerSavedBoard(parseObj(playerBoard)));
    dispatch(setPlayerSavedShips(parseObj(playerShips)));
    message.info('Saved');
  }

  const setPlayerBoardHandler = (playerBoard, playerShips) => {
    dispatch(setPlayerBoard(parseObj(playerBoard)));
    dispatch(setPlayersShips(parseObj(playerShips)));
  }

  const setBotBoardHandler = () => {
    const generatedBotBoard = randomBoard();
    dispatch(setBotBoard(parseObj(generatedBotBoard.board)));
    dispatch(setBotShips(parseObj(generatedBotBoard.ships)));
  }

  const playGame = (board, ships) => {
    setPlayerBoardHandler(board, ships);
    setBotBoardHandler();
    // Must be checked
    if (!savedPlayerBoard.length && !savedPlayerShips.length) {
      savePlayerBoard(board, ships);
    }
    dispatch(closeDialog("RandomBoardBuilderDialog"));
    navigate('/game');
  };

  //Effects
  useEffect(() => {
    if (savedPlayerBoard.length && savedPlayerShips.length) {
      setBoard(savedPlayerBoard);
      setPlayerShips(savedPlayerShips);
    } else {
      randomBoardBuilder();
    }
  }, [savedPlayerBoard, savedPlayerShips]);

  return (
    <div className="random_board-builder">
      <div className="random_board-builder-section">
        <div className="random_board-section">
          <div className="random_board-table-wrapper">
            <RandomBoardTable board={board} />
          </div>
        </div>
      </div>
      <div className="random_board-buttons">
        <button className="random_board-button" onClick={randomBoardBuilder}>
          <ReactSVG src="./images/icons/refresh.svg" className="button_icon" />
        </button>
        {Boolean(playerShips.length && board.length) && (
          <>
            <button
              className="random_board-button"
              onClick={() => playGame(board, playerShips)}
            >
              <ReactSVG src="./images/icons/play.svg" className="button_icon" />
            </button>
            <button
              className="random_board-button"
              onClick={() => savePlayerBoard(board, playerShips)}
            >
              <ReactSVG src="./images/icons/save.svg" className="button_icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RandomBoardBuilder;
