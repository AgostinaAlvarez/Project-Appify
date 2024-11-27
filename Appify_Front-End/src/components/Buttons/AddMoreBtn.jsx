import React from 'react'
import { Button, ConfigProvider, DatePicker, Slider, Space, Switch, Table } from 'antd';
import { FaPlus } from "react-icons/fa6";


const AddMoreBtn = ({label,HanldeClick}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `#22D695`,
            colorPrimaryHover: `#22D695`,
            colorPrimaryActive: `#22D695`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button onClick={HanldeClick} style={{display:"flex",alignItems:"center",gap:15}} type="primary" size="large">
        <FaPlus className='btn-icon'/>
        <span id='btn-label'>{label}</span>
     
    
      </Button>
    </ConfigProvider>
  )
}

export default AddMoreBtn