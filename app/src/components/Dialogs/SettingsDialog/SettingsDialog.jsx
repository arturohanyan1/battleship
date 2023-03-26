import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactSVG } from 'react-svg'
import { LEVELS } from '../../../constants/constants'
import { openDialog } from '../../../store/actionCreators/dialodManager'
import { setLevel, setMusicOff, setMusicOn, setSoundOff, setSoundOn } from '../../../store/actionCreators/settings'
import { getLevel, getMusic, getSound } from '../../../store/selectors'
import Modal from '../../commons/Modal'
import './SettingsDialog.scss'

const SettingsDialog = () => {

  const dispatch = useDispatch();
  const music = useSelector(getMusic);
  const sound = useSelector(getSound);
  const level = useSelector(getLevel);

  const toggleMusic = () => {
    if (music) {
      dispatch(setMusicOff())
    } else {
      dispatch(setMusicOn())
    }
  }

  const toggleSound = () => {
    if (sound) {
      dispatch(setSoundOff())
    } else {
      dispatch(setSoundOn())
    }
  }

  const selectLevel = (event) => {
    dispatch(setLevel(event.target.value))
  }

  const openUserProfileDialog = () => {
    dispatch(openDialog('UserProfileDialog'))
  }

  return (
    <Modal dialogType={'SettingsDialog'} size='md' title={'settings'} btnTitle='ok' onSubmit={() => alert('ok')}>
      <div className='settings-modal__content'>
        <div className='settings-item'>
          <div className='settings-item__name'>music</div>
          <div className='settings-item__value' onClick={toggleMusic}>
            <ReactSVG
              src={`./images/icons/music-${music ? 'on' : 'off'}.svg`}
              className={`settings-item__icon ${music ? 'active' : ''}`}
            />
          </div>
        </div>
        <div className='settings-item'>
          <div className='settings-item__name'>sound</div>
          <div className='settings-item__value' onClick={toggleSound}>
            <ReactSVG
              src={`./images/icons/sound-${sound ? 'on' : 'off'}.svg`}
              className={`settings-item__icon ${sound ? 'active' : ''}`}
            />
          </div>
        </div>
        <div className='settings-item'>
          <div className='settings-item__name'>level</div>
          <div className='settings-item__value'>
            <select className='settings-item__select' value={level} onChange={selectLevel}>
              {LEVELS.map(el => (
                <option className='settings-item__option' key={el.value} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='settings-item'>
          <div className='settings-item__name'>profile</div>
          <div className='settings-item__value' onClick={openUserProfileDialog}>
            <ReactSVG
              src={`./images/icons/profile-settings.svg`}
              className={`settings-item__icon active`}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SettingsDialog