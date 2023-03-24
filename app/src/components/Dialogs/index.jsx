import React from 'react'
import { useSelector } from 'react-redux';
import { getDialogs } from '../../store/selectors';
import UserProfileDialog from './UserProfileDialog/UserProfileDialog';

const Dialogs = () => {

  const dialogs = useSelector(getDialogs);

  return (
    <>
      {!dialogs?.dialogType && null}
      {dialogs?.dialogType === 'UserProfileDialog' && <UserProfileDialog />}
    </>
  )
}

export default Dialogs