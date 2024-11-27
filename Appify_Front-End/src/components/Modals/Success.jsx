import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoCheckmarkOutline } from "react-icons/io5";

const Success = ({message,icon}) => {
  return (
    <div className='alert-modal'>
      <div className='alert-container'>
        <div className='alert-container-icon-container'>
          <IoCheckmarkOutline/>
        </div>
        <h1>{message}</h1>
      </div>
    </div>
  )
}

export default Success