import React from 'react'
import NuevoProveedor from '../../screens/Empresa/Proveedores/NuevoProveedor/NuevoProveedor'

const RenderProviderModal = ({ proveedorModal, setProveedorModal }) => {
  return (
    <>
    {
      proveedorModal === true ?
      <div className='modal-overlay'>
        <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"0px 20px"}}>
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
    </>
  )
}

export default RenderProviderModal