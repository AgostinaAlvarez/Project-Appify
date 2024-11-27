import React from 'react'

const QuantityValue = ({ selectedItem, increase, decrease,loading }) => {
  return (
    <>
      {
        loading === true || selectedItem === null?
        <>
          <div className='row-space-btw' style={{color:"grey"}}>
            <div>-</div>
            <div>1</div>
            <div>+</div>
          </div>
        </>
        :
        <>
          <div className='row-space-btw'>
            <div style={{cursor:"pointer"}} onClick={decrease}>-</div>
            <div>{selectedItem.cantidad}</div>
            <div style={{cursor:"pointer"}} onClick={increase}>+</div>
          </div>
        </>
      }
    </>
  )
}

export default QuantityValue