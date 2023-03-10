import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBotBoard } from '../../store/actionCreators/botBoard';
import { deleteBotShips } from '../../store/actionCreators/botShips';
import { deletePlayerBoard } from '../../store/actionCreators/playerBoard';
import { deletePlayerShips } from '../../store/actionCreators/playerShips';
import { getBotBoard, getBotShips, getPlayerBoard, getPlayerName, getPlayerShips } from '../../store/selectors';
import GameBoard from '../GameBoard/GameBoard';
import './Game.scss';

const alreadyShotedMessage = {
  type: 'info',
  content: 'already shoted',
  duration: 2,
}

const LEVEL = 'beginer'

const Game = () => {
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage();

  const playerName = useSelector(getPlayerName)
  const reduxPlayerBoard = useSelector(getPlayerBoard)
  const reduxBotBoard = useSelector(getBotBoard)
  const reduxPlayerShips = useSelector(getPlayerShips)
  const reduxBotShips = useSelector(getBotShips)

  const [playerBoard, setPlayerBoard] = useState([])
  const [playerShips, setPlayerShips] = useState([])
  const [botBoard, setBotBoard] = useState([])
  const [botShips, setBotShips] = useState([])
  const [playerTurn, setPlayerTurn] = useState(true)
  const [botCrashedShip, setBotCrashedShip] = useState()
  const [playerCrashedShip, setPlayerCrashedShip] = useState()
  const [availablePlacesForShot, setAvailablePlacesForShot] = useState([]);
  const [playerShipsCoords, setPlayerShipsCoords] = useState([]);

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

  const handleAvailablePlacesForShot = (board) => {
    const arr = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j].shipStatus && !board[i][j].shoted) {
          arr.push(`${i}-${j}`)
        }
      }
    }
    return arr
  }

  const handlePlayerAllShipsCoords = (board) => {
    const arr = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].hasShipPart && !board[i][j].shoted) {
          arr.push(`${i}-${j}`)
        }
      }
    }
    return arr
  }

  useEffect(() => {
    if (reduxPlayerBoard.length && reduxPlayerShips.length && reduxBotBoard.length && reduxBotShips.length) {
      setPlayerBoard(reduxPlayerBoard);
      setPlayerShips(reduxPlayerShips);
      setBotBoard(reduxBotBoard);
      setBotShips(reduxBotShips);
    }
  }, [reduxPlayerBoard, reduxPlayerShips, reduxBotBoard, reduxBotShips])

  // useEffect(() => {
  //   const places = handleAvailablePlacesForShot(playerBoard)
  //   setAvailablePlacesForShot([...places])
  // }, [playerBoard])


  useEffect(() => {
    if (!playerTurn && playerBoard) {
      // const rr = handlePlayerAllShipsCoords(playerBoard)
      // if (!rr.length) return alert('gameover')
      // const randomPlace = Math.floor(Math.random() * rr.length);
      // const [x, y] = rr[randomPlace].split('-')
      const availablePlacesForShot = LEVEL === 'super' ? handlePlayerAllShipsCoords(playerBoard) : handleAvailablePlacesForShot(playerBoard)
      if (!availablePlacesForShot.length) return alert('gameover')
      const randomPlace = Math.floor(Math.random() * availablePlacesForShot.length);
      const [x, y] = availablePlacesForShot[randomPlace].split('-')
      if (!playerBoard[x][y].shoted) {
        setTimeout(() => {
          // alert(5)
          const newPlayerBoard = JSON.parse(JSON.stringify(playerBoard))
          newPlayerBoard[x][y].shoted = true;
          if (!newPlayerBoard[x][y].hasShipPart) {
            setPlayerTurn(true)
          } else if (Boolean(newPlayerBoard[x][y].shipId)) {
            newPlayerBoard[x][y].shipStatus = 'injured';
            const newPlayerShips = playerShips.map(ship => {
              if (newPlayerBoard[x][y].shipId === ship.id) {
                // ship.shotedCount++
                if (ship.shotedCount + 1 === ship.length) {
                  // alert('crash')
                  ship.crashed = true
                  // setPlayerCrashedShip({ ...ship })
                  handleCrashedBoard(ship, newPlayerBoard)
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

  console.log(111)

  return (
    <div className='game_container'>
      {/* <h2>{JSON.stringify(availablePlacesForShot)}</h2> */}
      {/* <h2>{JSON.stringify(playerShipsCoords)}</h2> */}
      {/* <h2>{availablePlacesForShot.length}</h2> */}
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