import { Radio } from 'antd'
import React from 'react'

const RadioGroupComponent = ({ HandleChange, value, opt1, opt2 }) => {
  return (
    <Radio.Group 
      onChange={HandleChange}
      value={value}
    >
      <Radio value={true}>{opt1}</Radio>
      <Radio value={false}>{opt2}</Radio>
    </Radio.Group>
  )
}

export default RadioGroupComponent