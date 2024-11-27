import React from 'react'
import { Button, ConfigProvider, DatePicker, Slider, Space, Switch, Table } from 'antd';
import { CiSearch } from 'react-icons/ci';


const SearchBtn = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `#D5D5D5`,
            colorPrimaryHover: `#D5D5D5`,
            colorPrimaryActive: `#D5D5D5`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button onClick={()=>{setStep(value)}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
        <CiSearch style={{color:"#000"}}/>
      </Button>
    </ConfigProvider>
  )
}

export default SearchBtn