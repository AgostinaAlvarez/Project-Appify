import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import { updateDispachDash, updateSubMenuAsideOptions } from '../../../../../utils/helpers';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Success from '../../../../../components/Modals/Success';
import PrincipalCard from '../../../../../components/Card/PrincipalCard';
import { DatePicker, Radio, Table } from 'antd';
import SelectComponent from '../../../../../components/Select/SelectComponent';
import FollowingBtn from '../../../../../components/Buttons/FollowingBtn';
import AddMoreBtn from '../../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import FormerBtn from '../../../../../components/Buttons/FormerBtn';
import { FiDownload, FiFileText } from 'react-icons/fi';
import CreateBtn from '../../../../../components/Buttons/CreateBtn';
import SelectComp from '../../../../../components/Select/SelectComp';
import NuevoCliente from '../../../../Comercial/Clientes/NuevoCliente/NuevoCliente';
import Modal from '../../../../../components/Modal/Modal';
import { BsBoxSeam } from 'react-icons/bs';
import NuevoPS from '../../../../Empresa/ProductosServicios/NuevoPS/NuevoPS';
import NuevaODT from '../../../../Operaciones/OrdenesDeTrabajo/NuevaODT/NuevaODT';

const FirstStep = ({setStep}) =>{
  const { clientes,transportistas } = useContext(AppContext);

  function clientesRestructured (arrayClientes) {
    const updateData = arrayClientes.map((item)=>{
      return {
        ...item, value: item.cliente.id, label: item.cliente.razon_social
      }
    })

    return updateData
  }

  const [ clientModal,setClientModal ] = useState(false)
  const [ transportistaModal,setTransportistaModal ] = useState(false)

  return (
  <> 
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Información de documento</h2>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
          <SelectComp
            placeholder={'Seleccionar tipo de documento'}
            options={[
              {
                value:1,
                label:'Solo traslado'
              },
              {
                value:2,
                label:'Constituye venta'
              }
            ]}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>N° de documento</span>
          <input style={{padding:8}}/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha despacho <span style={{color:"red"}}>*</span></span>
          <DatePicker picker='date'/>
        </div>
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
              HandleChange={(value,record)=>{
                //console.log(`seleccionado ${value} ${record.label}`)
                //console.log(value)
                //const clientContact = clientes.find((item)=>item.cliente.id === value)
                //console.log(clientContact.contactos)
                //setContactos(clientContact.contactos)
                //////////////////////////
  
                //setContactosList(clientContact.contactos)
  
                //setContactSelected(null)
                
                //setClientName(record.label)
                //setData({
                //  ...data, cliente: value
                //})
                //setear a null el contacto
                //setContactvalue(null)
  
                //setClientSelected(record)
              }}
              options={clientesRestructured(clientes)}
              //value={clientSelected ? clientSelected.value : null}
              //value={data.cliente ? data.cliemte : null}
            />
          }
        </div>
      </div>


      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <div className='row-space-btw'>
            <span className='form-label' style={transportistas.length === 0 ? {color:"#b9b9b9c4"} : {}}>Transportista <span style={transportistas.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
            <div style={transportistas.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{
              setTransportistaModal(true)
            }} >
              <FaUserPlus/>
              <span>Agregar transportista</span>
            </div>
          </div>
          {
            transportistas.length === 0 ?
            <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
              <span>No hay clientes registrados</span>
            </div>
            :
            <SelectComp 
              placeholder={'Seleccionar transportista'}
              options={[]}
            />
          }
        </div>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Dirección</span>
          <input style={{padding:8}} placeholder='Ingrese la dirección'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna</span>
          <input style={{padding:8}} placeholder='Ingrese la comuna'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad</span>
          <input style={{padding:8}} placeholder='Ingrese la ciudad'/>
        </div>
      </div>

      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>

    </div>
    {
        clientModal === true ?
        <div className='modal-overlay'>
          <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"0px 20px"}}>
            <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setClientModal(false)}}>x</div>
            <div style={{width:"100%",height:"95%",overflowY:"scroll"}}>
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
    {
        transportistaModal === true ?
        <div className='modal-overlay'>
          <div className='modal' style={{padding:"0px 20px"}}>
            <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setTransportistaModal(false)}}>x</div>
            <div style={{width:"100%",height:"95%",boxSizing:"border-box"}}>
              <form className='step-form'>
                <h1>Nuevo transportista</h1>
                <div className='form-grid'>
                  <div className='column' style={{gap:5}}>
                    <span className='form-label'>Número de documento transportista <span style={{color:"red"}}>*</span></span>
                    <input style={{padding:6}} placeholder='Ingrese el número de documento transportista'/>
                  </div>
                  <div className='column' style={{gap:5}}>
                    <span className='form-label'>Número de documento conductor <span style={{color:"red"}}>*</span></span>
                    <input style={{padding:6}} placeholder='Ingrese el número de documento conductor '/>
                  </div>
                </div>
                <div className='form-grid'>
                  <div className='column' style={{gap:5}}>
                    <span className='form-label'>Nombre del transportista <span style={{color:"red"}}>*</span></span>
                    <input style={{padding:6}} placeholder='Ingrese el nombre del transportista'/>
                  </div>
                  <div className='column' style={{gap:5}}>
                    <span className='form-label'>Nombre del conductor <span style={{color:"red"}}>*</span></span>
                    <input style={{padding:6}} placeholder='Ingrese el nombre del conductor '/>
                  </div>
                </div>
                <div className='form-grid'>
                  <div className='column' style={{gap:5}}>
                    <span className='form-label'>Número de placa transportista </span>
                    <input style={{padding:6}} placeholder='Ingrese el número de placa transportista'/>
                  </div>
                </div>
                <div className='container-item-flex-end' style={{marginTop:30}}>
                  <CreateBtn label={'Registrar transportista'} HanldeClick={()=>{setTransportistaModal(false)}}/>
                </div>
              </form>
            </div>
          </div>
        </div>
        :
        <></>
    }
  </>
  )
}

