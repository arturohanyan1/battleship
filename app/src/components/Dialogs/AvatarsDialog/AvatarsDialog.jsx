import React, { useState } from 'react'
import { AVATARS } from '../../../constants/constants';
import Modal from '../../commons/Modal';
import './AvatarsDialog.scss';

const AvatarsDialog = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('avatar_1');

  const selectAvatar = (avatar) => {
    setSelectedAvatar(avatar)
  }

  return (
    <Modal dialogType={'AvatarsDialog'} size='md' title={'select your profile picture'} btnTitle='done' onSubmit={() => alert('ok')}>
      <div className='avatars-modal__content'>
        {AVATARS.map(el => (
          <div key={el} onClick={() => selectAvatar(el)} className={`avatar-img-wrapper ${selectedAvatar === el ? 'selected' : 'active'}`}>
            <img src={`./images/avatars/${el}.jpg`} alt="jpg" className='avatar-img' />
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default AvatarsDialog