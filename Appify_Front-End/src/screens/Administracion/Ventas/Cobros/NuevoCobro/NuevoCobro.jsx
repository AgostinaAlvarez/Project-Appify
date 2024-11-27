import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import { updateCobrosDash } from '../../../../../utils/helpers';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Success from '../../../../../components/Modals/Success';
import PrincipalCard from '../../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../../components/Select/SelectComponent';
import { DatePicker } from 'antd';
import CreateBtn from '../../../../../components/Buttons/CreateBtn';
import { FaUserPlus } from 'react-icons/fa';
import SelectComp from '../../../../../components/Select/SelectComp';
import { BsBank } from 'react-icons/bs';
import NuevoCliente from '../../../../Comercial/Clientes/NuevoCliente/NuevoCliente';

const NuevoCobro = () => {

  const { setMenuOptions,bancos,clientes } = useContext(AppContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    const updateData = updateCobrosDash()
    setMenuOptions(updateData)
  }, [])
  
  const [step,setStep] = useState(1)

  function createCobro () {
    setStep(2)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  function clientesRestructured (arrayClientes) {
    const updateData = arrayClientes.map((item)=>{
      return {
        ...item, value: item.cliente.id, label: item.cliente.razon_social
      }
    })

    return updateData
  }

  const [ clientModal,setClientModal ] = useState(false)
  const [ bancoModal,setBancoModal ] = useState(false)
  const [ cuentaModal,setCuentaModal ] = useState(false)

  return (
    <>
      <div className='row' onClick={()=>{navigate('/sale_payment_groups')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a cobros</span>
      </div>
      <h1>Generar cobro </h1>
      {
        step === 2?
        <Success message={'Cobro generado con éxito! '}/>
        :
        <>
        <PrincipalCard>
          <form className='step-form'>
            <div className='principal-container-column'>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <div className='row-space-btw'>
                    <span className='form-label'>Banco <span style={{color:"red"}}>*</span></span>
                    <div style={{cursor:"pointer"}} className='row' onClick={()=>{
                      setBancoModal(true)
                    }} >
                      <BsBank/>
                      <span>Agregar nuevo banco</span>
                    </div>
                  </div>
                  <SelectComp
                    //value={centoBeneficio ? centoBeneficio.value : null}
                    HandleChange={(text,record)=>{
                      //setCentoBeneficio(record)
                    }}
                    placeholder={'seleccionar banco'} 
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
                  <div className='row-space-btw'>
                    <span className='form-label'>Cuenta <span style={{color:"red"}}>*</span></span>
                    <div style={{cursor:"pointer"}} className='row' onClick={()=>{
                      //setClientModal(true)
                      setCuentaModal(true)
                    }} >
                      <BsBank/>
                      <span>Agregar nueva cuenta</span>
                    </div>
                  </div>
                  <SelectComp
                    //value={centoBeneficio ? centoBeneficio.value : null}
                    HandleChange={(text,record)=>{
                      //setCentoBeneficio(record)
                    }}
                    placeholder={'seleccionar cuenta'} 
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

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Tipo de movimiento <span style={{color:"red"}}>*</span></span>
                  <SelectComp
                    placeholder={''}
                    options={[
                      {
                        value:1,
                        label: 'Debe'
                      },
                      {
                        value:2,
                        label: 'Haber'
                      }
                    ]}
                  />
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
                  <span className='form-label'>Tipo <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Número <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}} placeholder='Ingrese  el número '/>
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Glosa</span>
                  <input style={{padding:8}}/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
                  <DatePicker picker='date'/>
                </div>
              </div>


              <div className='container-item-flex-end' style={{marginTop:30}}>
                <CreateBtn label={'Generar cobro'} HanldeClick={createCobro}/>
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
              bancoModal === true ?
              <div className='modal-overlay'>
                <div className='modal' style={{padding:"0px 20px"}}>
                  <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setBancoModal(false)}}>x</div>
                  <div style={{width:"100%",height:"95%",boxSizing:"border-box"}}>
                    <form className='step-form'>
                      <h1>Nuevo banco</h1>
                      <div>Hola</div>
                      <div className='container-item-flex-end' style={{marginTop:30}}>
                        <CreateBtn label={'Registrar banco'} HanldeClick={()=>{setBancoModal(false)}}/>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              :
              <></>
            }
            {
              cuentaModal === true ?
              <div className='modal-overlay'>
                <div className='modal' style={{padding:"0px 20px"}}>
                  <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setCuentaModal(false)}}>x</div>
                  <div style={{width:"100%",height:"95%",boxSizing:"border-box"}}>
                    <form className='step-form'>
                      <h1>Nueva cuenta</h1>
                      <div>Hola</div>
                      <div className='container-item-flex-end' style={{marginTop:30}}>
                        <CreateBtn label={'Registrar nueva cuenta'} HanldeClick={()=>{setCuentaModal(false)}}/>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              :
              <></>
            }
          </form>
        </PrincipalCard> 
        </>
      }
    </>
  )
}

export default NuevoCobro