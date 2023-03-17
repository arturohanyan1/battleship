import React, { useState } from 'react'
import EMPTY_BOARD from '../../constants/board'
import SHIPS from '../../constants/ships'
import randomBoard from '../../helpers/generateRandomBoard'
import './BoardBuilder.scss'
import setShip from '../../helpers/setShip'
import BuilderTable from '../BuilderTable/BuilderTable'
import BuilderShips from '../BuilderShips/BuilderShips'
import { message } from 'antd';
import { useDispatch } from 'react-redux'
import { setPlayerBoard } from '../../store/actionCreators/playerBoard'
import { setBotBoard } from '../../store/actionCreators/botBoard'
import { setBotShips } from '../../store/actionCreators/botShips'
import { setPlayersShips } from '../../store/actionCreators/playerShips'

const BoardBuilder = () => {

  const dispatch = useDispatch()

  const [board, setBoard] = useState(JSON.parse(JSON.stringify(EMPTY_BOARD)));
  const [prevBoard, setPrevBoard] = useState(JSON.parse(JSON.stringify(EMPTY_BOARD)));
  const [prevSelectedShip, setPrevSelectedShip] = useState({})
  const [hoverCoordinates, setHoverCoordinates] = useState()
  const [selectedShip, setSelectedShip] = useState({})
  const [playerShips, setPlayerShips] = useState([]);
  const [prevPlayerShips, setPrevPlayerShips] = useState([]);
  const [ships, setShips] = useState(JSON.parse(JSON.stringify(SHIPS.sort((a, b) => a.length - b.length))))
  const [messageApi, contextHolder] = message.useMessage();

  const randomBoardBuilder = () => {
    const generatedRandomBoard = randomBoard()
    setBoard(generatedRandomBoard.board);
    setPlayerShips(generatedRandomBoard.ships)
    setShips([]);
    setPrevSelectedShip({});
    setPrevPlayerShips([])
    setSelectedShip({});
  };

  const resetBoard = () => {
    setBoard(JSON.parse(JSON.stringify(EMPTY_BOARD)));
    setShips(JSON.parse(JSON.stringify(SHIPS.sort((a, b) => a.length - b.length))));
    setPrevSelectedShip({});
    setSelectedShip({});
    setPlayerShips([]);
    setPrevPlayerShips([]);
  }

  const onClickHandler = (x, y) => {
    messageApi.open({
      type: 'info',
      content: `x coord: ${x} - y coord: ${y}`,
      duration: 2,
    });
  }

  const cancelHandler = () => {
    setBoard(prevBoard)
    setPlayerShips(prevPlayerShips)
    Object.keys(prevSelectedShip).length && setShips(prev => [...prev, prevSelectedShip].sort((a, b) => a.length - b.length))
    setPrevSelectedShip({});
    setSelectedShip({});
    setPrevPlayerShips([])
  }

  const onDragEndHandler = (e) => {
    // console.log('end', e.target)
  }

  const onDragStartHandler = (e, ship) => {
    // console.log('start', ship)
    setSelectedShip(ship)

  }
  const onDragOverHandler = (e, x, y, ship) => {
    e.preventDefault()
    // console.log('over', e.target)
    setHoverCoordinates({ x, y })
    e.target.classList.add('hover-state', `length-${ship.length}`, `dir-${ship.dir}`)
  }
  const onDragLeaveHandler = (e, ship) => {
    // console.log('leave', e.target)
    setHoverCoordinates(null)
    e.target.classList.remove('hover-state', `length-${ship.length}`, `dir-${ship.dir}`)
  }
  const onDropHandler = (e, board, ship, x, y) => {
    e.preventDefault();
    // console.log('drop', coll)
    setPrevBoard(JSON.parse(JSON.stringify(board)))
    setPrevPlayerShips(JSON.parse(JSON.stringify(playerShips)))
    const res = setShip(board, ship, x, y);
    if (!!res) {
      setPlayerShips(prev => [...prev, res.ship])
      setShips(prev => prev.filter(el => el.id !== ship.id))
      setSelectedShip({})
      setPrevSelectedShip(ship)
    } else {
      messageApi.open({
        type: 'error',
        content: 'place is not available',
        duration: 2,
      });
    }
    e.target.classList.remove('hover-state', `length-${ship.length}`, `dir-${ship.dir}`)
  }

  const savePlayerBoard = (board) => {
    dispatch(setPlayerBoard(JSON.parse(JSON.stringify(board))))
    dispatch(setPlayersShips(JSON.parse(JSON.stringify(playerShips))))
    const generatedBotBoard = randomBoard()
    dispatch(setBotBoard(JSON.parse(JSON.stringify(generatedBotBoard.board))))
    dispatch(setBotShips(JSON.parse(JSON.stringify(generatedBotBoard.ships))))
  }

  return (
    <div className='board-builder'>
      {contextHolder}
      {!!hoverCoordinates && <div className='toaster'>{`X - ${hoverCoordinates.x} - Y - ${hoverCoordinates.y}`}</div>}
      <div className="ships-section">
        <BuilderShips
          ships={ships}
          setShips={setShips}
          onDragEndHandler={onDragEndHandler}
          selectedShip={selectedShip}
          onDragStartHandler={onDragStartHandler}
        />
      </div>
      <div className="board-section">
        <div className="buttons">
          <button onClick={randomBoardBuilder}>random board</button>
          <button onClick={resetBoard}>manually</button>
          {!!Object.keys(prevSelectedShip).length && <button onClick={cancelHandler}>cancel</button>}
          {!ships.length && <button onClick={() => savePlayerBoard(board)}>ready</button>}
        </div>
        <div className="board-table-wrapper">
          <BuilderTable
            board={board}
            setHoverCoordinates={setHoverCoordinates}
            onClickHandler={onClickHandler}
            onDragLeaveHandler={onDragLeaveHandler}
            onDragOverHandler={onDragOverHandler}
            onDropHandler={onDropHandler}
            selectedShip={selectedShip}
            hoverCoordinates={hoverCoordinates}
          />
          <div className='table-info-section'>
            {/* <img src="./images/gameAssets/radar.gif" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardBuilder