import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { closeDialog, openDialog } from '../../../store/actionCreators/dialodManager';
import { setPlayerName } from '../../../store/actionCreators/player';
import { getPlayer } from '../../../store/selectors';
import Modal from '../../commons/Modal';
import { usernameValidationScheme } from './usernameValidationScheme';
import './UserProfileDialog.scss'


const UserProfileDialog = () => {
    const dispatch = useDispatch();
    const player = useSelector(getPlayer)
    const [userInputValue, setUserInputValue] = useState('');
    const [usernameError, setUserNameError] = useState('')

    const handleChange = (e) => {
        e.preventDefault();
        setUserNameError(usernameValidationScheme(e.target.value))
        setUserInputValue(e.target.value)
    }

    const openAvatarsDialog = () => {
        dispatch(openDialog('AvatarsDialog'))
    }

    const openFlagsDialog = () => {
        dispatch(openDialog('FlagsDialog'))
    }

    const onClickHandler = () => {
        if (userInputValue && !usernameError) {
            dispatch(setPlayerName(userInputValue));
            dispatch(closeDialog('UserProfileDialog'));
        } else {
            setUserNameError(usernameValidationScheme(userInputValue))
        }
    }

    useEffect(() => {
        if (player.playerName) setUserInputValue(player.playerName)
    }, [player])

    return (
        <div>
            <Modal dialogType={'UserProfileDialog'} closeIcon={player.playerName} title={'User Profile'} btnTitle='complete' onSubmit={onClickHandler}>
                <div className='user-profile-modal__content'>
                    <div className='user-profile-modal__content--left-side'>
                        <div className='avatar-section'>
                            <div className='avatar-section_image'>
                                <img src={`./images/avatars/${player.avatar}.jpg`} alt='pic' />
                            </div>
                            <div onClick={openAvatarsDialog} className={'edit edit-avatar'}>
                                <ReactSVG src={`./images/icons/edit.svg`} />
                            </div>
                        </div>
                        <div className='username-section'>
                            <div className='username-section--label'><span>username</span></div>
                            <div className={`username-section--input ${Boolean(usernameError) ? 'error' : ''}`}>
                                <input type='text' value={userInputValue} onChange={(e) => handleChange(e)} />
                            </div>
                            {Boolean(usernameError) && <div className='username-section--error'><span>{usernameError}</span></div>}
                        </div>
                    </div>
                    <div className='user-profile-modal__content--right-side'>
                        <div className='flag-section'>
                            <div className='flag-section_image'>
                                <img src={`./images/flags/${player.flag}.png`} alt='pic' />
                            </div>
                            <div onClick={openFlagsDialog} className={'edit edit-flag'}>
                                <ReactSVG src={`./images/icons/edit.svg`} />
                            </div>
                        </div>
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
                </div>
            </Modal>
        </div>
    )
}

export default UserProfileDialog