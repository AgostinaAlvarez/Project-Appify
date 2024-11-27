import React, { useContext } from 'react'
import TableExample from '../../../components/Table/TableExample'
import { AppContext } from '../../../context/AppContext';
import TableComponent from '../../../components/Table/TableComponent';

const TableroEnRevision = () => {
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
    {
      key: '2',
      name: 'Nº 13 - prueba 2',
      client: 'Cliente 2',
      item: 'Producto 1',
      fecha: '',
      miembros: ''
    }
  ]


  return (
    <>
        <div>Tablero en revision</div>
        <TableComponent dataSource={dataSource} columns={columns_dashboard_table}/>
    </>
  )
}

export default TableroEnRevision