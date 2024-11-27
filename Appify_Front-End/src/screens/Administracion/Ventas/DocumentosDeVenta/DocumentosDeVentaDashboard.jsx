import { DatePicker, Space } from 'antd'
import React, { useState } from 'react'
import SelectComponent from '../../../../components/Select/SelectComponent';
import TableExample from '../../../../components/Table/TableExample';
import { Select } from 'antd';
import DocumentosDeVentaEmitidos from './DocumentosDeVentaEmitidos';
import DocumentosDeVentaPendientes from './DocumentosDeVentaPendientes';
import DocumentosDeVentaRecurrentes from './DocumentosDeVentaRecurrentes';


const DocumentosPendientesHeader = () =>{
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  return (
    <>
      <div className='row-test' style={{padding:5}}>
        <span>Estado</span>
        <Select defaultValue="todos" style={{ width: 150 }} onChange={handleChange}>
          <Option value="todos">Todos</Option>
          <Option value="aceptado">Aceptado</Option>
          <Option value="en-proceso">En proceso</Option>
          <Option value="en-revision">En revision</Option>
          <Option value="finalizado">Finalizado</Option>
        </Select>
      </div>
      <input placeholder='buscar' style={{padding:10}}/>
    </>
  )
}

const DocumentosEmitidosHeader = () =>{
  return(
    <>
      <SelectComponent/>
      <SelectComponent/>
      <input placeholder='buscar' style={{padding:10}}/>
    </>
  )
}
const DocumentosRecurrentesHeader = () =>{
  return(
    <>
      <SelectComponent/>
      <input placeholder='buscar' style={{padding:10}}/>
    </>
  )
}
const DocumentosDeVentaDashboard = () => {
  
  const [ layout,setLayout ] = useState(0);

  function RenderHeaderComponent  () {
    switch (layout) {
      case 0:
        return <DocumentosEmitidosHeader/>
      case 1:
        return <DocumentosPendientesHeader/>
      case 2:
        return <DocumentosRecurrentesHeader/>
    }
  }

  function RenderComponent () {
    switch (layout) {
      case 0:
        return <DocumentosDeVentaEmitidos/>
      case 1:
        return <DocumentosDeVentaPendientes/>
      case 2:
        return <DocumentosDeVentaRecurrentes/>
    }
  }

  return (
    <>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div className='row-space-btw-test' style={{alignItems:"flex-start"}}>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>EMITIDAS</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>PENDIENTES</button>
          <button className={layout === 2 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(2)}}>RECURRENTE</button>
        </div>
        {RenderHeaderComponent()}
      </div>
      {RenderComponent()}
      {
        //<TableExample/>
      }
    </>
  )
}

export default DocumentosDeVentaDashboard