import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import BoardBuilder from './components/BoardBuilder/BoardBuilder';
import Dialogs from './components/Dialogs';
import Game from './components/Game/Game';
import NavBar from './components/NavBar/NavBar';
import { closeDialog, openDialog } from './store/actionCreators/dialodManager';
import { setPlayer } from './store/actionCreators/player';
import { getPlayer, getPlayerBoard } from './store/selectors';

function App() {

  const dispatch = useDispatch();

  const playerBoard = useSelector(getPlayerBoard)
  const player = useSelector(getPlayer)

  useEffect(() => {
    if (player.playerName) {
      localStorage.setItem('player', JSON.stringify(player))
    } else {
      if (Boolean(localStorage.getItem('player'))) {
        dispatch(setPlayer(JSON.parse(localStorage.getItem('player'))))
      } else {
        dispatch(openDialog('UserProfileDialog'))
      }
    }
  }, [player])

  return (
    <div className="App">
      <NavBar />
      <Dialogs />
      {player.playerName ? (
        playerBoard.length ? <Game /> : <BoardBuilder />
      ) : (
        null
      )}
    </div>
  );
}

export default App;
