import React, { useContext, useEffect, useState } from 'react'
import { MdUpload } from "react-icons/md";
import TableExample from '../../../components/Table/TableExample';
import PSActivados from './PSActivados';
import PSDesactivados from './PSDesactivados';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../../context/AppContext';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import Filter from '../../../components/Filter/Filter';
import { GrDownload } from 'react-icons/gr';
import { Button, Table } from 'antd';
import SelectComp from '../../../components/Select/SelectComp';
import { TableReusable } from '../../../components/Table/TableReusable';

const ProductosServiciosDashboard = () => {

  const { products } = useContext(AppContext)
  useEffect(() => {
    console.log(products)
  }, [])
  
  const navigate = useNavigate();
  
  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <PSActivados/>
      case 1:
        return <PSDesactivados/>
    }
  }

  function newProduct () {
    navigate('/products/new')
  }


  // Define cómo se debe redireccionar cuando se hace clic en una fila
const getRowClickPath = (record) => {
  return `/products/${record.id}`;
};


  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Productos</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'}  HanldeClick={newProduct}/>
        </div>
      </div>
      <div className='row-space-btw'>
        <Filter>
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Estado'}
              options={[
                {
                  value: 'Aprobado',
                  label: 'Aprobado',
                },
                {
                  value: 'Pendiente',
                  label: 'Pendiente',
                },
                {
                  value: 'En proceso',
                  label: 'En proceso',
                },
              ]}
            />
          </div>
        </Filter>
        <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
          <GrDownload/>
          <span>Importar</span>
        </Button>
      </div>
        <TableReusable

          dataSource={products}
          columns={[
            {
              title: 'Nombre',
              dataIndex: 'nombre',
              key: 'nombre',
            },
            {
              title: 'Código',
              dataIndex: 'codigo',
              key: 'codigo',
              render: (text,record) => (
                <>
                {
                  text === null || text.trim().replace(/\s/g, "") === ""?
                  <>-</>
                  :
                  <>{text}</>
                }
                </>
              )
            },
            {
              title: 'Costo',
              dataIndex: 'costo',
              key: 'costo',
              render: (text,record) =>(
                <>
                  {
                    text === null ? 
                    <>$0</>
                    :
                    <>${text}</>
                  }
                </>
              )
            },
            {
              title: 'Precio neto',
              dataIndex: 'neto',
              key: 'neto',
            },
            {
              title: 'Exención de IVA',
              dataIndex: 'iva',
              key: 'iva',
              render: (text,record) =>(
                <>
                {
                  text === null ?
                  <>0</>
                  :
                  <>19</>
                }
                </>
              )
            },
            {
              title: 'Descripción',
              dataIndex: 'email',
              key: 'email',
              render: (text,record) => (
                <>-</>
              )
            },
            {
              title: 'Estado',
              dataIndex: 'activo',
              key: 'activo',
              render: (text, record) => (
                <>
                {
                  record.activo === true ? 
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
                <Button type='primary'  onClick={()=>{navigate(`/products/:${record.key}`)}}>Ver</Button>
              ),
            }
            */
          ]}
          onRowClick={true} 
          getRowClickPath={getRowClickPath}  
        />
    </div>
    

    </>
  )
}

export default ProductosServiciosDashboard