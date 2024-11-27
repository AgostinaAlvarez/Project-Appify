import React, { useContext } from 'react'
import TableExample from '../../../components/Table/TableExample'
import TableComponent from '../../../components/Table/TableComponent';
import { AppContext } from '../../../context/AppContext';

const TableroAceptados = () => {
  const { columns_dashboard_table } = useContext(AppContext);
  const dataSource = [
    {
      key: '1',
      name: 'Nº 11 - prueba 2',
      client: 'Cliente 1',
      item: 'Producto 1',
      fecha: '',
      miembros: ''
    },
    
  ]
  return (
    <>
      <div>Tablero Aceptados</div>
      <TableComponent dataSource={dataSource} columns={columns_dashboard_table}/>
    </>
  )
}

export default TableroAceptados