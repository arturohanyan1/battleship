import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import './NavBar.scss'
import { getPlayerName } from '../../store/selectors';
import { openDialog } from '../../store/actionCreators/dialodManager';
import ConfirmPopUp from '../commons/ConfirmPopUp/ConfirmPopUp';
import { logout } from '../../store/actionCreators/auth';

const NavBar = () => {

  // Hooks
  const dispatch = useDispatch();

  // Selectors
  const playerName = useSelector(getPlayerName)

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
          <div className='nav-bar__items'>
            <span className={`nav-bar__item active`} onClick={openSettingsDialog}>settings</span>
            <span className={`nav-bar__item active`} onClick={openUserProfileDialog}>{playerName}</span>
            <span className={`nav-bar__item active`} onClick={openLogoutDialog}>logout</span>
          </div>
          {/* <div className='nav-bar__item active'>
            <ConfirmPopUp title={'Log out'} description={'Are you sure you want to exit?'} onConfirm={logOutHandler}>
              <span className='nav-bar__user--username'>log out</span>
            </ConfirmPopUp>
          </div> */}
        </div>
      </nav>
    </>
  )
}

export default NavBar