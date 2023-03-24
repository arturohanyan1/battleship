import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { closeDialog } from '../../../store/actionCreators/dialodManager';
import './Modal.scss';

const Modal = ({ dialogType, onSubmit, closeIcon = true, title, btnTitle = 'Click', children }) => {

    const dispatch = useDispatch();

    const closePopUp = () => {
        dispatch(closeDialog(dialogType))
    }

    return createPortal(
        <>
            <div className='modal-wrapper'>
                <div className='modal-content' onClick={e => e.stopPropagation()}>
                    <div className='modal-content__header'>
                        {closeIcon &&
                            <div className={`close-button`} onClick={closePopUp}>
                                <ReactSVG
                                    src={`./images/icons/close.svg`}
                                    className={`close-button--icon`}
                                />
                            </div>
                        }
                        <span className='modal-title'>{title}</span>
                    </div>
                    <div className='modal-content__body'>
                        {children}
                    </div>
                    <div className='modal-content__footer'>
                        {Boolean(onSubmit) && <button className='submit-button' onClick={onSubmit}>{btnTitle}</button>}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('modal-root')
    )
}

export default Modal