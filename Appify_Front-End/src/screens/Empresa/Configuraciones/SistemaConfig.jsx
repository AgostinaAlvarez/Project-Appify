import React from 'react'

const SistemaConfig = () => {
  return (
    <>
      <h3>Empresa</h3>
      <div className='row-test' style={{alignItems:"flex-start"}}>
        <div style={{height:70,width:70,borderRadius:"50%",backgroundColor:"red"}}></div>
        
        <div className='column-test'>
          <span>Nombre</span>
          <span>Direccion casa matriz</span>
          <span>Direccion bodega</span>
          <span>Prefijo Telefono</span>
          <span>RUT Empresa</span>
          <span>Giro comercial</span>
          <span>Pagina Web</span>
          <span>Prefijo Celular</span>
        </div>
      </div>
      <h3>Sistema</h3>
      <div className='column-test'>
        <span>Pais</span>
        <span>Idioma</span>
        <span>Correo para cobranzas</span>
        <span>Moneda</span>
        <span>Moneda secundaria</span>
        <span>Tasa cambio venta (/$) / Tasa cambio compra ($/)</span>
        <span>Obtener tasa de cambio automáticamente</span>
        <span>Sistema de medida</span>
        <span>Tolerancia facturas de venta</span>
        <span>Registro de entregas (autocompletar fecha)</span>
      </div>
      <h3>Produccion</h3>
      <span>Esconder información del cliente en OT: No</span>
      <h3>Plugins</h3>
    </>
  )
}

export default SistemaConfig