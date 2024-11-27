import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { DatePicker, Table } from 'antd';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import { FiDownload } from 'react-icons/fi';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import SelectComp from '../../../../components/Select/SelectComp';
import { BsBoxSeam } from 'react-icons/bs';
import NuevoPS from '../../../Empresa/ProductosServicios/NuevoPS/NuevoPS';

const FirstStep = ({setStep}) => {
  const { subusuarios } = useContext(AppContext)

  function restructuredVendedores (arraySubUsuarios) {
    const updateData = arraySubUsuarios.map((item)=>{
      return {...item, value: item.id, label: item.nombre}
    })

    return updateData
  }



  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Datos principales</h2>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
          <SelectComp
            placeholder={'Seleccionar el tipo de cuenta'}
            options={[
              {
                value:1,
                label:'Factura'
              },
              {
                value:2,
                label:'Nota de credito'
              },
              {
                value:3,
                label:'Nota de debito'
              },
              {
                value:4,
                label:'Boleta'
              },
              {
                value:5,
                label:'Voucher de compra'
              },
              {
                value:6,
                label:'Boleta honorarios'
              },
              {
                value:7,
                label:'Factura exenta'
              },
            ]}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>N° de documento</span>
          <input style={{padding:8}} placeholder='Ingrese el número del documento'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
          <DatePicker picker='date'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Destinatario <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el nombre del destinatario'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
          <SelectComp 
            placeholder={'Seleccionar vendedor'}
            options={restructuredVendedores(subusuarios)}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago</span>
          <SelectComp
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
              HandleChange={(value,record)=>{
                //setData({...data,condicion_de_pago:value})
                //setCondicionDePagoSelected(record)
              }}
              //value={condicionDePagoSelected ? condicionDePagoSelected.value : null}
          />
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Centro de beneficio</span>
        
          <SelectComp
                //value={centoBeneficio ? centoBeneficio.value : null}
                HandleChange={(text,record)=>{
                  //setCentoBeneficio(record)
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


      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>

    </div>
  )
}


const SecondStep = ({setStep}) => {

  const { products } = useContext(AppContext)

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
    return updateData
  }


  const [ pslist,setPslist ] = useState([])


  function addProductoServicio (){
    console.log('agregando')
    setPslist([...pslist,{
      key:1+pslist.length,
      producto: `producto ${1+pslist.length}`,
      cantidad: 1,
      cuenta:'cuenta',
      precio: 2300,
      porcentaje: 0,
      neto: 2450,
      iva: 19,
      total: 2600
    }])
  }



  function createOrder () {
    setStep(3)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  const [ productModal,setProductModal ] = useState(false);


  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <div className='row'>
          <h2 style={{fontSize:20}}>Ítems</h2>
          <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
            <FiDownload />
          </div>
        </div>
        <AddMoreBtn label={'Agregar otro producto/servicio'} HanldeClick={addProductoServicio}/>
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
                    title: 'Producto/Servicio',
                    dataIndex: 'producto',
                    key: 'producto',
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
                    title: 'Neto',
                    dataIndex: 'neto',
                    key: 'neto',
                  },
                  {
                    title: 'Cuenta',
                    dataIndex: 'cuenta',
                    key: 'cuenta',
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
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la cantidad'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio unitario<span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el precio'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Neto</span>
          <input style={{padding:8}} />
        </div>
      </div>


      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cuenta<span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas</span>
          <textarea style={{height:100}}/>
        </div>
      </div>
      

      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={1}/>
        <CreateBtn label={'Crear orden'} HanldeClick={createOrder}/>
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



const NuevaCompra = () => {
  const navigate = useNavigate();
  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/service_invoices')
    setMenuOptions(updateData)
  }, [])

  const [ step,setStep ] = useState(1);

  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep}/>
      case 2:
        return <SecondStep setStep={setStep}/>
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/service_invoices')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a compras</span>
      </div>
      <h1>Certificado de compra</h1>
      {
        step === 3 ?
        <Success message={'Nuevo documento de compra generado con exito!'}/>
        :
        <PrincipalCard>
          <div className='step-container step-container-2-steps' >
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

export default NuevaCompra