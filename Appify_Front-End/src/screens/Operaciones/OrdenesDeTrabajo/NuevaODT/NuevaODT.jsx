import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { DatePicker, Slider, Switch, Table } from 'antd';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import { FiDownload } from 'react-icons/fi';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import SelectComp from '../../../../components/Select/SelectComp';
import { padding } from '@mui/system';
import NuevoCliente from '../../../Comercial/Clientes/NuevoCliente/NuevoCliente';
import { BsBoxSeam } from 'react-icons/bs';
import NuevoPS from '../../../Empresa/ProductosServicios/NuevoPS/NuevoPS';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Loader } from '../../../../components/Loader/Loader';
import ModalError from '../../../../components/Modal/ModalError';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
import { add_item_proyecto, cancel_changes, decrease_quantity, get_subtotal_proyecto, get_total_proyecto, increase_quantity, item_neto, item_unit_price, productos_restructured_proyecto, remove_item, save_changes } from '../../../../utils/controllers/Proyecto/ProyectoControllers';


const FirstStep = ({
  setStep,
  proyecto,setProyecto,
  selectedClient, setSelectedClient, 
  contactsList,setContactList, 
  contactSelected,setContactSelected, 
  vendedorSelected,setVendedorSelected
}) =>{

  const [ error,setError ] = useState(false)

  //Cliente
  const { clientes,subusuarios } = useContext(AppContext);

  function clientesRestructured (arrayClientes) {
    const updateData = arrayClientes.map((item)=>{
      return {
        ...item, value: item.cliente.id, label: item.cliente.razon_social
      }
    })
    return updateData
  }

  //Contacto
  const [ contactos,setContactos ] = useState([]);

  function contactosRestructured (arrayContactos) {
    const updateData = arrayContactos.map((item)=>{
      return {
        ...item, value: item.id, label: item.nombre
      }
    })
    return updateData
    
  } 
  
  //Vendedor
  function vendedoresRestructured (arrayVendedores) {
    const filterData = arrayVendedores.filter((item)=>item.estado === "Activo")
    const updateData = filterData.map((item)=>{ 
      return {
        ...item, value: item.id, label: item.nombre
      }
    })
    return updateData
  } 

  const [disabled, setDisabled] = useState(false);

  const onChange = (checked) => {
    setDisabled(checked);
  };

  
  function nextStep () {
    setStep(2)
    setError(false)
  }
  
  const [ clientModal,setClientModal ] = useState(false)

  
  

  return (
    <>
      <div className='principal-container-column'>
        
        <h2 style={{fontSize:20}}>Datos principales</h2>
        <div className='form-grid'>
          <div className='column' style={{gap:5}}>
            <div className='row-space-btw'>
              <span className='form-label' style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {}}>Cliente <span style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
              <div style={clientes.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{setClientModal(true)}} >
                <FaUserPlus/>
                <span>Agregar nuevo cliente</span>
              </div>
            </div>
            {
              clientes.length === 0 ?
              <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
                <span>No hay clientes registrados</span>
              </div>
              :
              <SelectComp
                placeholder={'seleccionar cliente'}
                options={clientesRestructured(clientes)}
                value={selectedClient ? selectedClient.value : null}
                HandleChange={(value,record)=>{
                  setSelectedClient(record)
                  setContactSelected(null)
                  setContactList(record.contactos)
                }}
              />

            }

          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label' style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {}}>Contacto <span style={clientes.length === 0 ? {color:"#b9b9b9c4"} :{color:"red"}}>*</span></span>
            {
              clientes.length === 0 ?
              <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 5px", borderRadius:5}}>
                <span>-</span>
              </div>
              :
              <SelectComp
                placeholder={'seleccionar contacto'}
                options={contactosRestructured(contactsList)}
                value={ contactSelected ? contactSelected.label : null }
                HandleChange={(value,record)=>{
                  setContactSelected(record)
                }}
              />

            }
          </div>
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>Nombre de proyecto</span>
          <input style={{padding:8}} value={proyecto.nombre_etiqueta} onChange={(e)=>{
            if(e.target.value.trim().replace(/\s/g, "") === ""){
              setProyecto({...proyecto,nombre_etiqueta: null})
            }else{
              setProyecto({...proyecto,nombre_etiqueta: e.target.value})}
            }
          } placeholder='Ingrese nombre para el proyecto'/>
        </div>

        <div className='form-grid'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
            <SelectComp
              placeholder={'Seleccionar vendedor'}
              options={vendedoresRestructured(subusuarios)}
              value={vendedorSelected ? vendedorSelected.value : null}
              HandleChange={(value,record)=>{
                setVendedorSelected(record)
              }}
            />
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Comisión <span style={{color:"red"}}>*</span></span>
            <input style={{padding:8}} type='number' value={proyecto.comision} onChange={(e)=>{
              if(e.target.value.trim().replace(/\s/g, "") === ""){
                setProyecto({...proyecto,comision: null})
              }else{              
                setProyecto({...proyecto,comision: e.target.value})
              }
            }} placeholder='Ingrese el valor de la comisión' />
          </div>
        </div>

        <div className='principal-grid grid-3-columns'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Condición de pago <span style={{color:"red"}}>*</span></span>
            <SelectComp
                placeholder={'Seleccionar condición de pago'}
                value={proyecto.condicion_de_pago}

                options={[
                  {
                    value: '1',
                    label: '10 días'
                  },
                  {
                    value: '2',
                    label: '15 días'
                  },
                  {
                    value: '3',
                    label: '30 días'
                  },
                  {
                    value: '4',
                    label: '45 días'
                  },
                  {
                    value: '5',
                    label: 'condición creada por el cliente'
                  },
                ]}
                HandleChange={(value,record)=>{
                  setProyecto({...proyecto,condicion_de_pago:value})
                }}
            />
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Moneda</span>
            <SelectComponent/>
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Botón de pago</span>
            <Switch style={{width:"30px"}} size="small" checked={disabled} onChange={onChange} />
          </div>
        </div>
        {
          error === true ?
          <div style={{color:"red"}}>Rellena todo hdp</div>
          :
          <></>
        }


        <div className='container-item-flex-end' style={{marginTop:30}}>
          <FollowingBtn handleClick={nextStep}/>
        </div>

      </div>
      
      {
        clientModal === true ?
        <div className='modal-overlay'>
          <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"0px 20px"}}>
            <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setClientModal(false)}}>x</div>
            <div style={{width:"100%",border:"1px solid black",height:"95%",overflowY:"scroll"}}>
              <NuevoCliente 
                reference={true}
                setClose={setClientModal}
              />
            </div>
          </div>
        </div>
        :
        <></>
      }

    </>
  )
}



