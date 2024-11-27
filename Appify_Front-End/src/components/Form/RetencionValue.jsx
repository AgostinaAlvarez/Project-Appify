import React from 'react'

const RetencionValue = ({ value, HandleChange, placeholder }) => {
  return (
    <input
      type='number'
      value={value}
      onChange={HandleChange}
      style={{padding:8}} 
      placeholder={placeholder}
    />
  )
}

export default RetencionValue