import React from 'react'

const InputBasic = ({ value, placeholder, HandleChange }) => {
  return (
    <input 
      style={{border:"1px solid #b9b9b9c4",color:"black",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}
      value={value}
      placeholder={placeholder}
      onChange={HandleChange}
    />
  )
}

export default InputBasic