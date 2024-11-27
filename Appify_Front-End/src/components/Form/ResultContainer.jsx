import React from 'react'

const ResultContainer = ({ children }) => {
  return (
    <div className='column' style={{gap:20}}>
        { children }
    </div>
  )
}

export default ResultContainer