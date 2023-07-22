import React from 'react';
import './GameOverDialog.scss';
import Modal from '../../commons/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deletePlayerBoard } from '../../../store/actionCreators/playerBoard';
import { deleteBotBoard } from '../../../store/actionCreators/botBoard';
import { deleteBotShips } from '../../../store/actionCreators/botShips';
import { deletePlayerShips } from '../../../store/actionCreators/playerShips';
import { closeDialog, openDialog } from '../../../store/actionCreators/dialodManager';

const GameOverDialog = ({ data }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Actions
  const clearDatas = () => {
    dispatch(deletePlayerBoard());
    dispatch(deleteBotBoard());
    dispatch(deleteBotShips());
    dispatch(deletePlayerShips());
    dispatch(closeDialog('GameOverDialog'))
  }

  const playAgain = () => {
    clearDatas()
    dispatch(openDialog('RandomBoardBuilderDialog'))
  }

  const backtoLobby = () => {
    clearDatas()
    navigate('/')
  };

  return (
    <Modal dialogType={'GameOverDialog'} closeIcon={true} title={'Game Over'} btnTitle='play again' onSubmit={playAgain} secondBtnTitle='back to main page' onSecondSubmit={backtoLobby}>
      <div className='game_over_dialog--description'>{data.winner} wins!</div>
    </Modal>
  )
}

export default GameOverDialog