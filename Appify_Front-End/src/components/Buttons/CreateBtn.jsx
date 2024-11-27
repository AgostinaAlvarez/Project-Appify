import React from 'react'
import { Button, ConfigProvider, DatePicker, Slider, Space, Switch, Table } from 'antd';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


const CreateBtn = ({label,HanldeClick}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `#47B347`,
            colorPrimaryHover: `#47B347`,
            colorPrimaryActive: `#47B347`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button onClick={HanldeClick} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
        <span>{label}</span>
      </Button>
    </ConfigProvider>
  )
}

export default CreateBtn