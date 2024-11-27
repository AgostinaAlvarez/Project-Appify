import React from 'react'

const ContabilidadConfig = () => {
  return (
    <>
      <h3>Facturación electrónica</h3>
      <div className='row-test'>
        <span>Recibir documentos electronicos de LibreDTE automáticamente: No</span>
        <span>Contraseña SII del 77277874-0, para buscar las boletas de honorarios recibidas: Contraseña configurada</span>
      </div>
      <div className='column-test'>
        <span>Folio facturas exentas:</span>
        <span>Folio facturas:</span>
        <span>Folio facturas de compra:</span>
        <span>Folio notas de débito:</span>
        <span>Folio notas de crédito:</span>
        <span>Folio guías de despacho:</span>
        <span>Folio boletas exentas:</span>
        <span>Folio boletas físicas (mesón):</span>
        <span>Folio boletas electrónicas:</span>
        <span>Set de facturas básicas:</span>
        <span>Set de boletas:</span>
        <span>Set de facturas de exportación:</span>
        <span>Set de facturas de compra:</span>
      </div>
      <h3>Cobranza</h3>
      <div className='column-test'>
        <h3>Asunto</h3>
        <span>Cobranza</span>
      </div>
      <div className='grid-test' style={{gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        <div>
          <h3>Mensaje nivel 1</h3>
          <div style={{width:"100%",border:"1px solid grey",boxSizing:"border-box",padding:10}}>
            Hola
            Los siguientes documentos están pendientes de pago, favor indicar fecha programada de pago
            Gracias!
          </div>
        </div>
        <div>
          <h3>Mensaje nivel 1</h3>
          <div style={{width:"100%",border:"1px solid grey",boxSizing:"border-box",padding:10}}>
            Hola
            Recuerdo que los siguientes documentos permanecen pendientes de cobro
            Favor regularizar la deuda cuando antes
            Gracias!
          </div>
        </div>
        <div>
          <h3>Mensaje nivel 3</h3>
          <div style={{width:"100%",border:"1px solid grey",boxSizing:"border-box",padding:10}}>
            Hola
            Favor regularizar deuda o indicar un plan de pagos,
            ¡Gracias!
          </div>
        </div>
      </div>
      <h3>Módulo administración</h3>
      <div className='column-test' >
        <div>
          <h3>Cuenta impuesto débito:</h3>
          <span>IVA por pagar</span>
        </div>

        <div>
          <h3>Cuenta impuesto crédito:</h3>
          <span>IVA por pagar</span>
        </div>

        <div>
          <h3>Valor impuesto retenido boleta honorarios:</h3>
          <span>13%</span>
        </div>

        <div>
          <h3>Cuenta AGOS no recuperable:</h3>
          <span>Anticipo clientes</span>
        </div>

        <div>
          <h3>Plazo AGOS no recuperables:</h3>
          <span>90% Dias</span>
        </div>

        <div>
          <h3>Cuenta de retención de impuesto:</h3>
          <span>Retención honorarios</span>
        </div>

        <div>
          <h3>Cuenta impuesto débito:</h3>
          <span>IVA por pagar</span>
        </div>

        <div>
          <h3>Cuenta impuesto débito:</h3>
          <span>IVA por pagar</span>
        </div>

        <div>
          <h3>Cuenta impuesto débito:</h3>
          <span>IVA por pagar</span>
        </div>

        <div>
          <h3>Cuenta impuesto débito:</h3>
          <span>IVA por pagar</span>
        </div>
      </div>
      <h3>Por pagar</h3>
      <div className='column-test'>
        <div>
          <h3>Cuenta facturas por cobrar:</h3>
          <span>Cuentas por cobrar</span>
        </div>
        <div>
          <h3>Cuenta documentos en cartera por cobrar:</h3>
          <span>Dto fecha cartera</span>
        </div>
      </div>
      <h3>Anticipo</h3>
      <div className='column-test'>
        <div>
          <h3>Cuenta de anticipo clientes:</h3>
          <span>Anticipo clientes</span>
        </div>
        <div>
          <h3>Cuenta de anticipo proveedores:</h3>
          <span>Anticipo proveedores</span>
        </div>
        <div>
          <h3>Cuenta de balance apertura:</h3>
          <span>Patrimonio de balance de apertura</span>
        </div>
        <div>
          <h3>Cuenta para ajuste cambiario:</h3>
          <span>Diferencias tipo cambio</span>
        </div>
        <div>
          <h3>Cuenta botón de pago:</h3>
        </div>
        <div>
          <h3>Cuenta de beneficio defecto:</h3>
        </div>
      </div>
      <h3>Por clasificar</h3>
      <div className='column-test'>
        <div>
          <h3>Cuenta para documentos pendientes por clasificar:</h3>
          <span>Pendiente por revisar</span>
        </div>
      </div>
    </>
  )
}

export default ContabilidadConfig