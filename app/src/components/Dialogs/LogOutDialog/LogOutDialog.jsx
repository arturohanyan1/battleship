import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/actionCreators/auth';
import Modal from '../../commons/Modal';
import './LogOutDialog.scss';
import { closeDialog } from '../../../store/actionCreators/dialodManager';
import { useNavigate } from 'react-router';

const LogOutDialog = () => {

  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Actions
  const onConfirm = () => {
    localStorage.removeItem("player");
    dispatch(logout())
    dispatch(closeDialog('LogOutDialog'))
    navigate('/');
  }

  const onCancel = () => {
    dispatch(closeDialog('LogOutDialog'))
  }

  return (
    <Modal
      dialogType={'LogOutDialog'}
      closeIcon={true}
      title={'Log Out'}
      btnTitle='logout'
      onSubmit={onConfirm}
      onSecondSubmit={onCancel}
      secondBtnTitle='cancel'
      size={"md"}
      footerClassname={'log_out_dialog__footer'}
    >
      <div className='log_out_dialog--description'>Are you sure you want to log out?</div>
    </Modal>
  )
}

export default LogOutDialog