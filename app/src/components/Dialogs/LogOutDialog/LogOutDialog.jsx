import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/actionCreators/auth';
import Modal from '../../commons/Modal';
import './LogOutDialog.scss';
import { closeDialog } from '../../../store/actionCreators/dialodManager';

const LogOutDialog = () => {

  //Hooks
  const dispatch = useDispatch();

  // Actions
  const onConfirm = () => {
    localStorage.removeItem("player");
    dispatch(logout())
    dispatch(closeDialog('LogOutDialog'))
  }

  return (
    <Modal
      dialogType={'LogOutDialog'}
      closeIcon={true}
      title={'Log Out'}
      btnTitle='logout'
      onSubmit={onConfirm}
      secondBtnTitle='cancel'
    >
      <div className='log_out_dialog--description'>Are you sure you want to log out?</div>
    </Modal>
  )
}

export default LogOutDialog