const SecondStep = ({setStep,productsList,setProductsList}) => {

  const { products } = useContext(AppContext)
  const [ selectedProduct,setSelectedProduct ] = useState(null)
  const [ loading,setLoading ] = useState(false)
  const [disabled, setDisabled] = useState(false);
  const [ productModal,setProductModal ] = useState(false);

  function loading_changes () {
    setLoading(true)
    setTimeout(() => {
      setSelectedProduct(null)
      setLoading(false)
    }, 90);
  }

  function addProductoServicio (){
    const updateData = add_item_proyecto(selectedProduct,productsList)
    
    if(updateData){
      setProductsList(updateData)
      setSelectedProduct(null)
      loading_changes()
    }else{
      setSelectedProduct(null)
      loading_changes()
      alert('Debes seleccionar al menos un producto o servicio')
    }
  }

  function changeUnitPrice (e) {
    const unitarioValue = parseFloat(e.target.value)
    setSelectedProduct(item_unit_price(unitarioValue,selectedProduct))
  }

  function changeNeto (e) {
    const netoValue = e.target.value
    console.log(netoValue)
    setSelectedProduct(item_neto(netoValue,selectedProduct))
  }

  function percent (e){
    const percent = e.target.value;
    setSelectedProduct(item_percent(percent, selectedProduct))
  }

  function increase () {
    setSelectedProduct(increase_quantity(selectedProduct))
  }

  function decrease () {
    setSelectedProduct(decrease_quantity(selectedProduct))
  }

  function deleteItem (id) {
    setProductsList(remove_item(id,productsList))
  }

  return(
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw form-header-step'>

        <div className='row'>

          <h2 style={{fontSize:20}}>Ítems</h2>
          <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
            <FiDownload />
          </div>

        </div>
        
        <AddMoreBtn label={'Agregar otro producto/servicio'} HanldeClick={addProductoServicio}/>

      </div>

      {
          productsList.length === 0 ?
          <></>
          :
          <div style={{width:"100%",alignItems:"center"}}>
            <Table
              dataSource={productsList}
              columns={
                [
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
                    title: 'Precio Unitario',
                    dataIndex: 'unitario',
                    key: 'unitario',
                  },
                  {
                    title: '%',
                    dataIndex: 'bonificacion',
                    key: 'bonificacion',
                    render: (text) => text ? text : '-'
                  },
                  {
                    title: 'Neto',
                    dataIndex: 'neto',
                    key: 'neto',
                  },
                  {
                    title: 'IVA',
                    dataIndex: 'iva_value',
                    key: 'iva_value',
                    render: (text,record)=>(
                      <>
                        {(record.bruto - record.neto).toFixed(2)}
                      </>
                    )
                  },
                  {
                    title: 'Total',
                    dataIndex: 'bruto',
                    key: 'bruto',
                  },
                  {
                    title: 'Acciones',
                    key: 'actions',
                    render: (text, record) => (
                      <div style={{display:"flex",alignItems:"center",gap:15}}>
                        {
                          record.edit === true ? 
                          <>
                            <MdOutlineRemoveRedEye/>
                          </>
                          :
                          <>
                            <AiFillEdit style={{cursor:"pointer"}} onClick={()=>{
                              const updateData = productsList.map((item)=>{
                                if(item.value === record.value){
                                  return {...item,edit:true}
                                }
                                return {...item,edit:false}
                              })
                              setProductsList(updateData)
                              setSelectedProduct({...record,edit:true})}}
                              
                            />
                            <FaTrashAlt style={{cursor:"pointer"}} onClick={()=>{deleteItem(record.value)}}/>
                          </>
                        }
                      </div>
                    ),
                  },
                ]
              }
            />
            
          </div>
      }

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <div className='row-space-btw form-header-step'>
            <span className='form-label' style={products.length === 0 ? {color:"#b9b9b9c4"} : {}}>Producto/Servicio <span style={products.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
            {
              productsList.find((item)=>item.edit == true) ? 
              <div></div>
              :
              <div className='row' style={products.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} onClick={()=>{setProductModal(true)}}>
                <BsBoxSeam/>
                <span>Agregar nuevo producto/servicio</span>
              </div>
            }
          </div>
          {
            products.length === 0 ?
            <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
              <span>No hay productos registrados</span>
            </div>
            :
            <>
              {
                productsList.find((item)=>item.edit == true) ? 
                <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8}}>{selectedProduct.label}</div>
                :
                <SelectComp
                  placeholder={'Seleccionar producto/servicio '}
                  value={selectedProduct ? selectedProduct.value : null}
                  options={productos_restructured_proyecto(products)}
                  HandleChange={(value,record)=>{
                    setSelectedProduct(null)
                    setTimeout(() => {
                      setSelectedProduct({...record, bonificacion: null,edit: false})                  
                    }, 90);
                  }}
                />

              }

            </>
          }
        </div>
        <div className='column' style={{gap:5}}>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          {
            loading === true || selectedProduct === null?
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
            :
            <>
              <div className='row-space-btw'>
                <div onClick={decrease}>-</div>
                <div>{selectedProduct.cantidad}</div>
                <div onClick={increase}>+</div>
              </div>
            </>
          }
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio unitario <span style={{color:"red"}}>*</span></span>
          {
            loading === true || selectedProduct === null?
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
            :
            <input style={{padding:8}}      
                  type='number' 
                  placeholder='Ingrese el precio' 
                  onChange={changeUnitPrice} 
                  value={selectedProduct ? selectedProduct.unitario : null} 
                  data-iva={selectedProduct ? selectedProduct.iva : null}
            />
          }
        </div>
      </div>

      <div className='principal-grid grid-4-columns'>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>%</span>
          {
            loading === true || selectedProduct === null?
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
            :
            <input 
                style={{padding:8}} 
                type='number'
                value={selectedProduct ? selectedProduct.bonificacion : null}
                onChange={percent}
                
                data-iva={selectedProduct ? selectedProduct.iva : null}

            />
          }
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>Neto</span>
          {
            loading === true || selectedProduct === null?
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
            :
            <input 
              style={{padding:8}} 
              type='number' 
              value={selectedProduct ? selectedProduct.neto : null}   
              onChange={changeNeto}
              data-iva={selectedProduct ? selectedProduct.iva : null}
            />
          }
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>IVA</span>
          {
            loading === true || selectedProduct === null?
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
            :
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8}}>
              {selectedProduct ? (selectedProduct.bruto - selectedProduct.neto).toFixed(2) : ''}
            </div>
          }
        </div>
      
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Total</span>
          {
            loading === true || selectedProduct === null?
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
            :
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8}}>
              {selectedProduct ? selectedProduct.bruto : ''}
            </div>
          }
        </div>

      </div>

      <div className='principal-grid grid-3-columns' style={{marginTop:80}}>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad</span>
          <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8}}>Total cantidad</div>
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ajuste de precio</span>
          <Slider range defaultValue={[0, 50]} disabled={disabled} />
          <span>Subtotal: $ {get_subtotal_proyecto(productsList)}</span>
          <span>IVA(19%): $ {get_total_proyecto(productsList) - get_subtotal_proyecto(productsList)}</span>
          <span>Total: $ {get_total_proyecto(productsList)}</span>
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>%</span>
          <input style={{padding:8}}/>
        </div>

      </div>

      
      

      <div className='row-space-btw' style={{marginTop:30}}>
        {
          productsList.find((item)=>item.edit == true) ? 
          <>
            <CancelBtn 
              label={'Cancelar'} 
              HanldeClick={()=>{
                setProductsList(cancel_changes(productsList))
                loading_changes()               
              }}
            />
            <CreateBtn 
              label={'Guardar cambios'} 
              HanldeClick={()=>{
                setProductsList(save_changes(productsList,selectedProduct))
                loading_changes()
              }}
            />
          </>
          :
          <>
            <FormerBtn setStep={setStep} value={1}/>
            <FollowingBtn setStep={setStep} value={3}/>
          </>
        }
      </div>

    </div>
    {
        productModal === true ?
        <div className='modal-overlay'>
          <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"10px 40px"}}>
            <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setProductModal(false)}}>x</div>
            <div style={{width:"100%",border:"1px solid black",height:"95%",overflowY:"scroll"}}>
              <NuevoPS
                reference={true}
                setClose={setProductModal}
              />
            </div>
          </div>
        </div>
        :
        <></>
      }
    </>
  )
}


