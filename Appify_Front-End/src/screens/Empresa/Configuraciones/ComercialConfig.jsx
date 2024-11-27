import React, { useState } from 'react'

const MensajesComponent = () =>{
  return(
    <>
      <h3>Proyectos</h3>
      <div className='grid-test' style={{gap:20}}>
        <div>
          <h4>Pie de pagina</h4>
          <input style={{width:"100%",height:40,boxSizing:"border-box",border:"1px solid grey"}}/>
        </div>
        <div>
          <h4>Mensaje envío proyecto</h4>
          <input placeholder='Hola! Te adjunto cotizacion' style={{width:"100%",height:40,boxSizing:"border-box",border:"1px solid grey"}}/>
        </div>
        <div>
          <h4>Texto inferior confirmación de compra</h4>
          <input style={{width:"100%",height:40,boxSizing:"border-box",border:"1px solid grey"}}/>
        </div>
      </div>
      <h3>Documentos de venta</h3>
      <div className='grid-test' style={{gap:20}}>
        <div>
          <h4>Mensaje envío documento</h4>
          <input placeholder='Adjunto documento tributario' style={{width:"100%",height:40,boxSizing:"border-box",border:"1px solid grey"}}/>
        </div>
      </div>
    </>
  )
}

const TemplateProyectosComponent = () =>{
  return (
    <>
      <div className='grid-test' style={{gap:20}}>
        <div>
          <h4>Detalle con imágenes pequeñas</h4>
          <div style={{width:"100%",height:60,boxSizing:"border-box",border:"1px solid grey"}}></div>
        </div>
        <div>
          <h4>Detalle con imágenes grandes</h4>
          <div style={{width:"100%",height:60,boxSizing:"border-box",border:"1px solid grey"}}></div>
        </div>
      </div>
    </>
  )
}

const ComercialConfig = () => {
  const [ layout,setLayout ] = useState(0)
  function renderComponent (){
    switch (layout) {
      case 0:
        return <MensajesComponent/>
      case 1:
        return <TemplateProyectosComponent/>
      
    }
  }

  return (
   <>
      <h3>Proyecto</h3>
      <div className='row-test' style={{alignItems:"flex-start"}}>
        <div style={{height:70,width:70,borderRadius:"50%",backgroundColor:"red"}}></div>
        <div className='column-test'>
          <span>Nombre impuesto</span>
          <span>% de OT para generar encuestas</span>
          <span>Texto para compartir proyecto</span>
          <span>Valor impuesto</span>
          <span>Nº de decimales precio unitario</span>
          <span>Cotización descuento visible</span>
        </div>
      </div>
      <h3>Para clientes</h3>
      <div className='row-test'>
        <button onClick={()=>{setLayout(0)}}>MENSAJES</button>
        <button onClick={()=>{setLayout(1)}}>TEMPLATE PROYECTOS</button>
      </div>
      {
        renderComponent()
      }
   </>
  )
}

export default ComercialConfig