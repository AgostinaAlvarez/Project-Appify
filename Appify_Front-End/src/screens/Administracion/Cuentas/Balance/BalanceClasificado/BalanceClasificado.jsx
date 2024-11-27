import React from 'react'
import TableExample from '../../../../../components/Table/TableExample'
import { DatePicker, Space } from 'antd'

const BalanceClasificado = () => {
  return (
    <>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div>Balance Clasificado</div>
      <TableExample/>
    </>
  )
}

export default BalanceClasificado