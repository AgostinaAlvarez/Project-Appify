import React, { useContext } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import { AppContext } from '../../../../context/AppContext'
import TableComponent from '../../../../components/Table/TableComponent';

const DocumentosDeVentaRecurrentes = () => {
  const { column_recurrent_sale_issued_table } = useContext(AppContext);
  const dataSource = [
    {
      key:'1',
      client:'Nombre del Cliente',
      document:'N1',
      intervalo:'03/04/2024',
      last_issued: '03/04/2024',
      next_issued: '03/04/2024',
      neto: '$2000',
      bruto: '$2500'
    },
    {
      key:'2',
      client:'Nombre del Cliente',
      document:'N2',
      intervalo:'04/04/2024',
      last_issued: '05/04/2024',
      next_issued: '10/04/2024',
      neto: '$3000',
      bruto: '$3700'
    },
  ]
  return (
    <>
      <div>Docuemntos de venta recurrentes</div>
      <TableComponent dataSource={dataSource} columns={column_recurrent_sale_issued_table}/>
    </>
  )
}

export default DocumentosDeVentaRecurrentes