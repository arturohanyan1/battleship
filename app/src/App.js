import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import BoardBuilder from './components/BoardBuilder/BoardBuilder';
import Game from './components/Game/Game';
import NavBar from './components/NavBar/NavBar';
import randomBoard from './helpers/generateRandomBoard';
import { setBotBoard } from './store/actionCreators/botBoard';
import { setPlayer } from './store/actionCreators/player';
import { getPlayerBoard } from './store/selectors';

function App() {

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [userInputValue, setUserInputValue] = useState('')

  const playerBoard = useSelector(getPlayerBoard)

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      const player = localStorage.getItem('user');
      setUser(player)
      dispatch(setPlayer(player))
    }
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault()
    setUserInputValue(e.target.value)
  }

  const onClickHandler = () => {
    setUser(userInputValue)
    dispatch(setPlayer(userInputValue))
    localStorage.setItem('user', userInputValue);
  }

  // useEffect(() => {
  //   const xx = JSON.parse(JSON.stringify(randomBoard()))
  //   dispatch(setBotBoard(xx))
  // }, [])

  console.log('playerBoard', playerBoard)

  return (
    <div className="App">
      <NavBar />
      {user ? (
        playerBoard.length ? <Game /> : <BoardBuilder />
      ) : (
        <div>
          <input type='text' value={userInputValue} onChange={(e) => handleChange(e)} />
          <button onClick={onClickHandler}>register</button>
        </div>
      )}
    </div>
  );
}

export default App;
