import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Modal = () => {
  const {modalContent,setModal} = useContext(AppContext)
  return (
    <div className='modal-overlay'>
        <div className='modal'>
            <button onClick={()=>{setModal(false)}}>cerrar</button>
            {modalContent}
        </div>
    </div>
  )
}

export default Modal