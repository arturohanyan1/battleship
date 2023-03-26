import React from 'react'
import { useSelector } from 'react-redux';
import { getDialogs } from '../../store/selectors';
import AvatarsDialog from './AvatarsDialog/AvatarsDialog';
import FlagsDialog from './FlagsDialog/FlagsDialog';
import UserProfileDialog from './UserProfileDialog/UserProfileDialog';

const Dialogs = () => {

  const dialogs = useSelector(getDialogs);

  return (
    <>
      {!Object.keys(dialogs).length && null}
      {dialogs?.UserProfileDialog && <UserProfileDialog />}
      {dialogs?.AvatarsDialog && <AvatarsDialog />}
      {dialogs?.FlagsDialog && <FlagsDialog />}
    </>
  )
}

export default Dialogs