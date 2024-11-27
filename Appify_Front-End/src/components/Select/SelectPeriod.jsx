import React from 'react';
import { Select } from 'antd';
export const SelectPeriod = ({ onChange, defaultValue }) => {
  return (
    <Select 
    placeholder="Seleccione el periodo"
    onChange={onChange}
    defaultValue={defaultValue}
    options={[
      {
        value:'mensual',
        label:'Mensual',
      },
      {
        value:'trimestral',
        label:'Trimestral',
      },
      {
        value:'anual',
        label:'Anual',
      },
    ]}
    >
   
    </Select>
  );
};

