import React from 'react'

const ResultsRow = ({ text, amount_deducted }) => {
  return (
    <div className='row'>
      <span>{text}</span>
      <span>$ {amount_deducted}</span>
    </div>
  )
}

export default ResultsRow