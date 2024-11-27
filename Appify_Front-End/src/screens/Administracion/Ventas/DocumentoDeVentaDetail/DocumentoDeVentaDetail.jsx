import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import PrincipalCard from '../../../../components/Card/PrincipalCard'
import { Table } from 'antd'

const DocumentoDeVentaDetail = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='row' onClick={()=>{navigate('/sale_invoices')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  ventas</span>
      </div>
      <PrincipalCard>
        <div style={{display:"flex",flexDirection:"column",padding:20,gap:30}}>

          <div className='row-space-btw' style={{borderBottom:"1px solid grey",paddingBottom:30}}>
            <div className='row'>
              <div>Imagen</div>
              <div className='column'>
                <h3>Nombre de la empresa</h3>
                <span>Giro</span>
                <span>Direccion</span>
              </div>
            </div>
            <div>
              <h2>Tipo de documento</h2>
            </div>
          </div>

          <div className='row-space-btw' style={{alignItems:"flex-start"}}>
            
            <div className='column'>
              
              <div className='row'>
                <span>Cliente:</span>
                <span>Nombre Cliente</span>
              </div>

              <div className='row'>
                <span>Dirección:</span>
                <span>Direc 2391</span>
              </div>

              <div className='row'>
                <span>N° teléfono:</span>
                <span>2849292299</span>
              </div>

              <div className='row'>
                <span>Vendedor:</span>
                <span>Nombre Vendedor</span>
              </div>

            </div>
            
            <div className='column'>
        
              <div className='row'>
                <span>Fecha emisión:</span>
                <span>08/06/2024</span>
              </div>

              <div className='row'>
                <span>Condición de pago:</span>
                <span>4 meses</span>
              </div>

            </div>

          </div>
          
          <Table
            dataSource={[]}
            columns={[
              {
                title: 'Producto/servicio',
                dataIndex: 'item',
                key: 'item',
              },
              {
                title: 'Cantidad',
                dataIndex: 'cantidad',
                key: 'cantidad',
              },
              {
                title: 'Precio unitario',
                dataIndex: 'unitario',
                key: 'unitario',
              },
              {
                title: 'Neto',
                dataIndex: 'neto',
                key: 'neto',
              },
            ]}
          />

          <div className='container-item-flex-end'>
            <div className='column'>
              <div className='row'>
                <span>Subtotal:</span>
                <span>$</span>
              </div>
              <div className='row'>
                <span>Iva (19%):</span>
                <span>0</span>
              </div>
              <div className='row'>
                <span>Total:</span>
                <span>$</span>
              </div>
            </div>
          </div>

        </div>
      </PrincipalCard>
    </>
  )
}

export default DocumentoDeVentaDetail