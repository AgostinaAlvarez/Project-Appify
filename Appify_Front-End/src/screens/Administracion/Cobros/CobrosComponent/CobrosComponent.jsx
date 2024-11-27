import { DatePicker, Select, Space } from 'antd';
import React, { useState } from 'react'
import CobrosPendientes from './CobrosPendientes';
import CobrosEnProceso from './CobrosEnProceso';
import CobrosFinalizados from './CobrosFinalizados';

const CobrosComponent = () => {
  
  const [ layout,setLayout ] = useState(0);

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  function RenderPrincipalComponent () {
    switch (layout){
      case 0:
        return <CobrosPendientes/>
      case 1:
        return <CobrosEnProceso/>
      case 2:
        return <CobrosFinalizados/>
    }
  }

  return (
    <>
      {
        layout === 0 || layout === 1 ?
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
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>PENDIENTE</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>EN PROCESO</button>
          <button className={layout === 2 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(2)}}>FINALIZADOS</button>
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
      {
        RenderPrincipalComponent()
      }
    </>
  )
}

export default CobrosComponent