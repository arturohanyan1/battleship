import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { openDialog } from '../../../store/actionCreators/dialodManager';
import { setPlayer } from '../../../store/actionCreators/player';
import Modal from '../../commons/Modal';
import './UserProfileDialog.scss'


const UserProfileDialog = () => {
    const dispatch = useDispatch();
    const [userInputValue, setUserInputValue] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setUserInputValue(e.target.value)
    }

    const openAvatarsDialog = () => {
        dispatch(openDialog('AvatarsDialog'))
    }

    const openFlagsDialog = () => {
        dispatch(openDialog('FlagsDialog'))
    }

    const onClickHandler = () => {
        dispatch(setPlayer(userInputValue))
        // localStorage.setItem('player', userInputValue);
    }
    return (
        <div>
            <Modal dialogType={'UserProfileDialog'} title={'User Profile'} btnTitle='complete' onSubmit={() => alert('ok')}>
                <div className='user-profile-modal__content'>
                    <div className='user-profile-modal__content--left-side'>
                        <div className='avatar-section'>
                            <div className='avatar-section_image'>
                                <img src='./images/avatars/avatar_1.jpg' alt='pic' />
                            </div>
                            <div onClick={openAvatarsDialog} className={'edit edit-avatar'}>
                                <ReactSVG src={`./images/icons/edit.svg`} />
                            </div>
                        </div>
                        <div className='username-section'>
                            <div className='username-section--label'><span>username</span></div>
                            <div className='username-section--input'>
                                <input type='text' value={userInputValue} onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        {/* <div>
                            <input type='text' value={userInputValue} onChange={(e) => handleChange(e)} />
                            <button onClick={onClickHandler}>register</button>
                        </div> */}
                    </div>
                    <div className='user-profile-modal__content--right-side'>
                        <div className='flag-section'>
                            <div className='flag-section_image'>
                                <img src='./images/flags/flag_1.png' alt='pic' />
                            </div>
                            <div onClick={openFlagsDialog} className={'edit edit-flag'}>
                                <ReactSVG src={`./images/icons/edit.svg`} />
                            </div>
                        </div>
                        <div className='game-result-section'>
                            <div className='game-result-section--title'><span>statistics</span></div>
                            <div className='game-result-section--info'>
                                <div className='game-result-section--info-col'>
                                    <span>won: 0</span>
                                </div>
                                <div className='game-result-section--info-col'>
                                    <span>lost: 0</span>
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