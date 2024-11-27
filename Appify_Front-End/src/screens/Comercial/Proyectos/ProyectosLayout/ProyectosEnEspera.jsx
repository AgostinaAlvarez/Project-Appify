import React, { useContext } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import TableComponent from '../../../../components/Table/TableComponent';
import { AppContext } from '../../../../context/AppContext';

const ProyectosEnEspera = () => {
  const { columns_proyects_table } = useContext(AppContext);

  const dataSource = [
  ];


  return (
    <>
      <div>Proyectos en espera</div>
      <TableComponent dataSource={dataSource} columns={columns_proyects_table}/>
    </>
  )
}

export default ProyectosEnEspera