import React, { useContext, useEffect, useState } from 'react'
import TableExample from '../../../components/Table/TableExample'
import UsuariosActivados from './UsuariosActivados';
import UsuariosDesactivados from './UsuariosDesactivados';
import axios from 'axios';
import { Back_URL } from '../../../utils/BackUrl';
import { AppContext } from '../../../context/AppContext';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import Filter from '../../../components/Filter/Filter';
import { Button, Table } from 'antd';
import { FaFileDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TableReusable } from '../../../components/Table/TableReusable';

const UsuariosDashboard = () => {
  //lista de subusuarios:
  const { subusuarios } = useContext(AppContext)
  const navigate = useNavigate(); 
  const [ layout,setLayout ] = useState(0);
  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <UsuariosActivados/>
      case 1:
        return <UsuariosDesactivados/>
    }
  }
  const getRowClickPath = (record) => {
    return `/users/${record.id}`;
  };

  return (
    <>
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <h1>Usuarios</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{navigate('/users/new')}}/>
        </div>
      </div>
      <div className='row-space-btw'>
        <Filter>

        </Filter>

        <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
          <FaFileDownload/>
          <span>Descargar</span>
        </Button>
      </div>
      
      <div style={{width:"85%",margin:"0 auto"}}>
        <TableReusable
          dataSource={subusuarios}
          columns={[
            {
              title: 'Usuario',
              dataIndex: 'nombre',
              key: 'nombre',
            },
            {
              title: 'Cargo',
              dataIndex: 'cargo',
              key: 'cargo',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Estado',
              dataIndex: 'estado',
              key: 'estado',
              render: (text, record) => (
                <>
                {
                  record.estado === 'Activo' ? 
                  <div className='item-green'>Activo</div>
                  :
                  <div className='item-red'>No activo</div>
                }
                </>
              ),
            },
            /*
            {
              title:'',
              render: (text, record) => (
                <Button type='primary'  onClick={()=>{navigate(`/users/${record.key}`)}}>Ver</Button>
              ),
            }
            */
          ]}
          onRowClick={true} 
          getRowClickPath={getRowClickPath} 
        />
        
      </div>


    </div>
    
    </>
  )
}

export default UsuariosDashboard