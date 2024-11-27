import { DatePicker, Select, Space } from 'antd'
import React from 'react'

const RegistroCobros = () => {

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  
  return (
    <>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
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
    </>
  )
}

export default RegistroCobros