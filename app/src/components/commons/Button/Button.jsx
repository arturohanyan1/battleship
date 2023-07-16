import React from 'react';
import cn from 'classnames';
import './Button.scss';
import { ReactSVG } from 'react-svg';

const Button = ({ name, icon, onClick, className }) => {
  return (
    <button className='button' onClick={onClick}>
      {icon && <ReactSVG src={`./images/icons/${icon}.svg`} className={cn('button_icon', className)} />}
      {name && <span className='button_name'>{name}</span>}
    </button>
  )
}

export default Button