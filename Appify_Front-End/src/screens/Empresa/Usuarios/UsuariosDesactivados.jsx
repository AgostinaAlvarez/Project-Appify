import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext';
import TableComponent from '../../../components/Table/TableComponent';

const UsuariosDesactivados = () => {
  const { column_users_activate_table } = useContext(AppContext);
  const dataSource = [
    {
      key: '1',
      user: 'Nombre de usuario',
      cargo: 'Pelado 1',
      email: 'usuario@example.com',
      status: 'Activado',
    },
    {
      key: '1',
      user: 'Nombre de usuario',
      cargo: 'Pelado 1',
      email: 'usuario@example.com',
      status: 'Activado',
    },
    {
      key: '1',
      user: 'Nombre de usuario',
      cargo: 'Pelado 1',
      email: 'usuario@example.com',
      status: 'Activado',
    }
  ];
  return (
    <>
      <div>Usuarios Desactivados</div>
      <TableComponent dataSource={dataSource} columns={column_users_activate_table}/>
    </>
  )
}

export default UsuariosDesactivados