const SecondStep = ({setStep}) => {
  const [value, setValue] = useState(null);
  const [ pslist,setPslist ] = useState([])

  const onChange = (e) => {
    setPslist([])
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };



  function addReference (){
    setPslist([...pslist,{
      key:1+pslist.length,
      producto: `producto ${1+pslist.length}`,
      cantidad: 1,
      precio: 2300,
      porcentaje: 0,
      neto: 2450,
      iva: 19,
      total: 2600
    }])
  }

  return (
    <div className='principal-container-column'>
      <div className='form-grid'>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Referencia a documentos externos</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
      </div>
      {
        value === true ?
        <>
        <div className='row-space-btw'>
          <h2 style={{fontSize:20}}>Documentos Externos</h2>
          <AddMoreBtn label={'Nueva referencia'} HanldeClick={addReference}/>
        </div>
        {
        pslist.length === 0 ?
        <></>
        :
        <div style={{width:"100%",alignItems:"center"}}>
          <Table
            dataSource={pslist}
            columns={
              [
                {
                  title: 'Tipo de documento',
                  dataIndex: 'producto',
                  key: 'producto',
                },
                {
                  title: 'Folio',
                  dataIndex: 'cantidad',
                  key: 'cantidad',
                },
                {
                  title: 'Fecha',
                  dataIndex: 'precio',
                  key: 'precio',
                },
                {
                  title: 'U',
                  dataIndex: 'porcentaje',
                  key: 'porcentaje',
                },
                {
                  title: 'Neto',
                  dataIndex: 'neto',
                  key: 'neto',
                },
                {
                  title: 'IVA',
                  dataIndex: 'iva',
                  key: 'iva',
                },
                {
                  title: 'Total',
                  dataIndex: 'total',
                  key: 'total',
                },
                {
                  title: 'Acciones',
                  key: 'actions',
                  render: (text, record) => (
                    <div style={{display:"flex",alignItems:"center",gap:15}}>
                      <AiFillEdit style={{cursor:"pointer"}}/>
                      <FaTrashAlt style={{cursor:"pointer"}}/>
                    </div>
                  ),
              },
              ]
            }
          />
          
        </div>
        }
        <form className='step-form'>
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
              <SelectComp
                placeholder={'seleccionar el tipo de documento'}
                options={[
                  {
                    value:1,
                    label:'Orden de compra'
                  },
                  {
                    value:2,
                    label:'Nota de pedido'
                  },
                  {
                    value:3,
                    label:'Contrato'
                  },
                  {
                    value:4,
                    label:'Hoja de estado de servicios (HES)'
                  },
                  {
                    value:5,
                    label:'Hoja de aceptacion de servicio (HAS)'
                  },
                  {
                    value:6,
                    label:'Recepcion de material (HEM)'
                  },
                ]}
              />
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
              <DatePicker picker='date'/>
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Folio <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}} placeholder='Ingrese el nombre'/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Razón</span>
              <input style={{padding:8}} placeholder='Ingrese la razón'/>
            </div>
          </div>
        </form>
        </>
        :
        <></>
      }
      
      {
        value === 1 ?
        <>
        </>
        :
        <></>
      }

      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn setStep={setStep} value={3}/>
      </div>

    </div>
  )
}



