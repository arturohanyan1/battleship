import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setPlayer } from '../../../store/actionCreators/player';
import Modal from '../../commons/Modal';
import './AuthDialog.scss'


const AuthDialog = () => {
    const dispatch = useDispatch();
    const [userInputValue, setUserInputValue] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setUserInputValue(e.target.value)
    }

    const onClickHandler = () => {
        dispatch(setPlayer(userInputValue))
        // localStorage.setItem('player', userInputValue);
    }
    return (
        <div>
            <Modal dialogType={'AuthDialog'} title={'Authentification'}>
                <div className='auth-modal__content'>
                    <div>
                        <input type='text' value={userInputValue} onChange={(e) => handleChange(e)} />
                        <button onClick={onClickHandler}>register</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AuthDialog