import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import SistemaConfig from './SistemaConfig';
import ComercialConfig from './ComercialConfig';
import ContabilidadConfig from './ContabilidadConfig';
import ConfsMaestra from './ConfsMaestra';
import PagosConfig from './PagosConfig';

const ConfiguracionesDashboard = () => {
  const [ layout,setLayout ] = useState(0)

  function renderComponent (){
    switch (layout) {
      case 0:
        return <SistemaConfig/>
      case 1:
        return <ComercialConfig/>
      case 2:
        return <ContabilidadConfig/>
      case 3:
        return <ConfsMaestra/>
      case 4:
        return <PagosConfig/>
    }
  }
  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>SISTEMA</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>COMERCIAL</button>
          <button className={layout === 2 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(2)}}>CONTABILIDAD</button>
          <button className={layout === 3 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(3)}}>CONFS MAESTRA</button>
          <button className={layout === 4 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(4)}}>PAGOS</button>
        </div>
        <MdEdit/>
      </div>
      {
        renderComponent()
      }
    </>
  )
}

export default ConfiguracionesDashboard