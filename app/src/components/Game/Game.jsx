import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBotBoard } from '../../store/actionCreators/botBoard';
import { deleteBotShips } from '../../store/actionCreators/botShips';
import { deletePlayerBoard } from '../../store/actionCreators/playerBoard';
import { deletePlayerShips } from '../../store/actionCreators/playerShips';
import { getBotBoard, getBotShips, getPlayerBoard, getPlayerShips } from '../../store/selectors';
import GameBoard from '../GameBoard/GameBoard';
import './Game.scss';
import useSound from 'use-sound';
import shotSound1 from '../../assets/sounds/game/shot1.mp3'
import musicSound1 from '../../assets/sounds/game/music1.mp3'
import boomSound1 from '../../assets/sounds/game/boom1.mp3'
import getShotCoords from '../../helpers/getShotCoords/gameShotCoords';
import { ALREADY_SHOTED_MESSAGE, BOT_WIN_MESSAGE, LEVEL, PLAYER_WIN_MESSAGE } from '../../constants/constants';
import setCrashedShipOnBoard from '../../helpers/setCrashedShipOnBoard';


const Game = () => {
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const [shot1] = useSound(shotSound1);
  // const [shot2] = useSound(shotSound2);
  const [boom1] = useSound(boomSound1);
  const [playMusic1] = useSound(musicSound1, { volume: 0.2 });
  const audio = new Audio(musicSound1);
  audio.loop = true;

  const reduxPlayerBoard = useSelector(getPlayerBoard)
  const reduxBotBoard = useSelector(getBotBoard)
  const reduxPlayerShips = useSelector(getPlayerShips)
  const reduxBotShips = useSelector(getBotShips)

  const [playerBoard, setPlayerBoard] = useState([])
  const [playerShips, setPlayerShips] = useState([])
  const [botBoard, setBotBoard] = useState([])
  const [botShips, setBotShips] = useState([])
  const [playerTurn, setPlayerTurn] = useState(true)
  const [botCrashedShips, setBotCrashedShips] = useState([])
  const [playerCrashedShips, setPlayerCrashedShips] = useState([])
  const [gameOver, setGameOver] = useState(false);
  const [playerInjuredShipCoords, setPlayerInjuredShipCoords] = useState([])

  // Effects
  useEffect(() => {
    if (reduxPlayerBoard.length && reduxPlayerShips.length && reduxBotBoard.length && reduxBotShips.length) {
      setPlayerBoard(reduxPlayerBoard);
      setPlayerShips(reduxPlayerShips);
      setBotBoard(reduxBotBoard);
      setBotShips(reduxBotShips);
    }
  }, [reduxPlayerBoard, reduxPlayerShips, reduxBotBoard, reduxBotShips])

  useEffect(() => {
    if (playerCrashedShips.length === 10) {
      setGameOver(true)
      messageApi.open(BOT_WIN_MESSAGE)
    }
  }, [playerCrashedShips])

  useEffect(() => {
    if (botCrashedShips.length === 10) {
      setGameOver(true)
      messageApi.open(PLAYER_WIN_MESSAGE)
    }
  }, [botCrashedShips]);

  useEffect(() => {
    if (!playerTurn && playerBoard && !gameOver) {
      const shotCoords = getShotCoords(LEVEL, playerBoard, playerShips, playerInjuredShipCoords);
      if (!shotCoords) return console.log('gameover')
      if (Boolean(shotCoords)) {
        const { x, y } = shotCoords;
        if (!playerBoard[x][y].shoted) {
          setTimeout(() => {
            shot1()
            const newPlayerBoard = JSON.parse(JSON.stringify(playerBoard))
            newPlayerBoard[x][y].shoted = true;
            if (!newPlayerBoard[x][y].hasShipPart) {
              setPlayerTurn(true)
            } else if (Boolean(newPlayerBoard[x][y].shipId)) {
              newPlayerBoard[x][y].shipStatus = 'injured';
              setPlayerInjuredShipCoords(prev => [...prev, { x, y }])
              const newPlayerShips = playerShips.map(ship => {
                if (newPlayerBoard[x][y].shipId === ship.id) {
                  ship.shotedCount++
                  if (ship.shotedCount === ship.length) {
                    boom1()
                    ship.crashed = true;
                    setPlayerInjuredShipCoords([])
                    setCrashedShipOnBoard(ship, newPlayerBoard)
                    setPlayerCrashedShips(prev => [...prev, { ...ship }])
                  }
                }
                return ship
              })
              setPlayerShips(JSON.parse(JSON.stringify(newPlayerShips)))
            }
            setPlayerBoard(JSON.parse(JSON.stringify(newPlayerBoard)))
          }, 1000);
        } else {
          alert('player turn')
          setPlayerTurn(true)
        }
      } else {
        alert('something went wrong');
      }
    }
  }, [playerTurn, playerBoard])

  const shotHandler = (x, y, isPlayerBoard, shipId) => {
    if (!isPlayerBoard && playerTurn && !gameOver) {
      const newBotBoard = JSON.parse(JSON.stringify(botBoard))
      if (newBotBoard[x][y].shoted) return messageApi.open(ALREADY_SHOTED_MESSAGE)
      shot1()
      newBotBoard[x][y].shoted = true
      if (!newBotBoard[x][y].hasShipPart) {
        setPlayerTurn(false)
      }
      if (Boolean(shipId)) {
        newBotBoard[x][y].shipStatus = 'injured';
        const newBotShips = botShips.map(ship => {
          if (shipId === ship.id) {
            ship.shotedCount++
            if (ship.shotedCount === ship.length) {
              boom1()
              ship.crashed = true
              setCrashedShipOnBoard(ship, newBotBoard)
              setBotCrashedShips(prev => [...prev, { ...ship }])
            }
          }
          return ship
        })
        setBotShips(JSON.parse(JSON.stringify(newBotShips)))
      }
      setBotBoard(JSON.parse(JSON.stringify(newBotBoard)))
    }
  }

  return (
    <div className='game_container'>
      <h2 style={{ color: 'white' }}>{playerCrashedShips.length}</h2>
      <h2 style={{ color: 'white' }}>{botCrashedShips.length}</h2>
      {contextHolder}
      <button onClick={() => { dispatch(deletePlayerBoard()); dispatch(deleteBotBoard()); dispatch(deleteBotShips()); dispatch(deletePlayerShips()) }}>delete</button>
      <div className='game_container__game'>
        <GameBoard
          board={playerBoard}
          isPlayerBoard={true}
          onClick={shotHandler}
          playerTurn={playerTurn}
          gameOver={gameOver}
        />
        <div>
          {playerTurn ? '-->' : '<--'}
        </div>
        <GameBoard
          board={botBoard}
          isPlayerBoard={false}
          onClick={shotHandler}
          playerTurn={playerTurn}
          gameOver={gameOver}
        />
      </div>
    </div>
  )
}

export default Game