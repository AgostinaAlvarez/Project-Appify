import React from 'react'

const FieldComp = ({ required, text}) => {
  return (
   <span className='form-label'>
    {text}
    {required ? <span style={{color:"red"}}> * </span> : <></>}
   </span>
  )
}

export default FieldComp