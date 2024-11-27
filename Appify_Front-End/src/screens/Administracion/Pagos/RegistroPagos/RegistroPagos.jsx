import { DatePicker, Space } from 'antd'
import React from 'react'
import TableExample from '../../../../components/Table/TableExample'

const RegistroPagos = () => {
  return (
    <>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      <TableExample/>
    </>
  )
}

export default RegistroPagos