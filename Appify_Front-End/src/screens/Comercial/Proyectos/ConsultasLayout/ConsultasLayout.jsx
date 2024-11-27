import React, { useState } from 'react'
import ConsultasTodas from './ConsultasTodas';
import ConsultasPendientes from './ConsultasPendientes';

const ConsultasLayout = () => {
  const [ layout,setLayout ] = useState(0);

  function RenderComponent () {
    switch (layout) {
      case 0:
        return <ConsultasTodas/>
      case 1:
        return <ConsultasPendientes/> 
    }
  }

  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>TODOS</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>PENDIENTES</button>
        </div>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      {RenderComponent()}
    </>
  )
}

export default ConsultasLayout