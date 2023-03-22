import React from 'react'
import { useSelector } from 'react-redux';
import { getDialogs } from '../../store/selectors';
import AuthDialog from './AuthDialog/AuthDialog';

const Dialogs = () => {

  const dialogs = useSelector(getDialogs);

  return (
    <>
      {!dialogs?.dialogType && null}
      {dialogs?.dialogType === 'AuthDialog' && <AuthDialog />}
    </>
  )
}

export default Dialogs