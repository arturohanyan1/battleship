import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FLAGS } from '../../../constants/constants';
import { closeDialog } from '../../../store/actionCreators/dialodManager';
import { setPlayerFlag } from '../../../store/actionCreators/player';
import { getPlayer } from '../../../store/selectors';
import Modal from '../../commons/Modal';
import './FlagsDialog.scss';

const FlagsDialog = () => {
  const diaspatch = useDispatch();
  const player = useSelector(getPlayer)
  const [selectedFlag, setselectedFlag] = useState();

  const selectAvatar = (flag) => {
    setselectedFlag(flag)
  }

  const onSubmitHandler = () => {
    diaspatch(setPlayerFlag(selectedFlag))
    diaspatch(closeDialog('FlagsDialog'))
  }

  useEffect(() => {
    setselectedFlag(player.flag)
  }, [player])

  return (
    <Modal dialogType={'FlagsDialog'} size='md' title={'select flag'} btnTitle='done' onSubmit={onSubmitHandler}>
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