import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import {  updatePagosDash } from '../../../../../utils/helpers';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Success from '../../../../../components/Modals/Success';
import PrincipalCard from '../../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../../components/Select/SelectComponent';
import { DatePicker } from 'antd';
import CreateBtn from '../../../../../components/Buttons/CreateBtn';
import SelectComp from '../../../../../components/Select/SelectComp';
import { FaUserPlus } from 'react-icons/fa';
import NuevoProveedor from '../../../../Empresa/Proveedores/NuevoProveedor/NuevoProveedor';

const NuevoPago = () => {

  const { setMenuOptions,proveedores } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    const updateData = updatePagosDash()
    setMenuOptions(updateData)
  }, [])
  
  const [step,setStep] = useState(1)

  function createCobro () {
    setStep(2)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }

  const [ proveedorModal,setProveedorModal ] = useState(false)

  function proveedoresRestructured (proveedoresArray) {
    const updateData = proveedoresArray.map((item)=>{
      return {
        ...item, label: item.razon_social, value: item.id
      }
    })
    return updateData
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/payment_groups')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a pagos</span>
      </div>
      <h1>Generar pago</h1>
      {
        step === 2?
        <Success message={'Pago generado con éxito! '}/>
        :
        <PrincipalCard>
          <form className='step-form'>
            <div className='principal-container-column'>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Banco <span style={{color:"red"}}>*</span></span>
                  <SelectComp 
                    placeholder={'Seleccionar banco'}
                    options={[
                      { value: 1, label: 'Activos fijo' },
                      { value: 2, label: 'Ajustes de centralización' },
                      { value: 3, label: 'Anticipo clientes' },
                      { value: 4, label: 'Anticipo proveedores' },
                      { value: 5, label: 'Arriendos y leasing' },
                      { value: 6, label: 'Cargos e interes bancarios' },
                      { value: 7, label: 'Comidas y entretenimiento' },
                      { value: 8, label: 'Contratistas' },
                      { value: 9, label: 'Costo insumos, materiales y productos' },
                      { value: 10, label: 'Créditos bancarios' },
                      { value: 11, label: 'Cuentas por cobrar' },
                      { value: 12, label: 'Cuentas por pagar' },
                      { value: 13, label: 'Cuentas servicios básicos' },
                      { value: 14, label: 'Dcto fecha cartera' },
                      { value: 15, label: 'Dctos girados y no cobrados' },
                      { value: 16, label: 'Diferencias tipo cambio' },
                      { value: 17, label: 'Gasto sin documento tributario' },
                      { value: 18, label: 'Gastos reembolsables' },
                      { value: 19, label: 'Gastos sin clasificar' },
                      { value: 20, label: 'Honorarios por pagar' },
                      { value: 21, label: 'Impuestos pagados retenidos' },
                      { value: 22, label: 'Impuestos y patentes' },
                      { value: 23, label: 'Intereses y gastos financieros' },
                      { value: 24, label: 'Inventarios productos y materias primas' },
                      { value: 25, label: 'Inversion socios' },
                      { value: 26, label: 'Iva no recuperrable' },
                      { value: 27, label: 'IVA por pagar' },
                      { value: 28, label: 'Otros activos circulante' },
                      { value: 29, label: 'Otros gastos del negocio' },
                      { value: 30, label: 'Otros gastos misceláneos' },
                      { value: 31, label: 'Otros ingresos no operacionales' },
                      { value: 32, label: 'Pago socios y gastos personales' },
                      { value: 33, label: 'Patrimonio de balance de apertura' },
                      { value: 34, label: 'Pendiente por revisar' },
                      { value: 35, label: 'Preguntar a mi contador' },
                      { value: 36, label: 'Prestamos empleados' },
                      { value: 37, label: 'Publicidad y marketing' },
                      { value: 38, label: 'Remuneraciones socios' },
                      { value: 39, label: 'Reparaciones y mantenimiento' },
                      { value: 40, label: 'Retención honorarios' },
                      { value: 41, label: 'Retiro de socios' },
                      { value: 42, label: 'Seguros' },
                      { value: 43, label: 'Servicios Legales y Profesionales' },
                      { value: 44, label: 'Sueldos y remuneraciones personal' },
                      { value: 45, label: 'Suministros de oficina y software' },
                      { value: 46, label: 'Varios acreedores' },
                      { value: 47, label: 'Vehiculos y gastos asociados' },
                      { value: 48, label: 'Ventas' },
                      { value: 49, label: 'Ventas sin documento tributario' },
                      { value: 50, label: 'Viajes' }
                    ]}
                  />
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Cuenta <span style={{color:"red"}}>*</span></span>
                  <SelectComp 
                    placeholder={'Seleccionar cuenta'}
                    options={[
                      { value: 1, label: 'Activos fijo' },
                      { value: 2, label: 'Ajustes de centralización' },
                      { value: 3, label: 'Anticipo clientes' },
                      { value: 4, label: 'Anticipo proveedores' },
                      { value: 5, label: 'Arriendos y leasing' },
                      { value: 6, label: 'Cargos e interes bancarios' },
                      { value: 7, label: 'Comidas y entretenimiento' },
                      { value: 8, label: 'Contratistas' },
                      { value: 9, label: 'Costo insumos, materiales y productos' },
                      { value: 10, label: 'Créditos bancarios' },
                      { value: 11, label: 'Cuentas por cobrar' },
                      { value: 12, label: 'Cuentas por pagar' },
                      { value: 13, label: 'Cuentas servicios básicos' },
                      { value: 14, label: 'Dcto fecha cartera' },
                      { value: 15, label: 'Dctos girados y no cobrados' },
                      { value: 16, label: 'Diferencias tipo cambio' },
                      { value: 17, label: 'Gasto sin documento tributario' },
                      { value: 18, label: 'Gastos reembolsables' },
                      { value: 19, label: 'Gastos sin clasificar' },
                      { value: 20, label: 'Honorarios por pagar' },
                      { value: 21, label: 'Impuestos pagados retenidos' },
                      { value: 22, label: 'Impuestos y patentes' },
                      { value: 23, label: 'Intereses y gastos financieros' },
                      { value: 24, label: 'Inventarios productos y materias primas' },
                      { value: 25, label: 'Inversion socios' },
                      { value: 26, label: 'Iva no recuperrable' },
                      { value: 27, label: 'IVA por pagar' },
                      { value: 28, label: 'Otros activos circulante' },
                      { value: 29, label: 'Otros gastos del negocio' },
                      { value: 30, label: 'Otros gastos misceláneos' },
                      { value: 31, label: 'Otros ingresos no operacionales' },
                      { value: 32, label: 'Pago socios y gastos personales' },
                      { value: 33, label: 'Patrimonio de balance de apertura' },
                      { value: 34, label: 'Pendiente por revisar' },
                      { value: 35, label: 'Preguntar a mi contador' },
                      { value: 36, label: 'Prestamos empleados' },
                      { value: 37, label: 'Publicidad y marketing' },
                      { value: 38, label: 'Remuneraciones socios' },
                      { value: 39, label: 'Reparaciones y mantenimiento' },
                      { value: 40, label: 'Retención honorarios' },
                      { value: 41, label: 'Retiro de socios' },
                      { value: 42, label: 'Seguros' },
                      { value: 43, label: 'Servicios Legales y Profesionales' },
                      { value: 44, label: 'Sueldos y remuneraciones personal' },
                      { value: 45, label: 'Suministros de oficina y software' },
                      { value: 46, label: 'Varios acreedores' },
                      { value: 47, label: 'Vehiculos y gastos asociados' },
                      { value: 48, label: 'Ventas' },
                      { value: 49, label: 'Ventas sin documento tributario' },
                      { value: 50, label: 'Viajes' }
                    ]}
                  />
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Tipo de movimiento <span style={{color:"red"}}>*</span></span>
                  <SelectComp
                    options={[
                      {
                        value:1,
                        label:'Debe'
                      },
                      {
                        value:2,
                        label:'Haber'
                      },

                    ]}
                  />
                </div>


                <div className='column' style={{gap:5}}>
          
                  <div className='row-space-btw'>
                    <span className='form-label' style={proveedores.length === 0 ? {color:"#b9b9b9c4"} : {}}>Proveedor <span style={proveedores.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
                    <div style={proveedores.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{setProveedorModal(true)}} >
                      <FaUserPlus/>
                      <span>Agregar nuevo proveedor</span>
                    </div>
                  </div>
                  {
                    proveedores.length === 0 ?
                    <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
                      <span>No hay proveedores registrados</span>
                    </div>
                    :
                    <SelectComp
                      placeholder={'seleccionar proveedor'}
                      HandleChange={(value,record)=>{
                        //agregar functionalidad 
                        
                      }}
                      options={proveedoresRestructured(proveedores)}
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
                  <DatePicker picker='week'/>
                </div>
              </div>


              <div className='container-item-flex-end' style={{marginTop:30}}>
                <CreateBtn label={'Generar cobro'} HanldeClick={createCobro}/>
              </div>



            </div>
          </form>
          {
            proveedorModal === true ?
            <div className='modal-overlay'>
              <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"10px 40px"}}>
                <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setProveedorModal(false)}}>x</div>
                <div style={{width:"100%",border:"1px solid black",height:"95%",overflowY:"scroll"}}>
                  <NuevoProveedor
                    reference={true}
                    setClose={setProveedorModal}
                  />
                </div>
              </div>
            </div>
            :
            <></>
          }
        </PrincipalCard> 
      }
    </>
  )
}

export default NuevoPago