
import React from 'react'
import { useDispatch } from 'react-redux'
import Modal from '../../commons/Modal';
import './ComingSoonDialog.scss';
import { closeDialog } from '../../../store/actionCreators/dialodManager';

const ComingSoonDialog = () => {

  //Hooks
  const dispatch = useDispatch();

  // Actions
  const onCloseDialog = () => {
    dispatch(closeDialog('ComingSoonDialog'))
  }

  return (
    <Modal
      dialogType={'ComingSoonDialog'}
      closeIcon={true}
      title={'play vs friends'}
      btnTitle='ok'
      onSubmit={onCloseDialog}
      size={"md"}
      footerClassname={'coming_soon_dialog__footer'}
    >
      <div className='coming_soon_dialog--description'>Coming Soon</div>
    </Modal>
  )
}

export default ComingSoonDialog