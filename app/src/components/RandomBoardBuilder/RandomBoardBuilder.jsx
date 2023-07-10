import React, { useEffect, useState } from 'react'
import RandomBoardTable from '../RandomBoardTable/RandomBoardTable'
import EMPTY_BOARD from '../../constants/board';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerBoard, setPlayerSavedBoard } from '../../store/actionCreators/playerBoard';
import { setPlayerSavedShips, setPlayersShips } from '../../store/actionCreators/playerShips';
import randomBoard from '../../helpers/generateBoard/generateRandomBoard';
import { setBotBoard } from '../../store/actionCreators/botBoard';
import { setBotShips } from '../../store/actionCreators/botShips';
import './RandomBoardBuilder.scss';
import { getPlayerSavedBoard, getPlayerSavedShips } from '../../store/selectors';
import { ReactSVG } from 'react-svg';

const RandomBoardBuilder = () => {

  const dispatch = useDispatch();

  //Selectors
  const savedPlayerBoard = useSelector(getPlayerSavedBoard)
  const savedPlayerShips = useSelector(getPlayerSavedShips)

  // States
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(EMPTY_BOARD)));
  const [playerShips, setPlayerShips] = useState([]);

  //Actions
  const randomBoardBuilder = () => {
    const generatedRandomBoard = randomBoard();
    setBoard(generatedRandomBoard.board);
    setPlayerShips(generatedRandomBoard.ships);
  };

  const savePlayerBoard = (board) => {
    dispatch(setPlayerBoard(JSON.parse(JSON.stringify(board))));
    dispatch(setPlayersShips(JSON.parse(JSON.stringify(playerShips))));
    dispatch(setPlayerSavedBoard(JSON.parse(JSON.stringify(board))));
    dispatch(setPlayerSavedShips(JSON.parse(JSON.stringify(playerShips))));
    const generatedBotBoard = randomBoard();
    dispatch(setBotBoard(JSON.parse(JSON.stringify(generatedBotBoard.board))));
    dispatch(setBotShips(JSON.parse(JSON.stringify(generatedBotBoard.ships))));
  };

  //Effects
  useEffect(() => {
    if (savedPlayerBoard.length && savedPlayerShips.length) {
      setBoard(savedPlayerBoard);
      setPlayerShips(savedPlayerShips);
    } else {
      randomBoardBuilder()
    }
  }, [savedPlayerBoard, savedPlayerShips])

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
          <button className="random_board-button" onClick={() => savePlayerBoard(board)}>
            <ReactSVG src="./images/icons/play.svg" className="button_icon" />
          </button>
        )}
      </div>
    </div>
  )
}

export default RandomBoardBuilder