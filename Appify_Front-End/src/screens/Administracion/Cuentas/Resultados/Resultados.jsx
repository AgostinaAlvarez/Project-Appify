import { DatePicker, Select, Space } from 'antd'
import React from 'react'
import TableExample from '../../../../components/Table/TableExample';

const Resultados = () => {

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }


  return (
    <>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Select defaultValue="mensual" style={{ width: 150 }} onChange={handleChange}>
          <Option value="mensual">Mensual</Option>
          <Option value="aceptado">Aceptado</Option>
          <Option value="en-proceso">En proceso</Option>
          <Option value="en-revision">En revision</Option>
          <Option value="finalizado">Finalizado</Option>
        </Select>
        <div className='row-test'>
          <div>Icon 1</div>
          <div>Icon 2</div>
        </div>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <TableExample/>
    </>
  )
}

export default Resultados