const ThirdStep = ({setStep,direcPrestacion,setDirecPrestacion,  }) => {
  return(
    <div className='principal-container-column'>
      <div className='row'>
        <h2>Dirección de despacho</h2>
        <span style={{color:"grey"}}>(Opcional)</span>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Direccion</span>
          <input value={direcPrestacion.direccion} onChange={(e)=>{setDirecPrestacion({...direcPrestacion,direccion:e.target.value})}} style={{padding:6}} placeholder='Ingrese la dirección'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna</span>
          <input value={direcPrestacion.comuna} onChange={(e)=>{setDirecPrestacion({...direcPrestacion,comuna:e.target.value})}} style={{padding:6}} placeholder='Introduce la comuna'/>
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad</span>
          <input style={{padding:6}} value={direcPrestacion.ciudad} onChange={(e)=>{setDirecPrestacion({...direcPrestacion,ciudad:e.target.value})}} placeholder='Ingrese la ciudad'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Atencion a</span>
          <input style={{padding:6}} value={direcPrestacion.atencion_a} onChange={(e)=>{setDirecPrestacion({...direcPrestacion,atencion_a:e.target.value})}} placeholder='Ingrese el nombre del receptor'/>
        </div>
      </div>
      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={2}/>
        <FollowingBtn setStep={setStep} value={4}/>        
      </div>
    </div>
  )
}

