import { DatePicker, Select, Space } from 'antd';
import React, { useState } from 'react'
import PagosPorAprobar from './PagosPorAprobar';
import PagosPendientes from './PagosPendientes';
import PagosEnProceso from './PagosEnProceso';
import PagosFinalizados from './PagosFinalizados';

const PagosComponent = () => {
  const [ layout,setLayout ] = useState(0);

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  function RenderPrincipalComponent () {
    switch (layout){
      case 0:
        return <PagosPorAprobar/>
      case 1:
        return <PagosPendientes/>
      case 2:
        return <PagosEnProceso/>
      case 3:
        return <PagosFinalizados/>
    }
  }

  return (
    <>
      {
        layout === 2 || layout === 3 ?
        <button>Masivo</button>
        :
        <></>
      }
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>POR APROBAR</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>PAGO PENDIENTE</button>
          <button className={layout === 2 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(2)}}>EN PROCESO</button>
          <button className={layout === 3 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(3)}}>FINALIZADO</button>
        </div>
        <div className='row-test'>
          <Select defaultValue="documentos" style={{ width: 150 }} onChange={handleChange}>
            <Option value="documentos">Documentos</Option>
            <Option value="aceptado">Aceptado</Option>
            <Option value="en-proceso">En proceso</Option>
            <Option value="en-revision">En revision</Option>
            <Option value="finalizado">Finalizado</Option>
          </Select>
          <input placeholder='buscar' style={{padding:10}}/>
        </div>
      </div>
      {RenderPrincipalComponent()}
    </>
  )
}

export default PagosComponent