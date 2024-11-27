import React from 'react'
import SelectComponent from '../../../../../../components/Select/SelectComponent'
import CreateBtn from '../../../../../../components/Buttons/CreateBtn'

const EditarBco = () => {
  return (
    <div style={{height:"100%",width:"90%",boxSizing:"border-box",padding:"20px 0px"}} className='principal-container-column'>
        <h1>Editar Banco</h1>
        <div style={{backgroundColor:"#b9b9b98d",minHeight:"30%",width:"100%",padding:20,boxSizing:"border-box"}}>
            <form className='step-form'>
                <div className='principal-container-column'>

                  <div className='form-grid'>
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Nombre </span>
                      <input  style={{padding:8}} placeholder='Ingrese el nombre'/>
                    </div>
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Código</span>
                      <input  style={{padding:8}} placeholder='Ingrese el código'/>
                    </div>
                  </div>
               </div>
            </form>
        </div>
        <div className='container-item-flex-end' style={{marginTop:30}}>
          <CreateBtn label={'Crear'} />
        </div>
    </div>
  )
}

export default EditarBco