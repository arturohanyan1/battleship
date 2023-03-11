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

const LEVELS = ['level1', 'level2', 'level3', 'level4']
const LEVEL = 'level3'

const Game = () => {
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage();

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
  const [playerShipsCoords, setPlayerShipsCoords] = useState([]);
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

  // for level4 level
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

  // for level3 level
  const getAllCoordsForPlayerInjuredShips = (board, ships, coords) => {
    const { x, y } = coords[0];
    const { shipId } = board[x][y];
    const targetedShipCoords = ships.filter(ship => shipId == ship.id)[0].shipCoords;
    const availablePlacesForShot = targetedShipCoords.filter(coord => !board[coord.x][coord.y].shoted);
    if (availablePlacesForShot.length) {
      const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
      console.log('availablePlacesForShot[randomPlace]', availablePlacesForShot[randomPlace])
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
      return getAllCoordsForPlayerInjuredShips(board, ships, coords)
    } else if (level === 'level4') {
      return handlePlayerAllShipsCoords(board)
    } else {
      return handleAvailablePlacesForShot(board)
    }
  }



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
      messageApi.open(botWinMessage)
    }
  }, [playerCrashedShips])

  useEffect(() => {
    if (botCrashedShips.length === 10) {
      messageApi.open(playerWinMessage)
    }
  }, [botCrashedShips])

  useEffect(() => {
    if (!playerTurn && playerBoard) {
      const shotCoords = getShotCoords(LEVEL, playerBoard, playerShips, playerInjuredShipCoords);
      console.log('shotCoords', shotCoords)
      // const shotCoords = LEVEL === 'level4' ? handlePlayerAllShipsCoords(playerBoard) : (LEVEL === 'level2' && playerInjuredShipCoords.length) ? getCoordsForPlayerInjuredShips(playerBoard, playerInjuredShipCoords) : handleAvailablePlacesForShot(playerBoard);
      // if (!shotCoords) return alert('gameover')
      const { x, y } = shotCoords;
      if (!playerBoard[x][y].shoted) {
        setTimeout(() => {
          // alert(5)
          const newPlayerBoard = JSON.parse(JSON.stringify(playerBoard))
          newPlayerBoard[x][y].shoted = true;
          if (!newPlayerBoard[x][y].hasShipPart) {
            setPlayerTurn(true)
          } else if (Boolean(newPlayerBoard[x][y].shipId)) {
            newPlayerBoard[x][y].shipStatus = 'injured';
            setPlayerInjuredShipCoords(prev => [...prev, { x, y }])
            const newPlayerShips = playerShips.map(ship => {
              if (newPlayerBoard[x][y].shipId === ship.id) {
                // ship.shotedCount++
                if (ship.shotedCount + 1 === ship.length) {
                  // alert('crash')
                  ship.crashed = true
                  // setPlayerCrashedShip({ ...ship })
                  setPlayerInjuredShipCoords([])
                  handleCrashedBoard(ship, newPlayerBoard)
                  setPlayerCrashedShips(prev => [...prev, { ...ship }])
                } else {
                  ship.shotedCount++
                }
              }
              return ship
            })
            setPlayerShips(JSON.parse(JSON.stringify(newPlayerShips)))
          }
          setPlayerBoard(JSON.parse(JSON.stringify(newPlayerBoard)))
        }, 500);
      } else {
        alert('player turn')
        setPlayerTurn(true)
      }
    }
  }, [playerTurn, playerBoard])



  const shotHandler = (x, y, isPlayerBoard, shipId) => {
    if (isPlayerBoard && !playerTurn) {
      // const newPlayerBoard = JSON.parse(JSON.stringify(playerBoard))
      // if (newPlayerBoard[x][y].shoted) return messageApi.open(alreadyShotedMessage)
      // newPlayerBoard[x][y].shoted = true;
      // if (!newPlayerBoard[x][y].hasShipPart) {
      //   setPlayerTurn(true)
      // }
      // if (Boolean(shipId)) {
      //   newPlayerBoard[x][y].shipStatus = 'injured';
      //   const newPlayerShips = playerShips.map(ship => {
      //     if (shipId === ship.id) {
      //       // ship.shotedCount++
      //       alert(4)
      //       if (ship.shotedCount + 1 === ship.length) {
      //         alert(1)
      //         ship.crashed = true
      //         // setPlayerCrashedShip(ship)
      //         handleCrashedBoard(ship, newPlayerBoard)
      //       } else {
      //         ship.shotedCount++
      //       }
      //     }
      //     return ship
      //   })
      //   setPlayerShips(JSON.parse(JSON.stringify(newPlayerShips)))
      // }
      // setPlayerBoard(JSON.parse(JSON.stringify(newPlayerBoard)))
    } else if (!isPlayerBoard && playerTurn) {
      const newBotBoard = JSON.parse(JSON.stringify(botBoard))
      if (newBotBoard[x][y].shoted) return messageApi.open(alreadyShotedMessage)
      newBotBoard[x][y].shoted = true
      if (!newBotBoard[x][y].hasShipPart) {
        setPlayerTurn(false)
      }
      if (Boolean(shipId)) {
        newBotBoard[x][y].shipStatus = 'injured';
        const newBotShips = botShips.map(ship => {
          if (shipId === ship.id) {
            // ship.shotedCount++
            if (ship.shotedCount + 1 === ship.length) {
              ship.crashed = true
              // setBotCrashedShip(ship)
              handleCrashedBoard(ship, newBotBoard)
              setBotCrashedShips(prev => [...prev, { ...ship }])
            } else {
              ship.shotedCount++
            }
          }
          return ship
        })
        setBotShips(JSON.parse(JSON.stringify(newBotShips)))
      }
      setBotBoard(JSON.parse(JSON.stringify(newBotBoard)))
    }
  }

  // console.log(111)

  return (
    <div className='game_container'>
      {/* <h2>{JSON.stringify(availablePlacesForShot)}</h2> */}
      {/* <h2>{JSON.stringify(playerInjuredShipCoords)}</h2> */}
      {/* <h2>{availablePlacesForShot.length}</h2> */}
      <h2>{playerCrashedShips.length}</h2>
      <h2>{botCrashedShips.length}</h2>
      {contextHolder}
      {/* <div className='game_container__header'>Game --- {playerName}</div> */}
      <button onClick={() => { dispatch(deletePlayerBoard()); dispatch(deleteBotBoard()); dispatch(deleteBotShips()); dispatch(deletePlayerShips()) }}>delete</button>
      <div className='game_container__game'>
        <GameBoard
          board={playerBoard}
          isPlayerBoard={true}
          onClick={shotHandler}
          playerTurn={playerTurn}
        />
        <div>
          {playerTurn ? '-->' : '<--'}
        </div>
        <GameBoard
          board={botBoard}
          isPlayerBoard={false}
          onClick={shotHandler}
          playerTurn={playerTurn}
        />
      </div>
    </div>

  )
}

export default Game