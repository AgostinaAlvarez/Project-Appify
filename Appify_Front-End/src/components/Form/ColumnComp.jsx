import React from 'react'

const ColumnComp = ({ children, prop }) => {
  return (
    <div className='column' style={ prop ? prop : null}>
      {children}
    </div>
  )
}

export default ColumnComp