import React, { useEffect, useState } from 'react'
import RandomBoardTable from '../RandomBoardTable/RandomBoardTable'
import EMPTY_BOARD from '../../constants/board';
import SHIPS from '../../constants/ships';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerBoard } from '../../store/actionCreators/playerBoard';
import { setPlayersShips } from '../../store/actionCreators/playerShips';
import randomBoard from '../../helpers/generateBoard/generateRandomBoard';
import { setBotBoard } from '../../store/actionCreators/botBoard';
import { setBotShips } from '../../store/actionCreators/botShips';
import './RandomBoardBuilder.scss';
import { getPlayerBoard, getPlayerShips } from '../../store/selectors';

const RandomBoardBuilder = () => {

  const dispatch = useDispatch();

  //Selectors
  const reduxPlayerBoard = useSelector(getPlayerBoard)
  const reduxPlayerShips = useSelector(getPlayerShips)

  // States
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(EMPTY_BOARD)));
  const [playerShips, setPlayerShips] = useState([]);
  const [ships, setShips] = useState(JSON.parse(JSON.stringify(SHIPS.sort((a, b) => a.length - b.length))));

  //Actions
  const randomBoardBuilder = () => {
    const generatedRandomBoard = randomBoard();
    setBoard(generatedRandomBoard.board);
    setPlayerShips(generatedRandomBoard.ships);
    setShips([]);
  };

  const savePlayerBoard = (board) => {
    dispatch(setPlayerBoard(JSON.parse(JSON.stringify(board))));
    dispatch(setPlayersShips(JSON.parse(JSON.stringify(playerShips))));
    const generatedBotBoard = randomBoard();
    dispatch(setBotBoard(JSON.parse(JSON.stringify(generatedBotBoard.board))));
    dispatch(setBotShips(JSON.parse(JSON.stringify(generatedBotBoard.ships))));
  };

  //Effects
  useEffect(() => {
    if (reduxPlayerBoard.length && reduxPlayerShips.length) {
      setBoard(reduxPlayerBoard);
      setPlayerShips(reduxPlayerShips);
    } else {
      randomBoardBuilder()
    }
  }, [reduxPlayerBoard, reduxPlayerShips])

  return (
    <div className="board-builder">
      <div className="builder-section">
        <div className="board-section">
          <div className="board-table-wrapper">
            <RandomBoardTable board={board} />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={randomBoardBuilder}>random board</button>
        {Boolean(playerShips.length && board.length) && (
          <button onClick={() => savePlayerBoard(board)}>ready</button>
        )}
      </div>
    </div>
  )
}

export default RandomBoardBuilder