const ThirdStep = ({setStep,vincularOT, setVincularOT,ordenesDeTrabajoList,setOrdenesDeTrabajoList,ordenDeTrabajoSelected,setOrdenDeTrabajoSelected }) =>{

  const { ordenesDeTrabajo,products } = useContext(AppContext)
  
  const [selectedProduct,setSelectedProduct] = useState(null)
  
  const [ loading,setLoading ] = useState(false)

  useEffect(() => {
    console.log(ordenesDeTrabajo)
  }, [])
  

  function restructuredOTs () {
    const updateData = ordenesDeTrabajo.map((item)=>{
      return {
        ...item, label: `OT-${item.orden.slice(-4)} | ${item.cliente}`,
        value: item.orden
      }
    })

    return updateData
  }

  function productosRestructured (arrayProductos) {
    const filterProducts = arrayProductos.filter((item)=>item.activo === true) 
    const updateData = filterProducts.map((item)=>{
      return {
        ...item, 
        value: item.id, 
        label: item.nombre, 
        cantidad: 1,
        total: item.precio,
        precio: item.iva === true ? ((item.precio) - (item.precio*0.19) ).toFixed(2) : item.precio,
        neto: item.iva === true ? ((item.precio) - (item.precio*0.19) ).toFixed(2) : item.precio,
        iva_value :  item.iva === true ? ( item.precio * 0.19 ).toFixed(2) : "0",
        
      }
    })
    //console.log('data actualizada')
    //console.log(updateData)
    return updateData
  }

  const [value, setValue] = useState(true);

  const [ pslist,setPslist ] = useState([])


  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setPslist([])
    setOrdenDeTrabajoSelected(null)
    setValue(e.target.value);
    setVincularOT(e.target.value)
  };



  function addOT (){
    if(ordenDeTrabajoSelected){
      setOrdenesDeTrabajoList([...ordenesDeTrabajoList,ordenDeTrabajoSelected])
    }
    /*
    setPslist([...pslist,{
      key:1+pslist.length,
      ot: 'N-1232',
      id: '12388',
      producto: 'Producto 1',
      cantidad: 1,
      porcentaje: 0,
      neto:1400,
      bruto:1400
    }])
    */
  }

  function addItem (){
    setPslist([...pslist,{
      key:1+pslist.length,
      cod: '12388',
      nombre: 'Nombre',
      cantidad: 1,
      porcentaje: 0,
      neto:1400,
      bruto:1400
    }])
  }


  const [ productModal,setProductModal ] = useState(false);

  const [ ordenDeTrabajoModal,setOrdenDeTrabajoModal ] = useState(false);
  

  return(
    <>
    <div className='principal-container-column'>
      
      <div className='form-grid'>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Vincular a orden de trabajooo</span>
          <Radio.Group onChange={onChange} value={vincularOT}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
      </div>
      {
        value === true ?
        <>
          <div className='row-space-btw form-header-step'>
            <div className='row'>
              <h2 style={{fontSize:20}}>Orden de trabajo</h2>
              <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
                <FiDownload />
              </div>
            </div>
            <AddMoreBtn label={'Vincurlar Orden de Trabajo'}/>
          </div>
          <Table
              dataSource={[]
                //productsList
              }
              columns={
                [
                  {
                    title: 'OT',
                    dataIndex: 'id',
                    key: 'id',
                  },
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
                    dataIndex: 'porcentaje',
                    key: 'porcentaje',
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
                  },
                  {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                  },
                  {
                    title: 'Acciones',
                    key: 'actions',
                    render: (text, record) => (
                      <div style={{display:"flex",alignItems:"center",gap:15}}>
                        <AiFillEdit style={{cursor:"pointer"}}/>
                        <FaTrashAlt style={{cursor:"pointer"}}/>
                      </div>
                    ),
                },
                ]
              }
          />
          <div className='container-item-flex-end'>
              <div className='column' style={{boxSizing:"border-box",padding:20}}>
                <div className='row'>
                  <span style={{fontWeight:600}}>SubTotal: </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>IVA (19%): </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>Total: </span>
                  <span>$</span>
                </div>
              </div>
          </div>
          <div>
            <div className='column'>
                <div className='row form-header-step' >
                  <span className='form-label' style={ordenesDeTrabajo.length === 0 ? {color:"#b9b9b9c4"} : {}}>Orden de trabajo <span style={ordenesDeTrabajo.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
                  <div style={ordenesDeTrabajo.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{
                      setOrdenDeTrabajoModal(true)
                  }} >
                    <FiFileText/>
                    <span>Agregar nuevo OT</span>
                  </div>
                </div>
                {
                  ordenesDeTrabajo.length === 0 ?
                    <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
                      <span>No hay ordenes de trabajo registradas</span>
                    </div>
                    :
                    <SelectComp 
                      value={ordenDeTrabajoSelected ? ordenDeTrabajoSelected.value : null}
                      HandleChange={(text,record)=>{
                        console.log(record)
                        setOrdenDeTrabajoSelected(record)
                      }}
                      options={restructuredOTs(ordenesDeTrabajo)}
                    />
      
                }
            </div>
          </div>
        </>
        :
        <>
          <div className='row-space-btw form-header-step'>
            <div className='row'>
              <h2 style={{fontSize:20}}>Ítems</h2>
              <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
                <FiDownload />
              </div>
            </div>
            <AddMoreBtn label={'Agregar otro producto/servicio'}/>
          </div>
          <Table
              dataSource={[]
                //productsList
              }
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
                    title: 'Precio',
                    dataIndex: 'precio',
                    key: 'precio',
                  },
                  {
                    title: '%',
                    dataIndex: 'porcentaje',
                    key: 'porcentaje',
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
                  },
                  {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                  },
                  {
                    title: 'Acciones',
                    key: 'actions',
                    render: (text, record) => (
                      <div style={{display:"flex",alignItems:"center",gap:15}}>
                        <AiFillEdit style={{cursor:"pointer"}}/>
                        <FaTrashAlt style={{cursor:"pointer"}}/>
                      </div>
                    ),
                },
                ]
              }
          />
          <div className='container-item-flex-end'>
              <div className='column' style={{boxSizing:"border-box",padding:20}}>
                <div className='row'>
                  <span style={{fontWeight:600}}>SubTotal: </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>IVA (19%): </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>Total: </span>
                  <span>$</span>
                </div>
              </div>
          </div>
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <div className='row-space-btw form-header-step'>
                <span className='form-label' style={products.length === 0 ? {color:"#b9b9b9c4"} : {}}>Producto/Servicio <span style={products.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
                <div className='row' style={products.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} onClick={()=>{
                  setProductModal(true)
                  }}>
                  <BsBoxSeam/>
                  <span>Agregar nuevo producto/servicio</span>
                </div>
              </div>
              {
                products.length === 0 ?
                <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
                  <span>No hay productos registrados</span>
                </div>
                :
                <SelectComp
                  placeholder={'Seleccionar producto/servicio'}
                  //value={selectedProduct ? selectedProduct.value : null}
                  options={productosRestructured(products)}
                  HandleChange={(value,record)=>{
                    //setSelectedProduct(record)
                    //console.log('pruducto seleccionado')
                    //console.log(record)
                  }}
                />
              }
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Descripción</span>
              <input style={{padding:8}} placeholder='Introduce una descripción'/>
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
              {
                loading === true ?
                <div>char</div>
                :
                <input style={{padding:8}} placeholder='Ingrese la cantidad' type='number' value={selectedProduct !== null ? selectedProduct.cantidad : null}/>

              }
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
              {
                loading === true ?
                <div>char</div>
                :
                <input style={{padding:8}} type='number' placeholder='Ingrese el precio' value={selectedProduct ? selectedProduct.precio : null}/>
              }
            </div>
          </div>
        
          <div className='principal-grid grid-4-columns'>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>%</span>
              <input style={{padding:8}}/>
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Neto</span>
              {
                loading === true ?
                <div>Load</div>
                :
                <input style={{padding:8}} type='number' value={selectedProduct ? selectedProduct.neto : null} />
              }
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>IVA</span>
              {
                loading === true ?
                <div>char</div>
                :
                <input style={{padding:8}} type='number' 
                value={selectedProduct ? selectedProduct.iva_value : null}
                />
              }
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Total</span>
              {
                loading === true ?
                <div>char</div>
                :
                <input style={{padding:8}} value={selectedProduct ? selectedProduct.total : null}/>
              }
            </div>

          </div>
        </>
      }
      
      

      {
        
        <div className='row-space-btw' style={{marginTop:30}}>
          <FormerBtn setStep={setStep} value={2}/>
          <CreateBtn label={'Crear Documento de Despacho'}/>
        </div>
        
      }

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
      {
        ordenDeTrabajoModal === true ?
        <div className='modal-overlay'>
          <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"10px 40px"}}>
            <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setOrdenDeTrabajoModal(false)}}>x</div>
            <div style={{width:"100%",border:"1px solid black",height:"95%",overflowY:"scroll"}}>
              <NuevaODT
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



