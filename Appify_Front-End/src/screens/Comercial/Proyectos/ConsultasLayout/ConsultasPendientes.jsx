import React, { useContext } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import { AppContext } from '../../../../context/AppContext';
import TableComponent from '../../../../components/Table/TableComponent';

const ConsultasPendientes = () => {
  const { columns_quotes_table } = useContext(AppContext);
  const dataSource = [
    
  ];
  return (
    <>
      <div>Consultas pendientes</div>
      <TableComponent dataSource={dataSource} columns={columns_quotes_table}/>
    </>
  )
}

export default ConsultasPendientes