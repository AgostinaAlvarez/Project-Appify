import React, { useContext } from 'react'
import TableExample from '../../../components/Table/TableExample'
import { AppContext } from '../../../context/AppContext';
import TableComponent from '../../../components/Table/TableComponent';

const ClientesDesactivados = () => {

  const { columns_clients_table,clientes } = useContext(AppContext);
  const dataSource = clientes.filter((item)=>item.activo === true);
  
  return (
    <>
      <div>Clientes Desactivados</div>
      <TableComponent dataSource={dataSource} columns={columns_clients_table}/>
    </>
  )
}

export default ClientesDesactivados