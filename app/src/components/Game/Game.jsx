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

const alreadyShotedMessage = {
  type: 'info',
  content: 'already shoted',
  duration: 2,
}

const playerWinMessage = {
  type: 'success',
  content: 'Player Win! Game Over!'
}

const botWinMessage = {
  type: 'success',
  content: 'Bot Win! Game Over!'
}

const LEVELS = ['level1', 'level2', 'level3', 'level4', 'level5']
const LEVEL = 'level4'

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
  const [availablePlacesForShot, setAvailablePlacesForShot] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playerInjuredShipCoords, setPlayerInjuredShipCoords] = useState([])

  const handleCrashedBoard = (crashedShip, board) => {
    for (let i = 0; i < crashedShip.shipCoords.length; i++) {
      const { x, y } = crashedShip.shipCoords[i]
      board[x][y].shipStatus = 'crashed';
    }
    for (let i = 0; i < crashedShip.shipDisabledCoords.length; i++) {
      const { x, y } = crashedShip.shipDisabledCoords[i]
      if (!board[x][y].shoted) board[x][y].shipStatus = 'disabled';
    }
    return board
  }

  // for level1 level
  const handleAvailablePlacesForShot = (board) => {
    const availablePlacesForShot = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j].shipStatus && !board[i][j].shoted) {
          availablePlacesForShot.push({ x: i, y: j })
        }
      }
    }
    if (availablePlacesForShot.length) {
      const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
      return availablePlacesForShot[randomPlace];
    }
    return null
  }




  // for level2 level
  const getCoordsForPlayerInjuredShips = (board, coords) => {
    const { x, y } = coords[0];
    const coordsLength = coords.length;
    const availablePlacesForShot = [];
    if (coordsLength === 1) {
      if (y + 1 <= 9) if (!board[x][y + 1].shoted) availablePlacesForShot.push({ x: x, y: y + 1 })
      if (y - 1 >= 0) if (!board[x][y - 1].shoted) availablePlacesForShot.push({ x: x, y: y - 1 })
      if (x + 1 <= 9) if (!board[x + 1][y].shoted) availablePlacesForShot.push({ x: x + 1, y: y })
      if (x - 1 >= 0) if (!board[x - 1][y].shoted) availablePlacesForShot.push({ x: x - 1, y: y })
    } else {
      if (coords.every(el => el.x === x)) {
        coords.sort((a, b) => a.y - b.y);
        const minY = coords[0].y;
        const maxY = coords[coordsLength - 1].y;
        if (minY - 1 >= 0) if (!board[x][minY - 1].shoted) availablePlacesForShot.push({ x: x, y: minY - 1 })
        if (maxY + 1 <= 9) if (!board[x][maxY + 1].shoted) availablePlacesForShot.push({ x: x, y: maxY + 1 })
      } else if (coords.every(el => el.y === y)) {
        coords.sort((a, b) => a.x - b.x);
        const minX = coords[0].x;
        const maxX = coords[coordsLength - 1].x;
        if (minX - 1 >= 0) if (!board[minX - 1][y].shoted) availablePlacesForShot.push({ x: minX - 1, y: y })
        if (maxX + 1 <= 9) if (!board[maxX + 1][y].shoted) availablePlacesForShot.push({ x: maxX + 1, y: y })
      }
    }
    if (availablePlacesForShot.length) {
      const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
      return availablePlacesForShot[randomPlace]
    } else {
      return null
    }
  }

  //for level3
  const getAllCoordsForPlayerInjuredShips1 = (board, ships, coords) => {
    const { x, y } = coords[0];
    const { shipId } = board[x][y];
    let availablePlacesForShot = [];
    if (coords.length === 1) {
      if (y + 1 <= 9) if (!board[x][y + 1].shoted) availablePlacesForShot.push({ x: x, y: y + 1 })
      if (y - 1 >= 0) if (!board[x][y - 1].shoted) availablePlacesForShot.push({ x: x, y: y - 1 })
      if (x + 1 <= 9) if (!board[x + 1][y].shoted) availablePlacesForShot.push({ x: x + 1, y: y })
      if (x - 1 >= 0) if (!board[x - 1][y].shoted) availablePlacesForShot.push({ x: x - 1, y: y })
    } else {
      const targetedShipCoords = ships.filter(ship => shipId == ship.id)[0].shipCoords;
      availablePlacesForShot = targetedShipCoords.filter(coord => !board[coord.x][coord.y].shoted);
    }
    if (availablePlacesForShot.length) {
      const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
      return availablePlacesForShot[randomPlace]
    } else {
      return null
    }
  }

  // for level4 level
  const getAllCoordsForPlayerInjuredShips = (board, ships, coords) => {
    const { x, y } = coords[0];
    const { shipId } = board[x][y];
    const targetedShipCoords = ships.filter(ship => shipId == ship.id)[0].shipCoords;
    const availablePlacesForShot = targetedShipCoords.filter(coord => !board[coord.x][coord.y].shoted);
    if (availablePlacesForShot.length) {
      const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
      return availablePlacesForShot[randomPlace]
    } else {
      return null
    }
  }

  // for level5 level
  const handlePlayerAllShipsCoords = (board) => {
    const availablePlacesForShot = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].hasShipPart && !board[i][j].shoted) {
          availablePlacesForShot.push({ x: i, y: j })
        }
      }
    }
    if (availablePlacesForShot.length) {
      const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
      return availablePlacesForShot[randomPlace]
    } else {
      return null
    }
  }

  // get coords for shot
  const getShotCoords = (level, board, ships, coords) => {
    if (level === 'level1') {
      return handleAvailablePlacesForShot(board)
    } else if (level === 'level2' && coords.length) {
      return getCoordsForPlayerInjuredShips(board, coords)
    } else if (level === 'level3' && coords.length) {
      return getAllCoordsForPlayerInjuredShips1(board, ships, coords)
    } else if (level === 'level4' && coords.length) {
      return getAllCoordsForPlayerInjuredShips(board, ships, coords)
    } else if (level === 'level5') {
      return handlePlayerAllShipsCoords(board)
    } else {
      return handleAvailablePlacesForShot(board)
    }
  }


  useEffect (() => {
    console.log(888)
    // playMusic1()
    audio.play()
  }, [reduxPlayerBoard])


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
      messageApi.open(botWinMessage)
    }
  }, [playerCrashedShips])

  useEffect(() => {
    if (botCrashedShips.length === 10) {
      setGameOver(true)
      messageApi.open(playerWinMessage)
    }
  }, [botCrashedShips]);

  useEffect(() => {
    if (!playerTurn && playerBoard && !gameOver) {
      const shotCoords = getShotCoords(LEVEL, playerBoard, playerShips, playerInjuredShipCoords);
      // console.log('shotCoords', shotCoords)
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
                    handleCrashedBoard(ship, newPlayerBoard)
                    setPlayerCrashedShips(prev => [...prev, { ...ship }])
                    // } else {
                    //   ship.shotedCount++
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
      if (newBotBoard[x][y].shoted) return messageApi.open(alreadyShotedMessage)
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
              // ship.shotedCount++
              handleCrashedBoard(ship, newBotBoard)
              setBotCrashedShips(prev => [...prev, { ...ship }])
              // } else {
              //   ship.shotedCount++
            }
          }
          return ship
        })
        setBotShips(JSON.parse(JSON.stringify(newBotShips)))
      }
      setBotBoard(JSON.parse(JSON.stringify(newBotBoard)))
    }
  }

  // useEffect(() => {
  //   console.log(55555555555)
  //   playMusic1()
  // }, [])

  // console.log(botCrashedShips)

  return (
    <div className='game_container'>
      {/* <h2>{JSON.stringify(availablePlacesForShot)}</h2> */}
      {/* <h2>{JSON.stringify(playerInjuredShipCoords)}</h2> */}
      {/* <h2>{availablePlacesForShot.length}</h2> */}
      {/* <h2>{JSON.parse(JSON.stringify(botCrashedShips[0], null, 2))}</h2> */}
      <h2 style={{ color: 'white' }}>{playerCrashedShips.length}</h2>
      <h2 style={{ color: 'white' }}>{botCrashedShips.length}</h2>
      {contextHolder}
      {/* <div className='game_container__header'>Game --- {playerName}</div> */}
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