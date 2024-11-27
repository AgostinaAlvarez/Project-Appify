import React, { useContext } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import TableComponent from '../../../../components/Table/TableComponent';
import { AppContext } from '../../../../context/AppContext';

const ConsultasTodas = () => {
  const { columns_quotes_table } = useContext(AppContext);
  const dataSource = [];
  return (
    <>
      <div>Todas las consultas</div>
      <TableComponent dataSource={dataSource} columns={columns_quotes_table}/>
    </>
  )
}

export default ConsultasTodas