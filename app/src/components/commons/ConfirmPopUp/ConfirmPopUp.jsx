import { Popconfirm } from 'antd'
import React from 'react'
import './ConfirmPopUp.scss'

const ConfirmPopUp = ({ title, description, onConfirm, onCancel, okText, cancelText, children }) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={okText || "Yes"}
      cancelText={cancelText || "No"}
      className='confirm_pop_up'
    >
      {children}
    </Popconfirm>
  )
}

export default ConfirmPopUp