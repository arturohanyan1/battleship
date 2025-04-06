import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import './NavBar.scss'
import { getPlayer } from '../../store/selectors';
import { openDialog } from '../../store/actionCreators/dialodManager';

const NavBar = () => {

  // Hooks
  const dispatch = useDispatch();

  // Selectors
  const player = useSelector(getPlayer);

  //Actions
  const openSettingsDialog = () => {
    dispatch(openDialog('SettingsDialog'))
  }

  return (
    <>
      <nav className='nav-bar'>
        <div className='nav-bar__wrapper'>
          <span to='/' className='nav-bar__logo'><span>Battleship</span></span>
          {player?.username && (
            <button className='nav-bar__settings' onClick={openSettingsDialog}>
              <span className='nav-bar__username'>{player.username}</span>
              <div className='nav-bar__avatar'>
                <img src={`./images/avatars/${player.avatar}.jpg`} alt="avatar" />
              </div>
            </button>
          )}
        </div>
      </nav>
    </>
  )
}

export default NavBar