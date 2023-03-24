import React, { useState } from 'react'
import { FLAGS } from '../../../constants/constants';
import Modal from '../../commons/Modal';
import './FlagsDialog.scss';

const FlagsDialog = () => {
  const [selectedFlag, setselectedFlag] = useState('flag_1');

  const selectAvatar = (flag) => {
    setselectedFlag(flag)
  }

  return (
    <Modal dialogType={'FlagsDialog'} size='md' title={'select flag'} btnTitle='done' onSubmit={() => alert('ok')}>
      <div className='flags-modal__content'>
        {FLAGS.map(el => (
          <div key={el} onClick={() => selectAvatar(el)} className={`flag-img-wrapper ${selectedFlag === el ? 'selected' : 'active'}`}>
            <img src={`./images/flags/${el}.png`} alt="jpg" className='flag-img' />
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default FlagsDialog