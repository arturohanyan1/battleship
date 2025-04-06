import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { closeDialog, openDialog } from '../../../store/actionCreators/dialodManager';
import { setPlayerName } from '../../../store/actionCreators/player';
import { getPlayer } from '../../../store/selectors';
import Modal from '../../commons/Modal';
import { validationScheme } from './validationScheme';
import './UserProfileDialog.scss'
import { useNavigate } from 'react-router';


const UserProfileDialog = () => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const player = useSelector(getPlayer);

  // States
  const [formValues, setFormValues] = useState({ username: '', password: 'password' });
  const [formErrors, setFormErrors] = useState({ username: '', password: '' })

  // Actions
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormErrors(prev => ({ ...prev, [name]: validationScheme(value) }))
    setFormValues(prev => ({ ...prev, [name]: value }))
  }

  const openDialogHandler = (dialogName) => () => {
    dispatch(openDialog(dialogName))
  }

  const onClickHandler = () => {
    if (player.username) {
      dispatch(closeDialog('UserProfileDialog'));
    } else if (formValues.username && !Object.values(formErrors).filter(el => el).length) {
      dispatch(setPlayerName(formValues.username));
      dispatch(closeDialog('UserProfileDialog'));
      navigate('/');
    } else {
      Object.keys(formErrors).forEach(el => setFormErrors(prev => ({ ...prev, [el]: validationScheme(formValues[el]) })))
    }
  }

  // Effects
  useEffect(() => {
    if (player.username) setFormValues(prev => ({ ...prev, username: player.username }));
  }, [player])

  return (
    <div>
      <Modal classname="user-profile-modal" dialogType={'UserProfileDialog'} closeIcon={player.username} title={player.username ? 'User Profile' : 'Login'} btnTitle={player.username ? 'complete' : 'Login'} onSubmit={onClickHandler}>
        <div className='user-profile-modal__content'>
          <div className='user-profile-modal__content--first-row'>
            <div className='user-profile-modal__content--first-row-col'>
              <div className='avatar-section'>
                <div className='avatar-section_image'>
                  <img src={`./images/avatars/${player.avatar}.jpg`} alt='pic' />
                </div>
                <div onClick={openDialogHandler('AvatarsDialog')} className={'edit edit-avatar'}>
                  <ReactSVG src={`./images/icons/edit.svg`} className='edit-avatar--icon' />
                </div>
              </div>
            </div>
            <div className='user-profile-modal__content--first-row-col'>
              <div className='flag-section'>
                <div className='flag-section_image'>
                  <img src={`./images/flags/${player.flag}.png`} alt='pic' />
                </div>
                <div onClick={openDialogHandler('FlagsDialog')} className={'edit edit-flag'}>
                  <ReactSVG src={`./images/icons/edit.svg`} className='edit-flag--icon' />
                </div>
              </div>
            </div>
          </div>
          <div className='user-profile-modal__content--second-row'>
            <div className='user-profile-modal__content--second-row-col'>
              <div className='username-section'>
                <div className='username-section--label'><span>username</span></div>
                <div className={`username-section--input ${Boolean(formErrors.username) ? 'error' : ''}`}>
                  <input name='username' disabled={player.username} type='text' value={formValues.username} onChange={(e) => handleChange(e)} />
                </div>
                {Boolean(formErrors.username) && <div className='username-section--error'><span>{formErrors.username}</span></div>}
              </div>
            </div>
            {player.username && (
              <div className='user-profile-modal__content--second-row-col'>
                <div className='game-result-section'>
                  <div className='game-result-section--title'><span>statistics</span></div>
                  <div className='game-result-section--info'>
                    <div className='game-result-section--info-col'>
                      <span>won: {player.won}</span>
                    </div>
                    <div className='game-result-section--info-col'>
                      <span>lost: {player.lost}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserProfileDialog