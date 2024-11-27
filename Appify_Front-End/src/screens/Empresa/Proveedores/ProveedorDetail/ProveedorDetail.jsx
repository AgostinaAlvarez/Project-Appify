import React, { useContext, useEffect, useState } from 'react'
import SelectComponent from '../../../../components/Select/SelectComponent'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../../../context/AppContext';
import ProvedorPrincipalComponent from './ProvedorPrincipalComponent';
import ProvedorFacturasComponent from './ProvedorFacturasComponent';
import { getProveedorByIdFunction } from '../../../../utils/controllers/Proveedores/ProveedoresController';

const ProveedorDetail = () => {

  const params = useParams();
  const navigate = useNavigate();

  const { userLoggedData } = useContext(AppContext);

  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);

  const [ layout,setLayout ] = useState(0);

  const [ proveedor,setProveedor ] = useState(null);

  function RenderPrincipalComponent () {
    switch (layout){
      case 0:
        return <ProvedorPrincipalComponent proveedor={proveedor}/>
      case 1:
        return <ProvedorFacturasComponent/>
    }
  }

  useEffect(() => {
    dataProveedor()
  }, [])
  

  async function dataProveedor () {
    const response = await getProveedorByIdFunction(userLoggedData.id,params.id,setError,setLoading)
    response ? setProveedor(response) : setProveedor(null)
  }

  return (
    <>
    {
      loading === true ?
      <div>Loading Screen</div>
      :
      <>
      {
        error === true ?
        <div>Error al obtener los datos</div>
        :
        <>
          {
            proveedor ?
            <>
              <div className='row-space-btw-test'>
                <div className='row-test'>
                  <h2 onClick={()=>{navigate('/providers')}} style={{color:"red"}}>Proveedores</h2>
                  <h2>Informacion Detallada</h2>
                </div>
                <input placeholder={proveedor.razon_social} style={{padding:10}}/>
              </div>
              <div className='row-test'>
                <div onClick={()=>{setLayout(0)}} className={layout === 0 ? 'btn-cta' : 'btn'}>RESUMEN</div>
                <div onClick={()=>{setLayout(1)}} className={layout === 1 ? 'btn-cta' : 'btn'}>FACTURAS</div>
              </div>
              {
                RenderPrincipalComponent()
              }
            </>
            :
            <>
              <div>No se encontro el proveedor</div>
            </>
          }
        </>

      }
      </>
    }
    </>
  )
}

export default ProveedorDetail