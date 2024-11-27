import React, { useState } from 'react'
import TableExample from '../../../../../components/Table/TableExample'
import { DatePicker, Space } from 'antd'


const FacturasEmitidas = () =>{
  return (
    <>
      <div>Factura Emitidas</div>
      <TableExample/>
    </>
  )
}

const FacturasPendientes = () =>{
  return (
    <>
      <div>Factura Pendientes</div>
      <TableExample/>
    </>
  )
}

const ClienteFacturas = () => {
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch ( layout ) {
      case 0:
        return <FacturasEmitidas/>
      case 1: 
        return <FacturasPendientes/>
    }
  }

  return (
    <>
      <div>ClienteFacturas</div>
      {/*Esta parte es la de facturas*/}
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button onClick={()=>{setLayout(0)}}>EMITIDAS</button>
          <button onClick={()=>{setLayout(1)}}>PENDIENTES</button>
        </div>
        <input placeholder='buscar'/>
      </div>
      {RenderPrincipalComponent()}
    </>
  )
}

export default ClienteFacturas