import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { closeDialog } from '../../../store/actionCreators/dialodManager';
import './Modal.scss';

const Modal = ({ dialogType, onSubmit, onSecondSubmit, closeIcon = true, title, btnTitle, secondBtnTitle, children, size }) => {
  //Hooks
  const dispatch = useDispatch();

  // Actions
  const closePopUp = () => {
    dispatch(closeDialog(dialogType))
  }

  const onSecondButton = () => {
    onSecondSubmit ? onSecondSubmit() : closePopUp()
  }

  return createPortal(
    <>
      <div className='modal-wrapper'>
        <div className={`modal-content ${size}`} onClick={e => e.stopPropagation()}>
          <div className='modal-content__header'>
            <span className='modal-title'>{title}</span>
            {closeIcon &&
              <div className={`close-button`} onClick={closePopUp}>
                <ReactSVG src={`./images/icons/close.svg`} className={`close-button--icon`} />
              </div>
            }
          </div>
          <div className='modal-content__body'>
            {children}
          </div>
          <div className='modal-content__footer'>
            {Boolean(btnTitle) && <button className='submit-button' onClick={onSubmit}>{btnTitle ?? 'confirm'}</button>}
            {Boolean(secondBtnTitle) && (
              <button className='submit-button' onClick={onSecondButton}>{secondBtnTitle ?? 'cancel'}</button>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  )
}

export default Modal