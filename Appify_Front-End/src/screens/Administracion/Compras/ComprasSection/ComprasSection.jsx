import { DatePicker, Space } from 'antd';
import React, { useState } from 'react'
import DocumentosDeCompra from './DocumentosDeCompra/DocumentosDeCompra';
import OrdenesDeCompra from './OrdenesDeCompra/OrdenesDeCompra';

const ComprasSection = () => {
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <DocumentosDeCompra/>
      case 1:
        return <OrdenesDeCompra/>
    }
  }

  return (
    <>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>DOCUMENTOS DE COMPRA</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>ORDENES DE COMPRA</button>
        </div>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      { RenderPrincipalComponent() }
    </>
  )
}

export default ComprasSection