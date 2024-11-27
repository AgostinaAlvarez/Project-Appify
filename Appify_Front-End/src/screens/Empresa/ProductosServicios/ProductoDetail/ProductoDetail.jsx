import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext'
import { updateSubMenuAsideOptions } from '../../../../utils/helpers'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getProductById } from '../../../../utils/api/Productos/getProductoById';
import { getProductoByIdFunction } from '../../../../utils/controllers/Productos/ProductoController';
import { FaArrowLeftLong } from 'react-icons/fa6';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { AiFillEdit } from "react-icons/ai";
import { MdImage } from 'react-icons/md';
import { Table } from 'antd';

const ProductoDetail = () => {
  /*
  const { userLoggedData,menuOptions,setMenuOptions } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();

  const [ product,setProduct ] = useState(null)
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Mi Empresa','/products')
    setMenuOptions(updateData)
  }, [])


  const [ loading,setLoading ] = useState(true)
  const [ error,setErrror ] = useState(false)

  useEffect(() => {
    getDataProduct()
  }, [])
  

  async function getDataProduct () {
    const response = await getProductoByIdFunction(userLoggedData.id,params.id,setErrror,setLoading);
    //console.log(response)
    response ? setProduct(response) : setProduct(null)
  }
  */

  const navigate = useNavigate()

  return (
    <>
    <div className='principal-container-column'>
      <div className='row' onClick={()=>{navigate('/products')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a productos</span>
      </div>
      <PrincipalCard>
        <div className='principal-container-column'>
          
          <div className='container-item-flex-end'>
            <AiFillEdit style={{fontSize:23,color:"grey"}}/>
          </div>
          
          <h1>Producto 1</h1>

          <div className='profile-header-container'>
            <div className='profile-img-container'>
              <MdImage/>
            </div>
          </div>

          <div className='principal-grid grid-4-columns' style={{border:"1px solid black",marginTop:30,padding:"25px 0px"}}>
            <div className='column' style={{alignItems:"center"}}>
              <span >Precio</span>
              <span>$2000</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >IVA</span>
              <span>si</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >En venta</span>
              <span>SI</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Notas</span>
              <span>-</span>
            </div>
          </div>

          
        </div>
      </PrincipalCard>

      <PrincipalCard>
        <div className='principal-container-column'>

          <div className='principal-grid grid-5-columns' style={{border:"1px solid black",marginTop:30,padding:"25px 0px"}}>
            <div className='column' style={{alignItems:"center"}}>
              <span >Codigo</span>
              <span>AB0023</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Codigo de barras</span>
              <span>AB0023</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Medidas</span>
              <span>4kg</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Costo estimado</span>
              <span>-</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Exención de impuestos</span>
              <span>5%</span>
            </div>
          </div>

        </div>
      </PrincipalCard>
      
      <PrincipalCard>
        <div className='principal-container-column'>
          <div className='principal-grid grid-4-columns' style={{border:"1px solid black",marginTop:30,padding:"25px 0px"}}>
            <div className='column' style={{alignItems:"center"}}>
              <span >Producto vinculado</span>
              <span>Proucto 1</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Cantidad</span>
              <span>3</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Servicio vinculado</span>
              <span>Servicio 1</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Cantidad</span>
              <span>2</span>
            </div>
          </div>

        </div>
      </PrincipalCard>

      <PrincipalCard>
        <div className='principal-container-column'>
          <div className='principal-grid grid-5-columns' style={{border:"1px solid black",marginTop:30,padding:"25px 0px"}}>
            <div className='column' style={{alignItems:"center"}}>
              <span >Mínimo stock</span>
              <span>5</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Máximo stock</span>
              <span>20</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Proveedor</span>
              <span>Proveedor 1</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Unidad de  medida</span>
              <span>50kg</span>
            </div>
            <div className='column' style={{alignItems:"center"}}>
              <span >Cantidad</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </PrincipalCard>
    </div>

    {
      /*
      
      loading === true ?
      <div>Loading Screen</div>
      :
      <>
        {
          error === true ?
          <div>Error en la obtencion de los datos </div>
          :
          <>
            {
              
              product  === null?
              <>
                <div>No se encontro el producto</div>
              </>
              :
              <>
                <div className='row-test'>
                  <h2 style={{color:"red"}} onClick={()=>{navigate('/products')}}>Servicios</h2>
                  <h2>Información Detallada</h2>
                </div>
                <div onClick={()=>{navigate(`/products/${params.id}/edit`)}}>Editar</div>
                <div className='row-test' style={{alignItems:"flex-start"}}>
                  <div style={{height:90,width:90,borderRadius:"50%",border:"1px solid black"}}></div>
                  <div className='column-test'>
                    <h3>{product.nombre}</h3>
                    <div>
                      <span>Precio: </span>
                      <span>${product.precio}</span>
                    </div>
                  </div>
                </div>
                <h3>Campos Avanzados</h3>
                <div className='row-test'> 
                  <div>
                    <span>Codigo</span>
                    <span>Nmro</span>
                  </div>
                  <div>
                    <span>Codigo barra</span>
                    <span>Nmro</span>
                  </div>
                  <div>
                    <span>U. de medida</span>
                    <span>Nmro</span>
                  </div>
                  <div>
                    <span>Costo estimado</span>
                    <span>Nmro</span>
                  </div>
                </div>
                <div className='row-test'>
                  <div>
                    <span>Proveedor</span>
                    <span>No disponible</span>
                  </div>
                  <div>
                    <span>Manejo Stock</span>
                    <span>No</span>
                  </div>
                </div>
                <div className='row-test'>
                  <div>
                    <span>Notas</span>
                    <span> </span>
                  </div>
                </div>
              </>
              
            }
          </>
        }
      </>

      */
    }
    </>
  )
}

export default ProductoDetail