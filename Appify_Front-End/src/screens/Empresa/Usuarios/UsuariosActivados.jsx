import React, { useContext } from 'react'
import TableComponent from '../../../components/Table/TableComponent';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Button, Select } from "antd";


const UsuariosActivados = () => {
  const { 
    //column_users_activate_table,
  subusuarios } = useContext(AppContext);

  const navigate = useNavigate();

  const column_users_activate_table = [
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Cargo',
      dataIndex: 'cargo',
      key: 'cargo',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:6}}>
          <MdOutlineModeEditOutline onClick={()=>{navigate(`/users/${record.id}/edit`)}}/>
          <Button type="primary" onClick={() => {
            console.log(record.id)
            navigate(`/users/${record.id}`)
          }}>
            Ver
          </Button>
        </div>
      ),
    },
  ];

  

  const dataSource = subusuarios;
  return (
    <>
      <div>Usuarios Activados</div>
      <TableComponent dataSource={dataSource} columns={column_users_activate_table}/>
    </>
  )
}

export default UsuariosActivados