const FourthStep = ({setStep,proyecto,setProyecto,direcPrestacion,productsList,vendedorSelected,selectedClient,contactSelected,setErrorScreen,setLoadingScreen}) => {


  const { proyectos,setProyectos,userLoggedData,ordenesDeTrabajo,setOrdenesDeTrabajo } = useContext(AppContext);


  const onChange = (date, dateString) => {
    const fecha = new Date(dateString);
    const fechaMod = fecha.toISOString()
    setProyecto({
      ...proyecto,plazo_de_entrega: fechaMod
    })
  };


  function restructuredItems (itemsArray){
    const updateData = itemsArray.map((item)=>{
      return {
        idProducto: item.id,
        cantidad: item.cantidad,
        porcentaje_descuento: item.bonificacion === null ? 0 : item.bonificacion,
        nombre_impuesto: 'IVA',
        impuesto: item.iva === true ? 0.19 : 0,
        precio: parseFloat(item.unitario),
        total: parseFloat(item.bruto)
      }
    })
    return updateData
  }


  function restructuredItemSetter (itemsArray) {

    const updateData = itemsArray.map((item)=>{
      return {
        idProducto: item.id,
        cantidad: item.cantidad,
        porcentaje_descuento: item.bonificacion === null ? 0 : item.bonificacion,
        nombre_impuesto: 'IVA',
        impuesto: item.iva === true ? 0.19 : 0,
        precio: parseFloat(item.unitario),
        total: parseFloat(item.bruto),
        nombre: item.nombre
      }
    })
    return updateData
  }

  function getTotal (itemsArray){
    let total = 0;
    itemsArray.forEach(element => {
      total = total + parseFloat(element.bruto)
    });
    return total
  }

  function getNeto (itemsArray){
    let neto = 0;
    itemsArray.forEach(element => {
      neto = neto + parseFloat(element.neto)
    });
    return neto
  }

  function createProject () {
    const fecha = new Date()
    const fecha_formated = fecha.toISOString();
    
    const objtData = {
      proyectos: {...proyecto, fecha: fecha_formated,vendedor: vendedorSelected.value,
        cliente: selectedClient.value, contacto: contactSelected.value, 
        comision: proyecto.comision ? parseFloat(proyecto.comision) : null,
        plazo_de_entrega_dias: proyecto.plazo_de_entrega_dias ? parseInt(proyecto.plazo_de_entrega_dias) : null
      },
      direccion_de_prestacion_proyecto:  direcPrestacion,
      item_producto_proyecto: restructuredItems(productsList)
    }
    const objtArray = {
      ...proyecto,
      numero: proyecto.numero_proyecto,
      fecha: fecha_formated,
      vendedor: vendedorSelected.label,
      cliente: selectedClient.label,
      nombre: proyecto.nombre_etiqueta,
      productos_servicios: {
        productos: restructuredItemSetter(productsList),
        servicios: []
      },
      total: getTotal(productsList),
      neto: getNeto(productsList)
    }
    
    console.log(productsList)
    
    console.log('object data')
    console.log(objtData)
    console.log('object array')
    console.log(objtArray)
    
    createProjectBD(objtData,objtArray)
  }

  async function createProjectBD (objtData,objtArray){
    setLoadingScreen(true)
    try {
      const response = await axios.post(`https://appify-black-side.vercel.app/projects/crearProject`, objtData)
      console.log(response)
      const projectId = response.data.payload.proyecto.id

      //console.log(response.data)
      createOT(projectId,objtArray)
    } catch (err) {
      console.log(err)
      setLoadingScreen(false)
      setErrorScreen(true)        
    }
  }

  async function createOT (projectId,objtArray) {
    try{
      const date = new Date()
      const ot = {
        idProyecto: projectId,
        idVendedor: vendedorSelected.value,
        fecha: `${date.toISOString()}`,
        estado: 'Pendiente',
        user: userLoggedData.data.user
      }
      console.log('DATA ORDEN DE TRABAJO')
      console.log(ot)


      const response = await axios.post(`https://appify-black-side.vercel.app/ordenTrabajo/ordenTrabajo`,ot)
      setProyectos([...proyectos, {...objtArray, id: projectId,orden_trabajo: response.data.payload} ])
      
      const otObjt = {
        cliente:selectedClient.label,
        estado:'Pendiente',
        fechaOrden: `${date.toISOString()}`,
        idVendedor: vendedorSelected.value,
        neto: objtArray.neto,
        orden: response.data.payload.id,
        productos_servicios: {
          productos: restructuredItemSetter(productsList),
          servicios: []
        },
        total: objtArray.total,
        vendedor: vendedorSelected.label
      }

      setOrdenesDeTrabajo([...ordenesDeTrabajo, otObjt])

      
      setLoadingScreen(false)
      setStep(5)

      setTimeout(() => {
        setStep(1)
      }, 3000);
      
    }catch(err){
      console.log(err)
      setLoadingScreen(false)
      setErrorScreen(true)
    }
  }

  return(
    <div className='principal-container-column'>
      <div className='row'>
        <h2>Plazo de entrega</h2>
        <span style={{color:"grey"}}>(Opcional)</span>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Dias</span>
          <input style={{padding:8}} placeholder='Ingrese los días hábiles' value={proyecto.plazo_de_entrega_dias} onChange={(e)=>{setProyecto({...proyecto,plazo_de_entrega_dias:e.target.value})}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha</span>
          <DatePicker type='date' onChange={onChange}/>
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas </span>
          <textarea value={proyecto.nota_interna} onChange={(e)=>{setProyecto({...proyecto,nota_interna:e.target.value})}} style={{height:60}}/>
        </div>
      </div>
      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={3}/>
        <CreateBtn label={'Crear orden'} 
        HanldeClick={createProject}
        />
      </div>
    </div>
  )
}



const NuevaODT = ({reference,setClose}) => {

  const {menuOptions,setMenuOptions,userLoggedData} = useContext(AppContext);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/work_orders')
    setMenuOptions(updateData)
  }, [])


  const navigate = useNavigate()

  const [step,setStep] = useState(1)

  //CLIENTE
  const [ selectedClient,setSelectedClient ] = useState(null)
  
  //CONTACTO
  const [ contactSelected,setContactSelected ] = useState(null)
  const [ contactsList,setContactList ] = useState([])

  //VENDEDOR
  const [ vendedorSelected,setVendedorSelected ] = useState(null)

 

  //PROYECTO
  const proyectoInitialState = {
    //id
    user: userLoggedData.data.user,
    numero_proyecto: '1',
    comision: null,
    nombre_etiqueta: null,
    condicion_de_pago: null,
    boton_de_pago: true,
    plazo_de_entrega_dias: null,
    plazo_de_entrega:null,
    nota_interna: null,
    estado: 'Pendiente'
  }

  const [ proyecto,setProyecto ] = useState(proyectoInitialState)

  //PRODUCTOS
  const [ productsList,setProductsList ] = useState([])

  //DIRECCION DE PRESTACION
  const directPrestacionInitialState = {
    punto: null,
    atencion_a: null,
    direccion: null,
    comuna: null,
    ciudad: null,
    duracion:'PT8H'
  }
  const [ direcPrestacion,setDirecPrestacion ] = useState(directPrestacionInitialState)

  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep 
          setStep={setStep}  
          proyecto={proyecto} 
          setProyecto={setProyecto} 
          selectedClient={selectedClient} 
          setSelectedClient={setSelectedClient}
          contactsList={contactsList}
          setContactList={setContactList}
          contactSelected={contactSelected}
          setContactSelected={setContactSelected}
          vendedorSelected={vendedorSelected}
          setVendedorSelected={setVendedorSelected}
        />
      
      case 2:
        return <SecondStep 
        setStep={setStep} 
        productsList={productsList} 
        setProductsList={setProductsList}
        />
      
      case 3:
        return <ThirdStep 
          setStep={setStep}
          direcPrestacion={direcPrestacion}
          setDirecPrestacion={setDirecPrestacion}
          
        />
        
      case 4:
        return <FourthStep 
          setStep={setStep}
          proyecto={proyecto}
          setProyecto={setProyecto}
          direcPrestacion={direcPrestacion}
          productsList={productsList}
          vendedorSelected={vendedorSelected}
          selectedClient={selectedClient}
          contactSelected={contactSelected}
          setErrorScreen={setErrorScreen}
          setLoadingScreen={setLoadingScreen}
        />
      
    }
  }
  


  const [ loadingScreen,setLoadingScreen ] = useState(false);

  const [ errorScreen,setErrorScreen ] = useState(false);
  
  

  return (
    <>
      {
        reference ? 
        <></>
        :
        <div className='row' onClick={()=>{navigate('/work_orders')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
          <FaArrowLeftLong/>
          <span>Volver a  órdenes de trabajo</span>
        </div>
      }
      <h1>Agregar orden de trabajo</h1>
      {
        loadingScreen === true ?
        <Loader label={'Creando orden de trabajo...'} />
        :
        <>
          {
            errorScreen === true ?
            <>
              <ModalError 
                onCancel={()=>{console.log('redireccionar al principal')}}
                onRetry={()=>{console.log('volver a intentar')}}
                errorMessage={'Error al crear el cliente'}
              />              
            </>
            :
            <>
              {
                step === 5 ?
                <Success message={'Orden de trabajo creada con éxito!'}/>
                :
                <PrincipalCard>
                  <div className='step-container'>
                    <div className='step-container-item'>
                      <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
                      <div className='step-item-dot-cta' style={{left:-20}}>1</div>
                      <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>
        
                    </div>
                    <div className='step-container-item'>
                      <div className={step >= 3 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
                      <div className={step >= 3 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>3</div>
                    </div>
                    <div className='step-container-item'>
                      <div className={step >= 4 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
                      <div className={step >= 4 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>4</div>
                    </div>
                  </div>
                  <form className='step-form'>
                    {formSetupSteps()}
                  </form>
                </PrincipalCard>
              }
            </>
          }
        </>
      }
    </>
  )
}

export default NuevaODT