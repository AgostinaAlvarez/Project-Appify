import React from 'react'
import NuevoPS from '../../screens/Empresa/ProductosServicios/NuevoPS/NuevoPS'

const RenderProductModal = ({ productModal, setProductModal }) => {
  return (
    <>
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

export default RenderProductModal