import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Overlay = () => {
  const  { modalContent,setModal} = useContext(AppContext)
  return (
    <div className='private-overlay'>
      <div className='private-modal'>
        <button onClick={()=>{setModal(false)}} className='private-modal-btn'>x</button>
        {modalContent}
      </div>
    </div>
  )
}

export default Overlay