import React, { useContext } from 'react'
import TableExample from '../../../components/Table/TableExample'
import TableComponent from '../../../components/Table/TableComponent';
import { AppContext } from '../../../context/AppContext';

const OrdenesDeTrabajoEnProceso = () => {
  const { columns_work_orders_table } = useContext(AppContext);
  const dataSource = [
    {
      key: '1',
      name: 'Nº 13 - adsfghj',
      status: 'Aceptado',
      date: '04/04',
      compromiso: '22/04',
      cliente: 'Pepito Juan',
      item: 'Producto 1',
      vendedor: 'Juan Nose que'
    },
  ];
  return (
    <>
      <div>ODT en Procesoo</div>
      <TableComponent dataSource={dataSource} columns={columns_work_orders_table}/>
    </>
  )
}

export default OrdenesDeTrabajoEnProceso