const NuevoDocumentoDeDespacho = () => {
  const navigate = useNavigate()

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateDispachDash()
    setMenuOptions(updateData)
  }, [])

  const [step,setStep] = useState(1)

  //ORDENES DE TRABAJO VINCULADAS
  const [ vincularOT, setVincularOT ] = useState(true)


  const [ ordenesDeTrabajoList,setOrdenesDeTrabajoList ] = useState([])

  const [ ordenDeTrabajoSelected,setOrdenDeTrabajoSelected ] = useState(null)



  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep}/>
      
      case 2:
        return <SecondStep setStep={setStep}/>
      
      case 3:
        return <ThirdStep setStep={setStep} vincularOT={vincularOT} setVincularOT={setVincularOT} ordenesDeTrabajoList={ordenesDeTrabajoList} setOrdenesDeTrabajoList={setOrdenesDeTrabajoList} ordenDeTrabajoSelected={ordenDeTrabajoSelected} setOrdenDeTrabajoSelected={setOrdenDeTrabajoSelected}/>
      /*
      case 4:
        return <FourthStep setStep={setStep}/>
      */
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/dispach_documents')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  documentos de despacho</span>
      </div>
      <h1>Nueva guía</h1>
      {
        step === 4 ?
        <Success message={'Documento creado con éxito!'}/>
        :
        <PrincipalCard>
          <div className='step-container step-container-3-steps'>
            <div className='step-container-item'>
              <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
              <div className='step-item-dot-cta' style={{left:-20}}>1</div>
              <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>

            </div>
            <div className='step-container-item'>
              <div className={step >= 3 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
              <div className={step >= 3 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>3</div>
            </div>
            
          </div>
          <form className='step-form'>
            {
            formSetupSteps()
            }
          </form>
        </PrincipalCard>
      }
      {
        /*
        <div className='row-test'>
          <h3 onClick={()=>{navigate('/shipping_invoices')}} style={{color:"red"}}>Documentos de despacho</h3>
          <h3>Nueva guía</h3>
        </div>
        <h3>Generar documento de despacho</h3>
        <div>Formulario para generar un nuevo documento de despacho</div>
        <form>
          <button>Previsualizar</button>
          <button>Crear</button>
        </form>

        */
      }
    </>
  )
}

export default NuevoDocumentoDeDespacho