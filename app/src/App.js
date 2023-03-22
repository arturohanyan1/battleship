import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import BoardBuilder from './components/BoardBuilder/BoardBuilder';
import Dialogs from './components/Dialogs';
import Game from './components/Game/Game';
import NavBar from './components/NavBar/NavBar';
import { closeDialog, openDialog } from './store/actionCreators/dialodManager';
import { setPlayer } from './store/actionCreators/player';
import { getPlayerBoard, getPlayerName } from './store/selectors';

function App() {

  const dispatch = useDispatch();

  const playerBoard = useSelector(getPlayerBoard)
  const player = useSelector(getPlayerName)

  useEffect(() => {
    if (Boolean(localStorage.getItem('player'))) {
      dispatch(setPlayer(localStorage.getItem('player')))
    }
  }, [dispatch]);

  useEffect(() => {
    if (player) {
      dispatch(closeDialog('AuthDialog'))
    } else {
      dispatch(openDialog('AuthDialog'))
    }
  }, [player])

  return (
    <div className="App">
      <NavBar />
      <Dialogs />
      {player ? (
        playerBoard.length ? <Game /> : <BoardBuilder />
      ) : (
        null
      )}
    </div>
  );
}

export default App;
