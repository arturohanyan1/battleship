import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './NavBar.scss'
import { getPlayer, getPlayerName } from '../../store/selectors';
import { openDialog } from '../../store/actionCreators/dialodManager';
import ConfirmPopUp from '../commons/ConfirmPopUp/ConfirmPopUp';
import { logout } from '../../store/actionCreators/auth';

const NavBar = () => {

  // Hooks
  const dispatch = useDispatch();

  // Selectors
  const player = useSelector(getPlayer);

  // States
  const [isOpen, setIsOpen] = useState(false);

  //Actions
  const openUserProfileDialog = () => {
    dispatch(openDialog('UserProfileDialog'))
  }

  const openSettingsDialog = () => {
    dispatch(openDialog('SettingsDialog'))
  }

  const logOutHandler = () => {
    localStorage.removeItem("player");
    dispatch(logout())
  }

  const openLogoutDialog = () => {
    dispatch(openDialog('LogOutDialog'))
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