import React, { useState } from 'react'
import SelectComponent from '../../../../components/Select/SelectComponent'
import ProyectosTodos from './ProyectosTodos';
import ProyectosEnEspera from './ProyectosEnEspera';
import ProyectosAceptados from './ProyectosAceptados';
import ProyectosRechazados from './ProyectosRechazados';

const ProyectosLayout = () => {
  const [ layout,setLayout ] = useState(0);

  function RenderComponent () {
    switch (layout) {
      case 0:
        return <ProyectosTodos/>
      case 1:
        return <ProyectosEnEspera/>
      case 2:
        return <ProyectosAceptados/>
      case 3:
        return <ProyectosRechazados/>
    }
  }

  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test' style={{alignItems:"flex-start"}}>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>TODOS</button>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>EN ESPERA</button>
            <span>$840</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <button className={layout === 2 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(2)}}>ACEPTADO</button>
            <span>$1119.4</span>
          </div>
          <button className={layout === 3 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(3)}}>RECHAZADO</button>
        </div>
        <div className='row-test'>
          <SelectComponent/>
          <input placeholder='buscar' style={{padding:10}}/>
        </div>
      </div>
      {RenderComponent()}
    </>
  )
}

export default ProyectosLayout