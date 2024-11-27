import React, { useContext } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import { AppContext } from '../../../../context/AppContext';
import TableComponent from '../../../../components/Table/TableComponent';

const DocumentosDeVentaPendientes = () => {
  const { columns_pending_sale_issued_table } = useContext(AppContext);
  const dataSource = [
    {
      key:'1',
      code:'N1',
      client:'Nombre del Cliente',
      compromiso:'03/04/2024',
      total: '$1234',
      insoluto: '$2000'
    },
    {
      key:'2',
      code:'N1',
      client:'Nombre del Cliente',
      compromiso:'03/04/2024',
      total: '$1234',
      insoluto: '$2000'
    },
    {
      key:'3',
      code:'N1',
      client:'Nombre del Cliente',
      compromiso:'03/04/2024',
      total: '$1234',
      insoluto: '$2000'
    }
  ]

  return (
    <>
      <div>Documentos de venta pendientes</div>
      <TableComponent dataSource={dataSource} columns={columns_pending_sale_issued_table}/>
    </>
  )
}

export default DocumentosDeVentaPendientes