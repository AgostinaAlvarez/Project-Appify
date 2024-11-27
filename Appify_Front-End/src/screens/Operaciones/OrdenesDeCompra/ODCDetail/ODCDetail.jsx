import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from 'react-icons/bs';
import { Checkbox, Table } from 'antd';

const ODCDetail = () => {
  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/purchases')
    setMenuOptions(updateData)
  }, [])

  const params = useParams();
  const navigate = useNavigate();
  function Facturar (){
    console.log('facturar')
  }
  return (
    <>
      <div className='row' onClick={()=>{navigate('/purchases')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  órdenes de compra</span>
      </div>
      <div className='principal-container-column'>
        <div className='row-space-btw'>
          <h1>Orden de compra N° 2297</h1>
          <AddMoreBtn label={'Facturar'} HanldeClick={Facturar}/>
        </div>
        <PrincipalCard>
          <div className='principal-container-column'>
            
            <div className='row-space-btw' style={{color:"grey"}}>
              <h2>N° 2297</h2>
              <AiFillEdit style={{fontSize:24}}/>
            </div>

            <div className='row-space-btw'>
              <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
                <span className='proyectos-detail-grid-value'>120 días</span>
                <span>Condición de pago</span>
              </div>
              <h2>04/03/2023</h2>
            </div>

            <Table
              dataSource={[
                { 
                  key:1,
                  product: 'Producto1',
                  cuenta:'Nombre cuenta',
                  precio: 1300,
                  cantidad: 1,
                  orden: 2,
                  neto: 1200
                }
              ]}
              columns={
                [
                  {
                    title: 'Producto/Servicio',
                    dataIndex: 'product',
                    key: 'product',
                  },
                  {
                    title: 'Cuenta',
                    dataIndex: 'cuenta',
                    key: 'cuenta',
                  },
                  {
                    title: 'Precio unitario',
                    dataIndex: 'precio',
                    key: 'precio',
                  },
                  {
                    title: 'Cantidad',
                    dataIndex: 'cantidad',
                    key: 'cantidad',
                  },
                  {
                    title: 'Orden de trabajo',
                    dataIndex: 'orden',
                    key: 'orden',
                  },
                  {
                    title: 'Neto',
                    dataIndex: 'neto',
                    key: 'neto',
                  },
                  {
                    title: 'Recibido',
                    render: (text, record) => (
                      <>
                        <Checkbox checked={true}/>
                      </>
                    ),
                  }
                ]
              }
            />


          </div>
        </PrincipalCard>

        <PrincipalCard>
          <div className='row-space-btw' >
            <BsFillTrash3Fill style={{color:"red",fontSize:20}}/>
          
            <div className='column'>
              <div className='row'>
                <span style={{fontWeight:800}}>Subtotal: </span>
                <span>$222</span>
              </div>
              <div className='row'>
                <span style={{fontWeight:800}}>IVA: </span>
                <span></span>
              </div>
              <div className='row'>
                <span style={{fontWeight:800}}>TOTAL: </span>
                <span>$222</span>
              </div>
              
            </div>
          </div>
        </PrincipalCard>
      </div>
    </>
  )
}

export default ODCDetail