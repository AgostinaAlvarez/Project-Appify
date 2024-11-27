import { Button, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { FaFileDownload, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { FaFile } from "react-icons/fa";
import { BsFillClipboard2Fill } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import PrincipalCard from '../../../../components/Card/PrincipalCard'
import { AiFillEdit } from 'react-icons/ai'
import { RiEdit2Fill } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { CiSearch } from 'react-icons/ci'
import SelectComponent from '../../../../components/Select/SelectComponent'
import Filter from '../../../../components/Filter/Filter'
import SelectComp from '../../../../components/Select/SelectComp'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppContext } from '../../../../context/AppContext'
import { updateSubMenuAsideOptions } from '../../../../utils/helpers'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader } from '../../../../components/Loader/Loader'
import { TableReusable } from '../../../../components/Table/TableReusable'
import ModalError from '../../../../components/Modal/ModalError'
import { FaChevronDown } from 'react-icons/fa';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn'
import { BiMailSend } from "react-icons/bi";

import { RiMailSendFill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";


const Detalles = ({project}) =>{

  const { condicionesDePago } = useContext(AppContext)
  
  useEffect(() => {
    //console.log(project.condicion_pago)
    //matchCondicionDePago (project.condicion_pago)
  }, [])

  function formatedDate (project) {
    const date = new Date(project.fecha.split("T")[0])

    return project.fecha.split("T")[0]
    //console.log(date.getDate())
  }

  function matchCondicionDePago (id) {
    const condicion = condicionesDePago.find((item)=>item.id === id)    
    let value;

    if(condicion.nombre === null){
      value = `${condicion.numero_dias} días`
    }else{
      value = condicion.nombre
    }

    return value
    
  }
  
  return(
    <PrincipalCard>
      <div className='column detail-mobile' style={{gap:30,boxSizing:"border-box"}}>
        
        <div className='row-space-btw' style={{width:"100%",fontSize:23,color:"grey"}}>
          <div className='row'>
            <Button style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
              <FiCheck/>
              <span>Aprobar</span>
            </Button>
            <Button style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
              <FiX/>
              <span>Rechazar</span>
            </Button>
          </div>
          <RiEdit2Fill/>
        </div>
        <div className='row-space-btw' style={{fontSize:20,color:"grey"}}>
          <span>N° {project.numero}</span>
          <span>{formatedDate(project)}</span>
        </div>
        <h2>{project.cliente.cliente.razon_social}</h2>
        <h2>Datos principales</h2>
        <div className='proyectos-detail-grid-data proyecto-detail-grid-mobile'>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.cliente.cliente.direccion} - {project.cliente.cliente.comuna} - {project.cliente.cliente.ciudad}</span>
            <span>Dirección</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.cliente.contactos[0].email}</span>
            <span>Email</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.cliente.contactos[0].celular}</span>
            <span>N° de celular</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.vendedor.replace(",", " ")}</span>
            <span>Vendedor</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.comision}</span>
            <span>Comisión</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{ matchCondicionDePago (project.condicion_pago)}</span>
            <span>Condición de pago</span>
          </div>
        </div>
        <h2>Ítems</h2>
        <TableReusable
          columns={[
            {
              title: 'Producto/Servicio',
              dataIndex: 'nombre',
              key: 'nombre',
            },
            {
              title: 'Cantidad',
              dataIndex: 'cantidad',
              key: 'cantidad',
            },
            {
              title: 'Precio',
              dataIndex: 'precio',
              key: 'precio',
            },
            {
              title: '%',
              dataIndex: 'porcentaje_descuento',
              key: 'porcentaje_descuento',
              
            },
            {
              title: 'Neto',
              render: (text,record) => (
                <></>
              )
            },
            {
              title: 'IVA',
              render: (text,record) => (
                <>
                  -
                </>
              ),
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
            },
          ]}
          dataSource={project.productos_servicios.productos}
        />
        

        <div className='row-space-btw proyecto-2detail-grid-mobile' style={{width:"90%",margin:"0 auto"}}>
          <div className='column'>
            <h3>Dirección de despacho</h3>
            <div className='row project-detail-2'>
              <span>Direccion:</span>
              <span>{project.cliente.puntos.lenght === 0 ? null : project.cliente.puntos[0].direccion}</span>
            </div>
            <div className='row project-detail-2'>
              <span>Comuna:</span>
              <span>{project.cliente.puntos.lenght === 0 ? null : project.cliente.puntos[0].comuna}</span>
            </div>
            <div className='row project-detail-2'>
              <span>Ciudad:</span>
              <span>{project.cliente.puntos.lenght === 0 ? null : project.cliente.puntos[0].ciudad}</span>
            </div>
          </div>
          <div className='column'>
            <h3>Plazo de entrega</h3>
            <div className='row'>
              <span>Días hábiles:</span>
              <span>{project.plazo_de_entrega_dias}</span>
            </div>
            <div className='row'>
              <span>Fecha:</span>
              <span>{project.plazo_de_entrega.split("T")[0]}</span>
            </div>
          </div>
        </div>
          

          
      
      </div>

    </PrincipalCard>
  )
}



