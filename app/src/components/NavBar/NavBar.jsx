import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import './NavBar.scss'
import { getPlayerName } from '../../store/selectors';

const NAVITEMS = [
  { id: 1, path: '/', title: 'home' },
  { id: 2, path: '/main', title: 'main page' },
  // { id: 3, path: '/user/:id', title: 'userpage' },
  { id: 5, path: '/map', title: 'map' },
  // { id: 6, path: '/tabs', title: 'tabs' },
  // { id: 7, path: '/inputs', title: 'inputs' },
  // { id: 8, path: '/social', title: 'social' },
]

const NavBar = () => {

  const [activItem, setActiveItem] = useState()
  const playerName = useSelector(getPlayerName)

  return (
    <>
      <nav className='nav-bar'>
        <div className='nav-bar__wrapper'>
          <span to='/' className='nav-bar__logo'><span>Battleship</span></span>
          <div className='nav-bar__items'>
            {NAVITEMS.map(item => (
              <span key={item.id} to={item.path} className={`nav-bar__item ${activItem === item.path ? 'active' : ''}`}>
                {item.title}
              </span>
            ))}
          </div>
          <div className='nav-bar__user'>
            <span className='nav-bar__user--username'>{playerName}</span>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar