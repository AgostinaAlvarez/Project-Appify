import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { DatePicker, Radio, Table } from 'antd';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import { FiDownload, FiFileText } from 'react-icons/fi';
import SelectComp from '../../../../components/Select/SelectComp';
import { BsBoxSeam } from 'react-icons/bs';
import NuevoPS from '../../../Empresa/ProductosServicios/NuevoPS/NuevoPS';
import NuevaODT from '../../../Operaciones/OrdenesDeTrabajo/NuevaODT/NuevaODT';
import NuevoCliente from '../../../Comercial/Clientes/NuevoCliente/NuevoCliente';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { restructuredFV, restructuredFVE, restructuredNC, restructuredND } from '../../../../utils/controllers/Ventas/VentasControllers';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoCheckmarkCircleOutline, IoEye } from 'react-icons/io5';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
import { elements } from 'chart.js';


/*STEPS*/

const FirstStep = ({
  setStep,
  tipoDeDocumento,setTipoDeDocumento,
  tipoDeNota,setTipoDeNota,
  tipoDeDocumentoRelacionado,setTipoDeDocumentoRelacionado,
  vendedor,setVendedor,
  condicionDePago,setCondicionDePago,
  centoBeneficio,setCentoBeneficio,
  fecha,setFecha,
  selectedClient,setSelectedClient,
  data,setData,
  dataInitialState,
  motivoReferencia,
  setMotivoReferencia
}) =>{

  const { subusuarios,clientes } = useContext(AppContext)

  const [ clientModal,setClientModal ] = useState(false)


  function restructuredData(subusuarios) {
    const vendedores = subusuarios.map((item)=>{
      return {
        ...item, value: item.id, label: item.nombre
      }
    })

    return vendedores
  }


  const onChange = (date, dateString) => {
    setFecha(date)
    console.log(dateString)
    //console.log(date, dateString);
  };

  //CLIENTES
  function clientesRestructured (arrayClientes) {
    const updateData = arrayClientes.map((item)=>{
      return {
        ...item, value: item.cliente.id, label: item.cliente.razon_social
      }
    })
    return updateData
  }

  return(
  <>
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Información de documento</h2>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
          <SelectComp
            value={tipoDeDocumento.value}
            options={[
              {
                label:'Factura',
                value:1
              },
              {
                label:'Factura exenta',
                value:2
              },
              {
                label:'Nota de credito',
                value:3
              },
              {
                label:'Nota de debito',
                value:4
              },
              {
                label:'Voucher de venta',
                value:5
              },
            ]}
            HandleChange={(value,record)=>{
              setTipoDeNota(null)
              setTipoDeDocumentoRelacionado(null)
              setVendedor(null)
              setCondicionDePago(null)
              setCentoBeneficio({ label: "Ventas", value: 25 })
              setTipoDeDocumento(record)
              setFecha(null)
              setData(dataInitialState)
            }}
          />
        </div>
        {
          tipoDeDocumento.value === 3 || tipoDeDocumento.value === 4 ?
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Tipo de nota <span style={{color:"red"}}>*</span></span>
            {
              tipoDeDocumento.value === 3 ?
              <SelectComp
                placeholder={'seleccionar el tipo de nota'}
                value={tipoDeNota ? tipoDeNota.value : null} 
                HandleChange={(value,record)=>{
                  setTipoDeNota(record)
                }}
                options={[
                  {
                    label: 'Anula documento de referencia',
                    value:1
                  },
                  {
                    label: 'Corrige texto documento de referencia',
                    value:2
                  },
                  {
                    label: 'Corrige montos en documentos de referencia',
                    value:3
                  },
                ]}
              />
              :
              <SelectComp
                placeholder={'seleccionar el tipo de nota'}
                value={tipoDeNota ? tipoDeNota.value : null} 
                HandleChange={(value,record)=>{
                  setTipoDeNota(record)
                }}
                options={[
                  {
                    label: 'Anula documento de referencia',
                    value:1
                  },
                  {
                    label: 'Corrige montos en documentos de referencia',
                    value:3
                  },
                ]}
              />
            }
          </div>
          :
          <div className='column' style={{gap:5}}>
            <span className='form-label'>N° de documento</span>
            <input value={data.numero_documento}  onChange={(e)=>{setData({...data,numero_documento: e.target.value})}} style={{padding:8}} placeholder='Ingrese el número del documento'/>
          </div>
        }
      </div>
      {
        tipoDeDocumento.value === 3 || tipoDeDocumento.value === 4 ?
        <>
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Motivo de referencia </span>
              <input value={motivoReferencia} onChange={(e)=>{setMotivoReferencia(e.target.value)}} style={{padding:8}} placeholder='Ingrese el motivo del documento'/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
              <DatePicker picker='date' value={fecha} onChange={onChange}/>
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Centro de beneficio </span>
              <SelectComp
                value={centoBeneficio ? centoBeneficio.value : null}
                HandleChange={(text,record)=>{
                  setCentoBeneficio(record)
                }}
                placeholder={'seleccionar el centro de beneficio'} 
                options={[
                  { label: "Ajustes de centralizacion", value: 1 },
                  { label: "Arriendos y leasing", value: 2 },
                  { label: "Cargos e interes bancarios", value: 3 },
                  { label: "Comidas y entretenimiento", value: 4 },
                  { label: "Contratistas", value: 5 },
                  { label: "Costo insumos, materiales y productos", value: 6 },
                  { label: "Cuentas servicios basicos", value: 7 },
                  { label: "Diferencias tipo cambio", value: 8 },
                  { label: "Gasto sin documento tributario", value: 9 },
                  { label: "Gastos reembolsables", value: 10 },
                  { label: "Gastos sin clasificar", value: 11 },
                  { label: "Impuestos y patentes", value: 12 },
                  { label: "Intereses y gastos financieros", value: 13 },
                  { label: "Iva no recuperable", value: 14 },
                  { label: "Otros gastos de negocio", value: 15 },
                  { label: "Otros gastos misceláneos", value: 16 },
                  { label: "Otros ingresos no operacionales", value: 17 },
                  { label: "Preguntar a mi contador", value: 18 },
                  { label: "Remuneraciones socios", value: 19 },
                  { label: "Seguros", value: 20 },
                  { label: "Servicios Legales y Profesionales", value: 21 },
                  { label: "Sueldos y remuneraciones personal", value: 22 },
                  { label: "Suministros de oficina y software", value: 23 },
                  { label: "Vehiculos y gastos asociados", value: 24 },
                  { label: "Ventas", value: 25 },
                  { label: "Ventas sin documentos tributarios", value: 26 },
                  { label: "Viajes", value: 27 }
                ]}
              />
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
              <SelectComp
                value={vendedor ? vendedor.value : null}
                placeholder={'Seleccionar vendedor'}
                options={restructuredData (subusuarios)}
                HandleChange={(text,record)=>{
                  setVendedor(record)
                }}
              />
            </div>
          </div>
        </>
        :
        <>
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
              <DatePicker picker='date' value={fecha} onChange={onChange}/>
            </div>
            <div className='column' style={{gap:5}}>
              
              <div className='row-space-btw'>
                <span className='form-label' style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {}}>Destinatario <span style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
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
                  options={clientesRestructured(clientes)}
                  placeholder={'Seleccione el nombre del destinatario'}
                  value={selectedClient ? selectedClient.value : null}
                  HandleChange={(text,record)=>{
                    setSelectedClient(record)
                  }}
                />
              }
              
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
              <SelectComp
                value={vendedor ? vendedor.value : null}
                placeholder={'Seleccionar vendedor'}
                options={restructuredData (subusuarios)}
                HandleChange={(text,record)=>{
                  setVendedor(record)
                }}
              />
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Condición de pago</span>
              <SelectComp
              value={condicionDePago ? condicionDePago.value : null}
              HandleChange={(text,record)=>{
                setCondicionDePago(record)
              }}
              placeholder={'Seleccionar condición de pago'}
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
              />
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Centro de beneficio</span>
              <SelectComp
                value={centoBeneficio ? centoBeneficio.value : null}
                HandleChange={(text,record)=>{
                  setCentoBeneficio(record)
                }}
                placeholder={'seleccionar el centro de beneficio'} 
                options={[
                  { label: "Ajustes de centralizacion", value: 1 },
                  { label: "Arriendos y leasing", value: 2 },
                  { label: "Cargos e interes bancarios", value: 3 },
                  { label: "Comidas y entretenimiento", value: 4 },
                  { label: "Contratistas", value: 5 },
                  { label: "Costo insumos, materiales y productos", value: 6 },
                  { label: "Cuentas servicios basicos", value: 7 },
                  { label: "Diferencias tipo cambio", value: 8 },
                  { label: "Gasto sin documento tributario", value: 9 },
                  { label: "Gastos reembolsables", value: 10 },
                  { label: "Gastos sin clasificar", value: 11 },
                  { label: "Impuestos y patentes", value: 12 },
                  { label: "Intereses y gastos financieros", value: 13 },
                  { label: "Iva no recuperable", value: 14 },
                  { label: "Otros gastos de negocio", value: 15 },
                  { label: "Otros gastos misceláneos", value: 16 },
                  { label: "Otros ingresos no operacionales", value: 17 },
                  { label: "Preguntar a mi contador", value: 18 },
                  { label: "Remuneraciones socios", value: 19 },
                  { label: "Seguros", value: 20 },
                  { label: "Servicios Legales y Profesionales", value: 21 },
                  { label: "Sueldos y remuneraciones personal", value: 22 },
                  { label: "Suministros de oficina y software", value: 23 },
                  { label: "Vehiculos y gastos asociados", value: 24 },
                  { label: "Ventas", value: 25 },
                  { label: "Ventas sin documentos tributarios", value: 26 },
                  { label: "Viajes", value: 27 }
                ]}
              />
            </div>
          </div>
        </>
        
      }

      {
        tipoDeDocumento.value === 3 || tipoDeDocumento.value === 4 ?
        <div className='container-item-flex-end' style={{marginTop:30}}>
          <FollowingBtn setStep={setStep} value={2}/>
        </div>
        :
        <div className='container-item-flex-end' style={{marginTop:30}}>
          <FollowingBtn setStep={setStep} value={3}/>
        </div>
      }

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


const SecondStep = ({
  setStep,
  referenciaADocumentosExternos,setReferenciaADocumentosExternos,
  tipoDeDocumentoExterno,setTipoDeDocumentoExterno,
  selectedDicumentoRelacionado,setSelectedDocumentoRelacionado,
  documentsList,setDocumentsList,
  documentoRelacionadosList,setDocumentoRelacionadosList,
  tipoDeNota,
  documentoRelacionado,setDocumentoRelacionado,
  vendedor,
  tipoDeDocumento,
  centoBeneficio,
  fecha,
  documentType,setDocumentType
}) =>{

  const { ventas } = useContext(AppContext)

  const [value, setValue] = useState(null);
  const [ pslist,setPslist ] = useState([])

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    if(e.target.value === 2){
      setPslist([])
    }
    setReferenciaADocumentosExternos(e.target.value)
  };





  function addDocumentoDeVenta (){
    setPslist([...pslist,{
      key:1+pslist.length,
      tipo: 'Tipo de documento de venta',
      fecha: '02/02/2024',
      folio: '2234',
      razon: 'razon',
    }])
  }

  useEffect(() => {
    console.log('ventas')
    console.log(ventas)
  }, [])


  function addDocumentoRelacionado () {
    if(selectedDicumentoRelacionado){
      let objtData = selectedDicumentoRelacionado;
      if(tipoDeDocumentoExterno.value === 1){
        objtData = {...objtData, tipo: 'Factura de venta'}
      }else if (tipoDeDocumentoExterno.value === 2){
        objtData = {...objtData, tipo: 'Factura de venta excenta'}
      }else if (tipoDeDocumentoExterno.value === 3){
        objtData = {...objtData, tipo: 'Nota de credito'}
      }else if (tipoDeDocumentoExterno.value === 4){
        objtData = {...objtData, tipo: 'Nota de debito'}
      }
      console.log(objtData)

      setDocumentType(tipoDeDocumentoExterno.label)
      setDocumentoRelacionadosList([ objtData])
      setSelectedDocumentoRelacionado(null)
      setTipoDeDocumentoExterno(null)
    }else{
      alert('Debe seleccionar un documento')
    }
  }

  //const [ documentType,setDocumentType ] = useState(null)

  function addItemsRelacionados () {
    if(selectedDicumentoRelacionado){
      setDocumentType(tipoDeDocumentoExterno.label)
      console.log('documento seleccionado')
    
      setDocumentoRelacionadosList([])

      const objData = selectedDicumentoRelacionado.productos_servicios.productos.map((item)=>{
        return {
          ...item, idDoc: selectedDicumentoRelacionado.idDoc
        }
      })
      console.log('lista')
      console.log(objData)
      
      setTimeout(() => {
        setDocumentoRelacionadosList(objData)        
      }, 100);

      
    }else{
      alert('Debe seleccionar un documento (corrige montos)')
    }
  }
  

  function createNCOD () {
    const data = {
      idDoc: documentoRelacionado.idDoc,
      idCliente: documentoRelacionado.idCliente, // traer id de cliente
      idVendedor: vendedor.value,
      tipo_credito: tipoDeDocumento.value === 3 ? true : false,
      tipo_debito: tipoDeDocumento.value === 4 ? true : false,
      numero_documento: 0,//numero que viene del SII
      fecha: fecha.toISOString(),
      motivo_referencia: "",
      centro_de_beneficio: centoBeneficio.label ,
      observacion: "",
      nota_interna: "",
      anula_doc: tipoDeNota.value === 1 ? true : false,
      corrige_monto: tipoDeNota.value === 3 ? true : false
    }

    if(tipoDeNota.value === 1){
      //anula documento
      console.log('anula documento')
      if(documentType === "Factura"){
        console.log('nota para factura de venta')
        
        const objtData = {
          notas_de_credito_debito: data,
          nota_factura_venta: {idFacturaVenta: documentoRelacionado.idFactura}
        }
        console.log(objtData)
        //sendData(objtData)
      }else if ( documentType === "Factura exenta" ){
        //corrige documento
        console.log('nota para factura de venta excenta')
        
        const objtData = {
          notas_de_credito_debito: data,
          nota_factura_venta_excenta: {idFacturaVenta: documentoRelacionado.idFactura}
        }
        console.log(objtData)
        //sendData(objtData)
      }
    }else if (tipoDeNota.value === 3){
      //corrige montos
      console.log('tengo que mandarle los items')
      console.log('lista')
      
      console.log(documentoRelacionadosList)
      const lista_productos = documentoRelacionadosList.map((item)=>{
        return {
          idProducto: item.id,
          cantidad:1,
          unitario: item.unitario ? item.unitario : item.precio,
          cuenta: "Anticipo proveedores"
        }
      })
      console.log('ista de productos')
      console.log(lista_productos)
      
      if(documentType === "Factura"){

        const objtData = {
          notas_de_credito_debito: data,
          item_producto_factura_venta: lista_productos
        }
        console.log(objtData)
      
      }else if ( documentType === "Factura exenta" ){
      
        const objtData = {
          notas_de_credito_debito: data,
          item_producto_factura_venta_excenta: lista_productos
        }
        console.log(objtData)
      
      }
    }
    
  }


  async function sendData (data) {
    try{
      const response = await axios.post('')
    }catch(err){

    }
  }

  
  return(
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h2 style={{fontSize:20}}>  Documentos relacionados</h2>
        {
          tipoDeNota.value === 3 ?
          <AddMoreBtn label={'Nueva referencia'} HanldeClick={addItemsRelacionados}/>
          :
          <AddMoreBtn label={'Nueva referencia'} HanldeClick={addDocumentoRelacionado}/>
        }
        
      </div>

        {
          documentoRelacionadosList.length === 0 ?
          <></>
          :
          <>
            {
              tipoDeNota.value === 3 ?
              <>
                <div className='row'>
                  <h3>{documentType}</h3>
                  <div>{`(${tipoDeNota.label})`}</div>
                </div>
                <div style={{width:"100%",alignItems:"center"}}>
                  <Table
                    dataSource={documentoRelacionadosList}
                    columns={
                      
                      [
                      {
                        title: 'Producto/Servicio',
                        dataIndex: 'nombre',
                        key: 'nombre',
                      },
                      {
                        title: 'Cantidadd',
                        render : (text,record) => (
                          <>
                            <input placeholder={record.cantidad} value={record.cantidad}/>
                          </>
                        )
                      },
                      {
                        title: 'Unitario',
                        render: (text,record) => (
                          <>
                            <span>
                            {record.unitario ? record.unitario : record.precio}
                            </span>
                          </>
                        ),
                      },
                      {
                        title: '%',
                        render: (text,record) => (
                          <span>{record.porcentaje_descuento ? record.porcentaje_descuento : 0}</span>
                        ),
                      },
                      {
                        title: 'Neto',
                        render: (text,record) => (
                          <span>{record.neto ? record.neto : 0}</span>
                        ),
                      },
                      {
                        title: 'Bruto',
                        render: (text,record) => (
                          <span>{record.bruto ? record.bruto : 0}</span>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className='container-item-flex-end'>
                  <div className='column'>
                    <div className='row'>
                      <span>Subtotal: </span>
                      <span>$</span>
                    </div>
                    <div className='row'>
                      <span>IVA (19%): </span>
                      <span>0</span>
                    </div>
                    <div className='row'>
                      <span>Total: </span>
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </>
              :
              <>
                <div className='row'>
                  <h3>{documentType}</h3>
                  <div>{`(${tipoDeNota.label})`}</div>
                </div>
                <div style={{width:"100%",alignItems:"center"}}>
                  <Table
                    dataSource={documentoRelacionadosList}
                    columns={
                      [
                        {
                          title: 'Tipo',
                          dataIndex: 'tipo',
                          key: 'tipo',
                        },
                        {
                          title: 'Fecha',
                          dataIndex: 'fecha',
                          key: 'fecha',
                          render: (text,record) => (
                            <>{text.split("T")[0]}</>
                          )
                        },
                        {
                          title: 'Cliente',
                          dataIndex: 'cliente',
                          key: 'cliente',
                        },
                        {
                          title: 'Bruto',
                          dataIndex: 'Bruto',
                          key: 'Bruto',
                          render: (text,record)=>(
                            <>{text.toFixed(2)}</>
                          )
                        },
                        {
                          title: 'Neto',
                          dataIndex: 'Neto',
                          key: 'Neto',
                          render: (text,record)=>(
                            <>{text.toFixed(2)}</>
                          )
                        },
                        {
                          title: 'Total',
                          dataIndex: 'total',
                          key: 'total',
                          render: (text,record)=>(
                            <>{(record.Neto).toFixed(2)}</>
                          )
                        },
                        {
                          title: 'Acciones',
                          key: 'actions',
                          render: (text, record) => (
                            <div style={{display:"flex",alignItems:"center",gap:15}}>
                              <IoEye style={{cursor:"pointer"}}/>
                              <FaTrashAlt style={{cursor:"pointer"}}/>
                            </div>
                          ),
                      },
                      ]
                    }
                  />
                  
                </div>
              </>
            }
          </>

        }
      
      <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
              <SelectComp 
              value={tipoDeDocumentoExterno ? tipoDeDocumentoExterno.value : null}
              HandleChange={(value,record)=>{
                console.log(value)
                setSelectedDocumentoRelacionado(null)
                setTipoDeDocumentoExterno(record)
                switch (value) {
                  case 1:
                    return setDocumentsList(restructuredFV(ventas.factura_venta))
                  case 2:
                    return setDocumentsList(restructuredFVE(ventas.factura_venta_excenta))            
                  case 3:
                    const notasCredito = ventas.notas.filter((item)=>item.tipo_credito === 1)
                    return setDocumentsList(restructuredNC(notasCredito))
                  case 4:
                    const notasDebito = ventas.notas.filter((item)=>item.tipo_debito === 1)
                    return setDocumentsList(restructuredND(notasDebito))
                
                }
                
              }}
              options={[
                {
                  label:'Factura',
                  value:1
                },
                {
                  label:'Factura exenta',
                  value:2
                },
                {
                  label:'Nota de credito',
                  value:3
                },
                {
                  label:'Nota de debito',
                  value:4
                },
                
              ]}
              
              />
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Documento <span style={{color:"red"}}>*</span></span>
              {
                tipoDeDocumentoExterno ? 
                <SelectComp
                  value={selectedDicumentoRelacionado ? selectedDicumentoRelacionado.value : null}
                  HandleChange={(text,record)=>{
                    console.log('documento relacionado handle change')
                    console.log(record)
                    setDocumentoRelacionado(record)
                    setSelectedDocumentoRelacionado(record)
                  }}
                  placeholder={'Seleccionar documento'}
                  options={documentsList}
                />
                :
                <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
                  <span>Debe seleccionar el tipo de documento</span>
                </div>
              }
            </div>
      </div>
      
      
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <CreateBtn label={'Crear documento'} HanldeClick={createNCOD}/>
      </div>
    </div>
  )
}


const ThirdStep = ({
  setStep,vincularOT, setVincularOT,ordenesDeTrabajoList,setOrdenesDeTrabajoList,ordenDeTrabajoSelected,setOrdenDeTrabajoSelected,
  itemsOTlist,setItemsOTList,
  itemsDocumentoVenta,setItemsDocumentoVenta ,
  tipoDeDocumento,
  selectedClient,
  data,
  fecha,
  vendedor,
  centoBeneficio,
  condicionDePago
}) =>{

  const { ordenesDeTrabajo,products,userLoggedData } = useContext(AppContext)
  
  const [selectedProduct,setSelectedProduct] = useState(null)
  
  const [ loading,setLoading ] = useState(false)



  function restructuredOTs () {
    const updateData = ordenesDeTrabajo.map((item)=>{
      return {
        ...item, label: `OT-${item.orden.slice(-4)} | ${item.cliente}`,
        value: item.orden
      }
    })

    return updateData
  }

  const [value, setValue] = useState(true);
  const [ pslist,setPslist ] = useState([])

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setOrdenesDeTrabajoList([])
    setItemsOTList([])
    setOrdenDeTrabajoSelected(null)
    setValue(e.target.value);
    setVincularOT(e.target.value)
  };



  function addOT (){
    if(ordenDeTrabajoSelected){
      const findOT = ordenesDeTrabajoList.find((item)=> item.value === ordenDeTrabajoSelected.value)
      if(findOT){
        console.log('orden de trabajo existente')
      }else{
        setOrdenesDeTrabajoList([...ordenesDeTrabajoList,ordenDeTrabajoSelected])
        
        const itemsProd = ordenDeTrabajoSelected.productos_servicios.productos.map((producto)=>{
          return {
            ...producto,
            idOT: ordenDeTrabajoSelected.orden
          }
        })

        console.log('items de la orden')
        console.log(itemsProd)
        setItemsOTList([...itemsOTlist,...itemsProd])
        
      }
      setOrdenDeTrabajoSelected(null)
    }else{
      alert('debe seleccionar una orden de trabajo')
    }
  }

  const [ productModal,setProductModal ] = useState(false);

  const [ ordenDeTrabajoModal,setOrdenDeTrabajoModal ] = useState(false);


  function intValue (value){
    return Math.ceil(value)
  }
  //////PRODUCTOS
  
  function productosRestructured (arrayProductos) {
    const filterProducts = arrayProductos.filter((item)=>item.activo === true) 
    /*
    {
      "idProducto": "product-f8f53462-2554-4934-a9b8-55e6b3c78bdc",
      "codigo": "PROD100",
      "cantidad": 3,
      "unitario": 50,
      "bruto": 150.0,
      "neto": 135.0,
      "cuenta": "P100",
      "bonificacion": 15.0,
      "notas": "Producto A"
    },
    
    */
    const updateData = filterProducts.map((item)=>{
      return {
        ...item, 
        value: item.id, 
        label: item.nombre, 
        cantidad: 1,
        unitario: item.iva === true ? intValue(parseFloat(item.precio/1.19)) : intValue(parseFloat(item.precio)),
        bruto: item.iva === true ? intValue(parseFloat(item.precio)) : intValue(parseFloat(item.precio*1.19)),
        neto:  item.iva === true ? intValue(parseFloat(item.precio/1.19)) : intValue(parseFloat(item.precio)),
        cuenta: "25",
        bonificacion: null,
        notas: null,
        
      }
    })
   
    return updateData
  }

  const [ selectedItem,setSelectedItem ] = useState(null)

  function addItem () {
    console.log(selectedItem)
   if(selectedItem){
    const findItem = itemsDocumentoVenta.find((item)=>item.id === selectedItem.id)
    if(findItem){
      const updateData = itemsDocumentoVenta.map((item)=>{
        if(item.id === selectedItem.id){
          return {...item, cantidad: item.cantidad +1}
        }
        return item
      })
      setItemsDocumentoVenta(updateData)
      setLoading(true)
      setSelectedItem(null)
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }else{
      setItemsDocumentoVenta([...itemsDocumentoVenta, {...selectedItem, list_id:uuidv4()}])
      setLoading(true)
      setSelectedItem(null)
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }
   }else{
    setLoading(true)
    setSelectedProduct(null)
    setTimeout(() => {
      setLoading(false)
    }, 300);
    alert('debe seleccionar un producto o servicio')
   }
  }


  function getNetoDV (arrayItems){
    let neto = 0;
    arrayItems.forEach(element => {
      neto = neto + element.neto 
    });
    return neto
  }


  function getBrutoFV(arrayItems) {
    let bruto = 0;
    arrayItems.forEach(element => {
      bruto = bruto + element.bruto 
    });
   return bruto
  }

  function createDV (){
    const fechaMod = new Date(fecha)
    let factura = {
      idCliente: selectedClient.value,
      tipo_documento: tipoDeDocumento.label, //string
      numero_documento: 0, //HARDCODEADO
      fecha: fechaMod.toISOString(),
      idVendedor: vendedor.value,
      condicion_de_pago: condicionDePago.value, //string
      centro_beneficio: centoBeneficio.label, //string (hay que agregar esto)
      observacion: "Venta de productos y servicios", //string (hay que agregar esto)
      nota_interna: null, //string (hay que agregar esto)
      ot: true,
      //Agregar neto y bruto
      neto:getNetoDV(itemsDocumentoVenta),
      bruto: getBrutoFV(itemsDocumentoVenta),
      pagado: false
    }
    let objtData = {
      documento_venta:{
        user: userLoggedData.data.user,
      },
    }
    if(tipoDeDocumento.value === 1){
      //FACTURA DE VENTA
      factura = {...factura, ot: vincularOT}
      objtData = { ...objtData, factura_venta: factura }
      if(vincularOT === true){
        //ASOCIADA A OR
        const OTData = ordenesDeTrabajoList.map((item)=>{
          return {
            idOrdenT: item.orden
          }
        })
        objtData = {... objtData, orden_trabajo_FV: OTData,item_servicio_factura_venta:[],item_producto_factura_venta:[]}
      }else if(vincularOT === false){
        //CON ITEMS
        const productos = itemsDocumentoVenta.map((item)=>{
          return {
            idProducto: item.value,
            codigo: item.codigo,
            cantidad: item.cantidad,
            unitario: item.unitario,
            bruto: item.bruto,
            neto: item.neto,
            cuenta: item.cuenta,
            bonificacion: item.bonificacion,
            notas: item.notas
          }
        })

        
        objtData = {...objtData, item_producto_factura_venta: productos,item_servicio_factura_venta:[],orden_trabajo_FV:[], emisor: {RUT: userLoggedData.RUT.replace(/-.*/, '')} }

      }
      console.log('data')
      console.log(objtData)
      sendDataFV(objtData)
    }else if(tipoDeDocumento.value === 2){
      ////////////////////////////////
      //FACTURA DE VENTA EXENTA
    
      factura = {...factura, ot: vincularOT}
      objtData = { ...objtData, factura_venta_excenta: factura }
      if(vincularOT === true){
        //ASOCIADA A OT
        const OTData = ordenesDeTrabajoList.map((item)=>{
          return {
            idOrdenT: item.orden
          }
        })
        objtData = {... objtData, orden_trabajo_FVE: OTData, item_producto_factura_venta_excenta:[], item_servicio_factura_venta_excenta:[] }

      }else if(vincularOT === false){
        //CON ITEMS
        const productos = itemsDocumentoVenta.map((item)=>{
          return {
            idProducto: item.value,
            codigo: item.codigo,
            cantidad: item.cantidad,
            unitario: item.unitario,
            bruto: item.bruto,
            neto: item.neto,
            cuenta: item.cuenta,
            bonificacion: item.bonificacion,
            notas: item.notas
          }
        })
        
        objtData = {...objtData, item_producto_factura_venta_excenta: productos,item_servicio_factura_venta_excenta:[],orden_trabajo_FVE:[]}
      }
      sendDataFVE(objtData)
    }
  }
  

  async function sendDataFV (data) {
    console.log('registrando factura de venta')
    console.log(data)
    try{
      const response = await axios.post('https://appify-black-side.vercel.app/administracion/ventas/FV',data)
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }

  async function sendDataFVE (data) {
    console.log('registrando factura de venta exenta')
    console.log(data)
    try{
      const response = await axios.post('https://appify-black-side.vercel.app/administracion/ventas/FVE',data)
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }


  function changeUnitPrice (e) {
    const unitarioValue = parseFloat(e.target.value)
    const cantidad = selectedItem.cantidad
    const porcentaje = (selectedItem.bonificacion/100)*(unitarioValue)
    const netoValue = (unitarioValue*cantidad) - (porcentaje)
    
    setSelectedItem({
      ...selectedItem,
      unitario: unitarioValue,
      neto: netoValue,
      bruto: intValue(netoValue * 1.19)
    })
  }

  function changeNeto (e) {
    const netoValue = e.target.value
    setSelectedItem({
      ...selectedItem,
      neto: netoValue,
      bruto: intValue(netoValue*1.19)
    })
  }


  function percent (e){
    const percent = e.target.value;
    if(percent === ""){
      const unitarioValue = selectedItem.unitario
      const cantidad = selectedItem.cantidad
      const netoValue = (unitarioValue * cantidad)
      setSelectedItem({
        ...selectedItem,
        bonificacion: null,
        neto: netoValue,
        bruto: intValue(netoValue * 1.19)
      })
    }else{
      const percentValue = parseFloat(percent)
      const unitarioValue = selectedItem.unitario
      const cantidad = selectedItem.cantidad
      const porcentaje = (percentValue/100) * (unitarioValue * cantidad)
  
      const netoValue = (unitarioValue * cantidad) - (porcentaje)
  
      setSelectedItem({
        ...selectedItem,
        bonificacion: percentValue,
        neto: netoValue,
        bruto: intValue(netoValue * 1.19)
      })
    }
  }


  function increase () {
      const cantidad = selectedItem.cantidad + 1
      const unitarioValue = selectedItem.unitario
      const descuento = (selectedItem.bonificacion/100) * unitarioValue
      const netoValue = (unitarioValue - descuento) * cantidad
      const brutoValue = intValue(netoValue * 1.19)

      setSelectedItem({
        ...selectedItem,
        cantidad: cantidad,
        neto: intValue(netoValue),
        bruto: brutoValue
      })
  }


  function decrease () {

      const cantidad = selectedItem.cantidad === 1 ? 1 : selectedItem.cantidad - 1
      const unitarioValue = selectedItem.unitario
      const descuento = (selectedItem.bonificacion/100) * unitarioValue
      const netoValue = (unitarioValue - descuento) * cantidad
      const brutoValue = intValue(netoValue * 1.19)

      setSelectedItem({
        ...selectedItem,
        cantidad: cantidad,
        neto: intValue(netoValue),
        bruto: brutoValue
      })

  }


  function deleteItem (id) {
    const updateData = itemsDocumentoVenta.filter((item)=>item.value !== id)
    setItemsDocumentoVenta(updateData)
  }


  function getSubTotal () {
    let subTotal = 0;
    itemsDocumentoVenta.forEach(element => {
      subTotal = subTotal +element.neto
    });
    
    return subTotal

  }


  function getTotal () {
    let total = 0;
    itemsDocumentoVenta.forEach(element => {
      total = total +element.bruto
    });
    return total
  }


  function saveChanges () {
    
    const updateData = itemsDocumentoVenta.map((element)=>{
      if(element.id === selectedItem.id){
        return {...selectedItem,edit:false}
      }else{
        return element
      }
    })
    
    console.log(updateData)
    setItemsDocumentoVenta(updateData)
    setLoading(true)

    setTimeout(() => {
      setSelectedItem(null)
      setLoading(false)
    }, 90);
  }



  function cancelChanges () {
    const updateData = itemsDocumentoVenta.map((element)=>{
      return {...element,edit:false}
    })

    setItemsDocumentoVenta(updateData)
    setLoading(true)

    setTimeout(() => {
      setSelectedItem(null)
      setLoading(false)
    }, 90);
  }


  useEffect(() => {
    console.log('save changed first')
    console.log(restructuredOTs(ordenesDeTrabajo))
  }, [])
  

  return(
    <>
    <div className='principal-container-column'>
      
      <div className='form-grid'>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Vincular a orden de trabajoo</span>
          <Radio.Group onChange={onChange} value={vincularOT}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
      </div>
      {
        vincularOT === true ?
        <>
          <div className='row-space-btw form-header-step'>
            <div className='row'>
              <h2 style={{fontSize:20}}>Orden de trabajo</h2>
              <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
                <FiDownload />
              </div>
            </div>
            <AddMoreBtn 
            label={'Vincurlar Orden de Trabajo'}
            HanldeClick={addOT}
            />
          </div>
          {
            ordenesDeTrabajoList.length === 0 ?
            <></>
            :
            <>
              <Table
                  dataSource={
                    itemsOTlist
                  }
                  columns={
                    [
                      {
                        title: 'OT',
                        dataIndex: 'idOT',
                        key: 'idOT',
                        render: (text,record) => (
                          <>OT-{record.idOT.slice(-4)}</>
                        ),
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
            </>
          }
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
            {
              itemsDocumentoVenta.find((item)=>item.edit == true) ? 
              <></>
              :
              <AddMoreBtn 
              label={'Agregar otro producto/servicio'}
              HanldeClick={addItem}
              />
            }
          </div>
          {
            itemsDocumentoVenta.length === 0 ?
            <></>
            :
            <>
              <Table
                  dataSource={itemsDocumentoVenta}
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
                        title: 'Precio unitario',
                        dataIndex: 'unitario',
                        key: 'unitario'
                      },
                      
                      {
                        title: 'Neto',
                        dataIndex: 'neto',
                        key: 'neto'
                      },
                      {
                        title: 'Bruto',
                        dataIndex: 'bruto',
                        key: 'bruto',
                      },
                      {
                        title: '%',
                        dataIndex: 'bonificacion',
                        key: 'bonificacion',
                        render: (text,record) => (
                          <>
                            {
                              record.bonificacion ? 
                              <>{text}</>
                              :
                              <>-</>
                            }
                          </>
                        )
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
                                  const updateData = itemsDocumentoVenta.map((item)=>{
                                    if(item.value === record.value){
                                      return {...item,edit:true}
                                    }
                                    return {...item,edit:false}
                                  })
                                  setItemsDocumentoVenta(updateData)
                                  setSelectedItem({...record,edit:true})}}
                                  
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
              {
                itemsDocumentoVenta.find((item)=>item.edit == true) ? 
                <></>
                :
                <div className='container-item-flex-end'>
                    <div className='column' style={{boxSizing:"border-box",padding:20}}>
                      <div className='row'>
                        <span style={{fontWeight:600}}>SubTotal: </span>
                        <span>$ {getSubTotal()}</span>
                      </div>
                      <div className='row'>
                        <span style={{fontWeight:600}}>IVA (19%): </span>
                        <span>$ {getTotal() - getSubTotal()}</span>
                      </div>
                      <div className='row'>
                        <span style={{fontWeight:600}}>Total: </span>
                        <span>$ {getTotal()}</span>
                      </div>
                    </div>
                </div>

              }
            
            </>
          }
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              
              <div className='row-space-btw form-header-step'>
                <span className='form-label' style={products.length === 0 ? {color:"#b9b9b9c4"} : {}}>Producto/Servicio <span style={products.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
                {
                  itemsDocumentoVenta.find((item)=>item.edit == true) ? 
                  <div></div>
                  :
                  <div className='row' style={products.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} onClick={()=>{
                    setProductModal(true)
                    }}>
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
                    itemsDocumentoVenta.find((item)=>item.edit == true) ? 
                    <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8}}>{selectedItem.label}</div>
                    :
                    <SelectComp
                      placeholder={'Seleccionar producto/servicio'}
                      value={selectedItem ? selectedItem.value : null}
                      options={productosRestructured(products)}
                      HandleChange={(value,record)=>{
                        setSelectedItem(null)
                        setTimeout(() => {
                          setSelectedItem({...record, bonificacion: null,edit: false})
                        }, 90);
    
                      }}
                    />

                  }
                
                </>
              }
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Descripción</span>
              {
                loading === true || selectedItem === null?
                <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
                :
                <input style={{padding:8}} placeholder='Introduce una descripción'/>
              }
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
              {
                loading === true || selectedItem === null?
                <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
                :
                <>
                  <div className='row-space-btw'>
                    <div onClick={()=>{decrease()}}>-</div>
                    <div>{selectedItem.cantidad}</div>
                    <div onClick={()=>{increase()}}>+</div>
                  </div>
                </>
              }
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Precio unitario <span style={{color:"red"}}>*</span></span>
              {
                loading === true || selectedItem === null ?
                <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
                :
                <input style={{padding:8}}      
                  type='number' 
                  placeholder='Ingrese el precio' 
                  onChange={changeUnitPrice} 
                  value={selectedItem ? selectedItem.unitario : null} 
                  data-iva={selectedItem ? selectedItem.iva : null}
                />
              }

              
            </div>
          </div>
        
          <div className='principal-grid grid-4-columns'>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>%</span>
              {
                loading === true || selectedItem === null?
                <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
                :
                <input 
                style={{padding:8}} 
                type='number'
                value={selectedItem ? selectedItem.bonificacion : null}
                onChange={percent}
                
                data-iva={selectedItem ? selectedItem.iva : null}

                />
              }
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Neto</span>
              {
                loading === true || selectedItem === null?
                <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
                :
                <input 
                  style={{padding:8}} 
                  type='number' 

                  value={selectedItem ? selectedItem.neto : null} 
                  
                  
                  onChange={changeNeto}
                  data-iva={selectedItem ? selectedItem.iva : null}
                />
              }
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Bruto</span>
              {
                loading === true || selectedItem === null?
                <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8,color:"white"}}>s</div>
                :
                <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8}}>{selectedItem ? selectedItem.bruto : ""}</div>
                
              }
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Total</span>
              
              <input style={{padding:8}} value={loading === true ? null : (selectedItem ? selectedItem.total : null)}/>
            </div>

          </div>

         
        </>
      }

      
      
      {/*pasar al siguiente paso*/}
      <div className='row-space-btw' style={{marginTop:30}}>
        {
          vincularOT === false && itemsDocumentoVenta.find((item)=>item.edit == true) ? 
          <>
            <CancelBtn label={'Cancelar'} HanldeClick={cancelChanges}/>
            <CreateBtn label={'Guardar cambios'} HanldeClick={saveChanges}/>
          </>
          :
          <>
            <FormerBtn setStep={setStep} value={1}/>
            <CreateBtn 
              label={'Crear documento de venta'}
              HanldeClick={createDV}
            />
          </>
        }
        {
          /*
          <FollowingBtn setStep={setStep} value={4}/>
          */
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

const FourthStep = ({setStep}) =>{


  function createDV () {
    setStep(6)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Documento de despacho</h2>

      <div className='column' style={{gap:5}}>
        <span className='form-label'>Asociar guía</span>
        <SelectComponent/>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Orden de trabajo <span style={{color:"red"}}>*</span></span>
          <input style={{padding:6}} placeholder='Ingrese la orden de trabajo'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ítem <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input 
          style={{padding:6}} 
          placeholder='Ingrese la cantidad'
          
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha recepción  <span style={{color:"red"}}>*</span></span>
          <DatePicker picker='date' value={fecha} onChange={onChange}/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas</span>
          <textarea style={{height:100}}/>
        </div>
      </div>

      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={3}/>
        <CreateBtn label={'Crear documento'} HanldeClick={createDV}/>
      </div>

    </div>
  )
}


const NuevoDocumentoDeVenta = () => {

  const navigate = useNavigate()

  ////////////////////////////////////////////
  const {menuOptions,setMenuOptions,userLoggedData} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/sale_invoices')
    setMenuOptions(updateData)
  }, [])

  ///////////////////////////////


  //DATA GENERAL
  const dataInitialState = {
    numero_documento: null,
    numero_documento_relacionado: null,
    motivo_referencia: null,
    fecha: null
  }
  const [ data,setData ] = useState(dataInitialState)


  //////////////////////////////////////////

  //DOMCUENTO EXTERNO


  //Referencia a documentos externos value
  const [ referenciaADocumentosExternos,setReferenciaADocumentosExternos ] = useState(null)
  
  const dataDocumentoExternoInitialState = {
    folio: null,
    razon: null,
  }

  const [ dataDocumentoExterno,setDataDocumentoExterno ] = useState(dataDocumentoExternoInitialState)

  const [ fechaDocumentoExterno,setFechaDocumentoExterno ] = useState(null)

  const [ tipoDeDocumentoExterno,setTipoDeDocumentoExterno ] = useState(null)


  
  //////////////////////////////////////////
  
  //TIPO DE DOCUMENTO RELACIONADO
  
  const [ tipoDeDocumentoRelacionado,setTipoDeDocumentoRelacionado ] = useState(null)

  //TIPO DE DOCUMENTO
  const tipoDeDocumentoInitialState = {
    label:'Factura',
    value:1
  }
  const [ tipoDeDocumento,setTipoDeDocumento ] = useState(tipoDeDocumentoInitialState)


  //CLIENTE
  const [ selectedClient,setSelectedClient ] = useState(null)

  //TIPO DE NOTA

  const [ tipoDeNota,setTipoDeNota ] = useState(null)

  


  //VENDEDOR
  const [ vendedor,setVendedor ] = useState(null)


  //CENTRO BENEFICIO
  const [centoBeneficio,setCentoBeneficio ] = useState({ label: "Ventas", value: 25 })

  //DOCUMENTOS EXTERNOS
  const [ documentosExternosList,setDocumentosExternosList ] = useState([])

  
  ///---------------------------------------------
  ////////////////////////////////////////////////

  //ORDENES DE TRABAJO VINCULADAS
  const [ vincularOT, setVincularOT ] = useState(true)

  const [ ordenesDeTrabajoList,setOrdenesDeTrabajoList ] = useState([])

  const [ ordenDeTrabajoSelected,setOrdenDeTrabajoSelected ] = useState(null)

  const [ itemsOTlist,setItemsOTList ] = useState([])

  ////////////////////////////////////////////////
  ///---------------------------------------------


  //ALTERNATIVA A ORDENES DE TRABAJO VINCULADAS

  const [ alterordenesDeTrabajoList,setAlterOrdenesDeTrabajoList ] = useState([])

  //CONDICION DE PAGO

  const [ condicionDePago,setCondicionDePago ] = useState(null)


  //GUIA ASOCIADA

  const [ guia,setGuia ] = useState(null)


  

  const [ step,setStep ] = useState(1);


  //FECHA
  const [ fecha,setFecha ] = useState(null)



  /////////////////////////////////////////

  const [ selectedDicumentoRelacionado,setSelectedDocumentoRelacionado ] = useState(null)

  /////////////////////////////////////////

  const [ itemsDocumentoVenta,setItemsDocumentoVenta ] = useState([])


  /////////////////////////////////////////

  const [ documentsList,setDocumentsList ] = useState([])




  ////////
  //motivo de referencia
  const [ motivoReferencia,setMotivoReferencia ] = useState(null)


  ////////////////////////////////////////
  //Comprobante asociada
  const [ documentoRelacionadosList,setDocumentoRelacionadosList ] = useState([])


  //Comprobante id 
  const [ documentoRelacionado,setDocumentoRelacionado ] = useState(null)


  const [ documentType,setDocumentType ] = useState(null)


  useEffect(() => {
    //console.log(userLoggedData.RUT.replace(/-.*/, ''))
  }, [])
  



  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep 
        setStep={setStep} 
        tipoDeDocumento={tipoDeDocumento} 
        setTipoDeDocumento={setTipoDeDocumento}
        tipoDeNota={tipoDeNota} 
        setTipoDeNota={setTipoDeNota} 
        setTipoDeDocumentoRelacionado={setTipoDeDocumentoRelacionado} 
        tipoDeDocumentoRelacionado={tipoDeDocumentoRelacionado} 
        vendedor={vendedor} 
        setVendedor={setVendedor} 
        condicionDePago={condicionDePago} 
        setCondicionDePago={setCondicionDePago} 
        centoBeneficio={centoBeneficio} 
        setCentoBeneficio={setCentoBeneficio}
        fecha={fecha}
        setFecha={setFecha}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        data={data}
        setData={setData}
        dataInitialState={dataInitialState}
        setMotivoReferencia={setMotivoReferencia}
        motivoReferencia={motivoReferencia}
        />
      
      case 2:
        return <SecondStep 
          setStep={setStep} referenciaADocumentosExternos={referenciaADocumentosExternos} setReferenciaADocumentosExternos={setReferenciaADocumentosExternos} tipoDeDocumentoExterno={tipoDeDocumentoExterno} setTipoDeDocumentoExterno={setTipoDeDocumentoExterno}
          selectedDicumentoRelacionado={selectedDicumentoRelacionado}
          setSelectedDocumentoRelacionado={setSelectedDocumentoRelacionado}
          documentsList={documentsList}
          setDocumentsList={setDocumentsList}
          documentoRelacionadosList={documentoRelacionadosList}
          setDocumentoRelacionadosList={setDocumentoRelacionadosList}
          tipoDeNota={tipoDeNota}
          documentoRelacionado={documentoRelacionado}
          setDocumentoRelacionado={setDocumentoRelacionado}
          tipoDeDocumento={tipoDeDocumento}
          centoBeneficio={centoBeneficio}
          fecha={fecha}
          vendedor={vendedor}
          documentType={documentType}
          setDocumentType={setDocumentType}
        />
      
      case 3:
        return <ThirdStep 
          setStep={setStep} 
          setVincularOT={setVincularOT} 
          vincularOT={vincularOT} 
          ordenDeTrabajoSelected={ordenDeTrabajoSelected} setOrdenDeTrabajoSelected={setOrdenDeTrabajoSelected} ordenesDeTrabajoList={ordenesDeTrabajoList} setOrdenesDeTrabajoList={setOrdenesDeTrabajoList}
          itemsOTlist={itemsOTlist}
          setItemsOTList={setItemsOTList}
          itemsDocumentoVenta={itemsDocumentoVenta}
          setItemsDocumentoVenta={setItemsDocumentoVenta}
          tipoDeDocumento={tipoDeDocumento}
          selectedClient={selectedClient}
          data={data}
          fecha={fecha}
          vendedor={vendedor}
          centoBeneficio={centoBeneficio}
          condicionDePago={condicionDePago}
          
        />
        
      case 4:
        return <FourthStep setStep={setStep}/>

      
      
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/sale_invoices')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  ventas</span>
      </div>
      <h1>Agregar documento de venta</h1>
      {
        step === 6 ?
        <Success message={'Documento creado con éxito!'}/>
        :
        <PrincipalCard>
          <div className='step-container step-container-2-steps'>
            <div className='step-container-item'>
              <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
              <div className='step-item-dot-cta' style={{left:-20}}>1</div>
              <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>

            </div>
          </div>
          

          <form className='step-form'>
            {
              formSetupSteps()
            }
          </form>

        </PrincipalCard>
      }
    
    </>
  )
}

export default NuevoDocumentoDeVenta