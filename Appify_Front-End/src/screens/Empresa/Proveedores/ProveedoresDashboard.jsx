import React, { useContext, useEffect, useState } from 'react'
import TableExample from '../../../components/Table/TableExample'
import ProveedoresActivados from './ProveedoresActivados';
import ProveedoresDesactivados from './ProveedoresDesactivados';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import { Button, Table } from 'antd';
import { TableReusable } from '../../../components/Table/TableReusable';

const ProveedoresDashboard = () => {
  
  const { proveedores } = useContext(AppContext);

  useEffect(() => {
    console.log(proveedores)
  }, [])
  

  const navigate = useNavigate();
  
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <ProveedoresActivados/>
      case 1:
        return <ProveedoresDesactivados/>
    }
  }

  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Proveedores</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{navigate('/providers/new')}}/>
        </div>
      </div>
      <TableReusable
        columns={[
          {
            title: 'Razón social / Nombre',
            dataIndex: 'razon_social',
            key: 'razon_social',
          },
          {
            title: 'Rut',
            dataIndex: 'rut',
            key: 'rut',
          },
          {
            title: 'Contacto',
            dataIndex: 'contacto',
            key: 'contacto',
          },
          {
            title: 'Telefono',
            dataIndex: 'telefono',
            key: 'telefono',
          },
          {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (text, record) => (
              <>
              {
                record.estado === "Activo" ? 
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
              <Button type='primary'  onClick={()=>{console.log('ver')}}>Ver</Button>
            ),
          }
          */
        ]}
        dataSource={proveedores}
        onRowClick={false} 
      />
      

    </div>
    {
      /*
      <div className='row-test' style={{justifyContent:"flex-end"}}>
        <button onClick={()=>{navigate('/providers/new')}}>agregar</button>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button onClick={()=>{setLayout(0)}} className={ layout === 0 ? 'btn-cta' : 'btn' }>Activado</button>
          <button onClick={()=>{setLayout(1)}} className={ layout === 1 ? 'btn-cta' : 'btn' }>Desactivado</button>
        </div>
        <input placeholder='buscar'/>
      </div>
      {
        proveedores === null ?
        <div>Error al cargar los datos</div>
        :
        <>{RenderPrincipalComponent()}</>
      }
      
      
      */
    }
    </>
  )
}

export default ProveedoresDashboard