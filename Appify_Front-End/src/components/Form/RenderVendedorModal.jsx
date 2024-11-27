import React from 'react'
import NuevoUsuario from '../../screens/Empresa/Usuarios/NuevoUsuario.jsx/NuevoUsuario'

const RenderVendedorModal = ({ vendedorModal,setVendedorModal }) => {
  return (
    <>
    {
      clienteModal === true ?
      <div className='modal-overlay'>
        <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"0px 20px"}}>
          <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setClienteModal(false)}}>x</div>
          <div style={{width:"100%",border:"1px solid black",height:"95%",overflowY:"scroll"}}>
            <NuevoUsuario
              reference={true}
              setClose={setClienteModal}
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

export default RenderVendedorModal