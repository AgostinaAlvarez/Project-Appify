import React from 'react'
import { Button, ConfigProvider, DatePicker, Slider, Space, Switch, Table } from 'antd';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const FormerBtn = ({setStep,value}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `#FDB738`,
            colorPrimaryHover: `#FDB738`,
            colorPrimaryActive: `#FDB738`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button onClick={()=>{setStep(value)}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
        <BsArrowLeft/>
        <span>Anterior</span>
      </Button>
    </ConfigProvider>
  )
}

export default FormerBtn