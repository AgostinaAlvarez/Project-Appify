import React, { useContext } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import { AppContext } from '../../../../context/AppContext'
import TableComponent from '../../../../components/Table/TableComponent';

const DocumentosDeVentaEmitidos = () => {
  const { columns_sale_invoices_issued_table } = useContext(AppContext);
  const dataSource = [
    {
      key:'1',
      id:'DDV-1',
      cliente:'Nombre del Cliente',
      vendedor:'Vendedor',
      date:'03/04/2024',
      neto: '$1234',
      bruto: '$2000'
    }
  ]
  return (
    <>
      <div>Documentos de venta emitidos</div>
      <TableComponent dataSource={dataSource} columns={columns_sale_invoices_issued_table}/>
    </>
  )
}

export default DocumentosDeVentaEmitidos