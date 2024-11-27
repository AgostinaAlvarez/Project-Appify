import React from 'react'

const ProvedorPrincipalComponent = ({proveedor}) => {
  return (
      <>
          <button style={{width:"fit-content"}}>Editar</button>
          <div className='column-test'>
            <h2>Datos generales</h2>
            <span>RUT {proveedor.rut}</span>
            <span>Razon social o nombre {proveedor.razon_social}</span>
            <span>Giro {proveedor.giro}</span>
            <span>C. de pago {proveedor.condicion_de_pago}</span>
            <span>Nombre fantasia {proveedor.nombre_fantasia}</span>
            <span>Cuenta contable {proveedor.cuenta_contable}</span>

            <h2>Informacion de contacto</h2>
            <span>Persona {proveedor.persona}</span>
            <span>Direccion {proveedor.direccion}</span>
            <span>Email {proveedor.email}</span>
            <span>Comuna {proveedor.comuna}</span>
            <span>Telefono {proveedor.telefono}</span>
            <span>Ciudad {proveedor.ciudad}</span>

            <h2>Informacion Bancaria</h2>
            <span>Banco {proveedor.banco}</span>
            <span>Nombre beneficiario {proveedor.nombre_beneficiario}</span>
            <span>Nombre cuenta {proveedor.nombre_cuenta}</span>
            <span>Rut beneficiario {proveedor.rut_beneficiario}</span>
            <span>Nro cuenta corriente {proveedor.nro_cta_corriente}</span>
            <span>Correo para cobranzas {proveedor.correo_cobranzas}</span>

          </div>
      </>
  )
}

export default ProvedorPrincipalComponent