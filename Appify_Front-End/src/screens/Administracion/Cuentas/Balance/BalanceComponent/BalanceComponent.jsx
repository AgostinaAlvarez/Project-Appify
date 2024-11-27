import { DatePicker, Space } from 'antd'
import React from 'react'
import TableExample from '../../../../../components/Table/TableExample'

const BalanceComponent = () => {
  return (
    <>
      <div className='row-space-btw-test'>
        <input placeholder='buscar' style={{padding:10}}/>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div>Balance</div>
      <TableExample/>
    </>
  )
}

export default BalanceComponent