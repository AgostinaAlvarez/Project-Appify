import React from 'react'
import TableExample from '../../../../components/Table/TableExample'

const DTEPendientes = () => {
  return (
    <>
      <div style={{justifyContent:"flex-start"}} className='row-test'>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      <div>DTE Pendientes</div>
      <TableExample/>
    </>
  )
}

export default DTEPendientes