const OrdenesDeTrabajo = ({project,setProject}) =>{
  const [ loading,setLoading ] = useState(false);
  const [ error,setError ] = useState(false);

  async function createOrdenDeTrabajo () {
    setLoading(true)
    const date = new Date()
    const data = {
      idProyecto: project.id,
      idVendedor: project.idVendedor,
      fecha: `${date.toISOString()}`,
      estado: 'Pendiente',
      user: '1114ad52-f699-4eb8-9a08-ef9e61eaa42a'
    }
    console.log(data)
        
    try {
      const response = await axios.post(`https://appify-black-side.vercel.app/ordenTrabajo/ordenTrabajo`,data)
      console.log(response)
      setProject({...project,orden_trabajo: response.data.payload})
      console.log('data actualizada')
      console.log({...project,orden_trabajo: response.data.payload})
      setError(false)
    } catch (err) {
      console.log(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  
  }

  return(
    <>
        {
          loading === true ?
          <Loader label={'Creando orden de trabajo...'}/>
          :
          <>
            {
              error === true ?
              <ModalError onCancel={()=>{setError(false)}} errorMessage={'Algo salio mal al crear la orden de trabajo!'}/>
              :
              <>
                {
                  project.orden_trabajo ? 
                  <PrincipalCard>
                    <div className='principal-container-column'>
                      <div style={{width:"100%",display:"flex",justifyContent:"flex-end",fontSize:23,color:"grey"}}>
                        <RiEdit2Fill/>
                      </div>
                      <div className='row-space-btw' style={{fontSize:20,color:"grey"}}>
                        <span>N° {project.numero}</span>
                        <span>fecha</span>
                      </div>
        
                      <h2>Plazo de entrega</h2>
        
                      <div className='proyectos-detail-grid-data'>
                        <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
                          <span className='proyectos-detail-grid-value'> - </span>
                          <span>Días hábiles</span>
                        </div>
                        <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
                          <span className='proyectos-detail-grid-value'></span>
                          <span>Fecha</span>
                        </div>
                      </div>
        
                      <h2>Ítems</h2>
        
                      <TableReusable
                        columns={[
                          {
                            title: 'Producto/Servicio',
                            dataIndex:'producto',
                            key:'producto'
                          },
                          {
                            title: 'Cantidad',
                            dataIndex:'cantidad',
                            key:'cantidad'
                          },
                          {
                            title: 'Insumos',
                            dataIndex:'insumos',
                            key:'insumos'
                          },
                          {
                            title: 'Responsable',
                            dataIndex:'responsable',
                            key:'responsable'
                          },
                        ]}
                      />
                      <h2>Notas</h2>
        
                    </div>
                  </PrincipalCard>
                  :
                  <div className='proyectos-ot-new-bg'>
                    <div className='proyectos-ot-new-container' onClick={()=>{createOrdenDeTrabajo()}}>
                        <h3>No hay órdenes de trabajo asociadas al proyecto</h3>
                        <HiPlus className='proyectos-ot-new-icon'/>
                        <h2>Agregar orden</h2>
                    </div>
                  </div>
                }
              </>
            }
          </>
        }
      
    </>
  )
}


const Costos = () =>{
  function newCosto () {
   console.log('nuevoCosto')
  }
  return(
    <>
      <div className="header-costos">
        {/* <Button style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <CiSearch/>
        </Button> */}
        <AddMoreBtn label={'Agregar'} HanldeClick={newCosto}/>
      </div>
      <Table
        dataSource={[
          {
            name:'Costo 1',
            cantidad:1,
            costo: 20,
            total:20
          },
          {
            name:'Costo 1',
            cantidad:1,
            costo: 154.5,
            total:154.5
          },
          {
            name:'Costo 1',
            cantidad:1,
            costo: 9.45,
            total:9.45
          }
        ]}
        columns={
          [
            {
              title: 'Nombre',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Cantidad',
              dataIndex: 'cantidad',
              key: 'cantidad',
            },
            {
              title: 'Costo unitario',
              dataIndex: 'costo',
              key: 'costo',
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
            },
            {
              title: '',
              render: (text, record) => (
                <div style={{display:"flex",alignItems:"center",gap:15}}>
                  <AiFillEdit style={{cursor:"pointer"}}/>
                  <FaTrashAlt style={{cursor:"pointer"}}/>
                </div>
              ),
            },
           
          ]
        } 
         scroll={{ x: 800 }} 
      />

      <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
        <div style={{minWidth:200,padding:20,boxSizing:"border-box",backgroundColor:"#FFFFFF",borderRadius:10}} className='column'>
          <div className='row'>
            <span>Subtotal: </span>
            <span>20000</span>
          </div>
          <div className='row'>
            <span>IVA: </span>
            <span>20000</span>
          </div>
          <div className='row'>
            <span>Total: </span>
            <span>20000</span>
          </div>
        </div>
      </div>
    </>
  )
}


const Facturacion = () =>{
  return (
    <>
      <PrincipalCard>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end",fontSize:23,color:"grey",boxSizing:"border-box"}}>
          <RiEdit2Fill/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <h2>Datos de facturación</h2>

          <div className='proyectos-facturacion-grid-data proyecto-2detail-grid-mobile'>
            
            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>Juan</span>
              <span>Nombre</span>
            </div>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>email@mail.com</span>
              <span>Email</span>
            </div>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>+5693165215</span>
              <span>N° de celular</span>
            </div>

          </div>

          <h2>Datos de despacho</h2>

          <div className='proyectos-facturacion-grid-data'>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>Juan</span>
              <span>Nombre</span>
            </div>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>email@mail.com</span>
              <span>Email</span>
            </div>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>+5693165215</span>
              <span>N° de celular</span>
            </div>

          </div>

          <div className='row-space-btw' style={{padding:"0px 30px",boxSizing:"border-box"}}>

            <div className='column'>
              <span>-</span>
              <span>Dias habiles</span>
            </div>

            <div className='column'>
              <span>08/04/2023</span>
              <span>Fecha</span>
            </div>

          </div>
        </div>
      </PrincipalCard>
      <PrincipalCard>
        <div className='row-space-btw'>
          <h2>Monto a facturar</h2>
          <span className='proyecto-facturacion-monto-facturacion'>$75.000</span>
        </div>
      </PrincipalCard>
    </>
  )
}

const Tesoreria = () =>{
  return(
    <>
      <div className='row-space-btw' style={{marginBottom:20}}>
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
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Tipo'}
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
        <Button>
          Buscar
        </Button>
      </div>
      
      <Table
        dataSource={[]}
        columns={
          [
            {
              title: 'N°',
              dataIndex: 'number',
              key: 'number',
            },
            {
              title: 'Cliente',
              dataIndex: 'cliente',
              key: 'cliente',
            },
            {
              title: 'Vencimiento',
              dataIndex: 'vencimiento',
              key: 'vencimiento',
            },
            {
              title: 'Condicion',
              dataIndex: 'condicion',
              key: 'condicion',
            },
            {
              title: 'Mensaje',
              dataIndex: 'mensaje',
              key: 'mensaje',
            },
            {
              title: 'Bruto',
              dataIndex: 'bruto',
              key: 'bruto',
            },
            {
              title: 'Monto pendiente',
              dataIndex: 'monto pendiente',
              key: 'monto pendiente',
            },
            {
              title: 'Pendiente de deposito',
              dataIndex: 'pendiente',
              key: 'pendiente',
            },
          ]
        }
        scroll={{ x: 800 }} 
      />
    </>
  )
}


const ProyectoDetail = () => {
  const { proyectos,menuOptions,setMenuOptions } = useContext(AppContext)
  const navigate = useNavigate();

  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);
  
  const [ project,setProject ] = useState(null)
  //menu mobile
  const [isDropdownOpen,setIsDropdownOpen] = useState(false);
  const [ layout,setLayout ] = useState(0);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión','/quotes')
    setMenuOptions(updateData)
  }, [])

  const params = useParams()

  useEffect(() => {
    const findProyect = proyectos.find((item)=>item.id === params.id)
    console.log(params.id)
    console.log(findProyect)
  }, [])
  
  useEffect(() => {
    getData()
  }, [])
  
 //menu mobile
 const handleMenuToggle = ()=>{
  setIsDropdownOpen(!isDropdownOpen);
 }
 const handleMenuItemClick = (layoutIndex)=>{
  setLayout(layoutIndex)
  setIsDropdownOpen(false)
 }
  /*Traer la data del proyecto*/
  async function getData (){
    try {
      const response = await axios.get(`https://appify-black-side.vercel.app/projects/project/${params.id}`)
      //console.log(response)
      console.log(response.data.payload[0])
      setProject(response.data.payload[0])
      setError(false)
    } catch (err) {
      console.log(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  const getMenuLabel = () => {
    switch (layout) {
      case 0: return <><FaFile /> Detalles</>;
      case 1: return <><BsFillClipboard2Fill /> Órdenes de trabajo</>;
      case 2: return <><FaMoneyBill /> Costos</>;
      case 3: return <><FaFileInvoiceDollar /> Facturación</>;
      case 4: return <><RiBankFill /> Tesorería</>;
      case 5: return <><FaUserAlt /> Cliente</>;
      default: return "Menu";
    }
  };

  /*Renderizado de la pantalla*/
  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <Detalles project={project}/>
      case 1:
        return <OrdenesDeTrabajo project={project} setProject={setProject}/>
      case 2:
        return <Costos/>
      case 3:
        return <Facturacion/>
      case 4:
        return <Tesoreria/>
      case 5:
        return <Navigate to='/clients/detail/1'/>
    }
  }

  return (
    <>
      <div className='row return-mobile' onClick={()=>{navigate('/quotes')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver</span>
      </div>
    {
      loading === true ?
      <>
        <Loader label={'Cargando...'}/>
      </>
      :
      <>
        {
          error === true ?
          <div>Error!</div>
          :
          <>
            <div className='row-space-btw project-title-mobile' style={{marginBottom:20}}>
              <div className='row project-estado-mobile'>
                <h1>{project.nombre}</h1>
                <div className={project.estado === 'Pendiente' ? 'item-red' : (project.estado === 'Aceptado' ? 'item-green' : 'item-yellow')}>{project.estado}</div>
              </div>
              <div className='row'>
                <Button type='primary'  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
                  <FaFileDownload/>
                  <span>Reporte</span>
                </Button>
                <Button  type='primary'  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
                  <RiMailSendFill style={{fontSize:18}}/>
                  <span>Enviar cotización</span>
                </Button>
              </div>
            </div>
            <div style={{width:"97%",margin:"0px auto"}}>
              {/* MENU DESKTOP */}
              <div className='row-space-btw proyectos-detail-header'>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div key={index} onClick={() => { setLayout(index); }} className={layout === index ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
                      {index === 0 && <><FaFile /><span>Detalles</span></>}
                      {index === 1 && <><BsFillClipboard2Fill /><span>Órdenes de trabajo</span></>}
                      {index === 2 && <><FaMoneyBill /><span>Costos</span></>}
                      {index === 3 && <><FaFileInvoiceDollar /><span>Facturación</span></>}
                      {index === 4 && <><RiBankFill /><span>Tesorería</span></>}
                      {index === 5 && <><FaUserAlt /><span>Cliente</span></>}
                    </div>
                ))}
              </div>
              {/* mENU MOBILE  */}
               <div className='proyecto-detail-header-mobile'>
                  <button className={`menu-detail-btn ${isDropdownOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
                  {getMenuLabel()} <FaChevronDown />
                  </button>
                  {isDropdownOpen && (
                    <div className='mobile-menu-dropdown'>
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <div key={index} onClick={() => handleMenuItemClick(index)} className={layout === index ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
                          {index === 0 && <><FaFile /><span>Detalles</span></>}
                          {index === 1 && <><BsFillClipboard2Fill /><span>Órdenes de trabajo</span></>}
                          {index === 2 && <><FaMoneyBill /><span>Costos</span></>}
                          {index === 3 && <><FaFileInvoiceDollar /><span>Facturación</span></>}
                          {index === 4 && <><RiBankFill /><span>Tesorería</span></>}
                          {index === 5 && <><FaUserAlt /><span>Cliente</span></>}
                        </div>
                      ))}
                    </div>
                  )}
                </div> 
                
              {
              RenderPrincipalComponent()
              }
            </div>
          </>
        }
      </>
    }
    
    </>
  )
}

export default ProyectoDetail