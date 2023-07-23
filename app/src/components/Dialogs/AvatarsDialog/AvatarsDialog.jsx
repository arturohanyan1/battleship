import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AVATARS } from '../../../constants/constants';
import { closeDialog } from '../../../store/actionCreators/dialodManager';
import { setPlayerAvatar } from '../../../store/actionCreators/player';
import { getPlayer } from '../../../store/selectors';
import Modal from '../../commons/Modal';
import './AvatarsDialog.scss';

const AvatarsDialog = () => {
  // Hooks
  const diaspatch = useDispatch();

  // Selectors
  const player = useSelector(getPlayer);

  // States
  const [selectedAvatar, setSelectedAvatar] = useState('');

  // Actions
  const onSubmitHandler = () => {
    diaspatch(setPlayerAvatar(selectedAvatar))
    diaspatch(closeDialog('AvatarsDialog'))
  }

  // Effects
  useEffect(() => {
    setSelectedAvatar(player.avatar)
  }, [player])

  return (
    <Modal dialogType={'AvatarsDialog'} size='md' title={'select your profile picture'} btnTitle='done' onSubmit={onSubmitHandler}>
      <div className='avatars-modal__wrapper'>
        <div className='avatars-modal__content'>
          {AVATARS.map(el => (
            <div key={el} onClick={() => setSelectedAvatar(el)} className={`avatar-img-wrapper ${selectedAvatar === el ? 'selected' : 'active'}`}>
              <img src={`./images/avatars/${el}.jpg`} alt="jpg" className='avatar-img' />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default AvatarsDialog