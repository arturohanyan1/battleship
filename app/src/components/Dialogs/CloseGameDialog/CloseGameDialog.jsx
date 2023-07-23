import React from 'react'
import './CloseGameDialog.scss';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { deletePlayerBoard } from '../../../store/actionCreators/playerBoard';
import { deleteBotBoard } from '../../../store/actionCreators/botBoard';
import { deleteBotShips } from '../../../store/actionCreators/botShips';
import { deletePlayerShips } from '../../../store/actionCreators/playerShips';
import { closeDialog } from '../../../store/actionCreators/dialodManager';
import Modal from '../../commons/Modal';

const CloseGameDialog = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Actions
  const backtoLobby = () => {
    dispatch(deletePlayerBoard());
    dispatch(deleteBotBoard());
    dispatch(deleteBotShips());
    dispatch(deletePlayerShips());
    dispatch(closeDialog('CloseGameDialog'))
    navigate('/')
  };

  return (
    <Modal
      dialogType={'CloseGameDialog'}
      closeIcon={true}
      size='md'
      title={'Close Game'}
      btnTitle='back to menu'
      onSubmit={backtoLobby}
      secondBtnTitle='cancel'>
      <div className='close_game_dialog--description'>Are you sure you want to exit the game?</div>
    </Modal>
  )
}

export default CloseGameDialog