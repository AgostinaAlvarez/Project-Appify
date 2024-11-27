import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import PrincipalCard from '../../../../components/Card/PrincipalCard'
import SelectComponent from '../../../../components/Select/SelectComponent'
import { DatePicker } from 'antd'
import CreateBtn from '../../../../components/Buttons/CreateBtn'
import Success from '../../../../components/Modals/Success'
import { AppContext } from '../../../../context/AppContext'
import { updateSubMenuAsideOptions } from '../../../../utils/helpers'

const AgregarTransaccion = () => {
  const navigate = useNavigate()
  const [ step,setStep ] = useState(1);

  function saveChanges () {
    setStep(2)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  const {menuOptions,setMenuOptions} = useContext(AppContext);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/banks')
    setMenuOptions(updateData)
  }, [])


  return (
    <>
      <div className='principal-container-column'>
        
        <div className='row' onClick={()=>{
          //navigate('/payment_groups')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}
          navigate('/bank/1')
        }}>
          <FaArrowLeftLong/>
          <span>Volver a detalle de cuenta</span>
        </div>
        {
          step === 2 ?
          <></>
          :
          <PrincipalCard>
            <div className='principal-container-column'>
              
              <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <h1>Agregar transacción</h1>
              </div>


              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Movimiento <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}} placeholder='Ingrese el precio'/>
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Cuenta <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Cliente/Proveedor <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Número <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}} placeholder='Ingrese el precio'/>
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Fecha transacción <span style={{color:"red"}}>*</span></span>
                  <DatePicker picker='week'/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Glosa <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}} placeholder='Ingrese la glosa'/>
                </div>
              </div>

              <div className='container-item-flex-end' style={{marginTop:30}}>
                <CreateBtn label={'Crear'} HanldeClick={saveChanges}/>
              </div>

            </div>
          </PrincipalCard>

        }

      </div>
      {
          step === 2 ?
          <Success message={'Transacción creada con éxito!'}/>
          :
          <></>
      }
    </>
  )
}

export default AgregarTransaccion