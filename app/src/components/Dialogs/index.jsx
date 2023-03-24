import React from 'react'
import { useSelector } from 'react-redux';
import { getDialogs } from '../../store/selectors';
import AvatarsDialog from './AvatarsDialog/AvatarsDialog';
import UserProfileDialog from './UserProfileDialog/UserProfileDialog';

const Dialogs = () => {

  const dialogs = useSelector(getDialogs);

  return (
    <>
      {!dialogs?.dialogType && null}
      {dialogs?.dialogType === 'UserProfileDialog' && <UserProfileDialog />}
      {dialogs?.dialogType === 'AvatarsDialog' && <AvatarsDialog />}
    </>
  )
}

export default Dialogs