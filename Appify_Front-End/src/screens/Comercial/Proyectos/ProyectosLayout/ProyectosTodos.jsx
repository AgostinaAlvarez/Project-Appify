import React, { useContext } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import TableComponent from '../../../../components/Table/TableComponent'
import { AppContext } from '../../../../context/AppContext';

const ProyectosTodos = () => {
  const { columns_proyects_table } = useContext(AppContext);

  const dataSource = [
    {
      key: '1',
      name: 'Nº 14 - keonda',
      status: 'Aceptado',
      date: '04/04',
      client: 'Pepito Juan',
      item: 'Producto 1',
      vendedor: 'Juan Aguilera',
      neto: 12334,
      total:15000
    },
    {
      key: '2',
      name: 'Nº 13 - adsfghj	',
      status: 'Aceptado',
      date: '03/04',
      client: 'Pepito Juan',
      item: 'Servicio 1',
      vendedor: 'Juan Aguilera',
      neto: 12334,
      total:15000
    }
  ];

  return (
    <>  
      <div>Todos los proyectos</div>
      <TableComponent dataSource={dataSource} columns={columns_proyects_table}/>
    </>
  )
}

export default ProyectosTodos