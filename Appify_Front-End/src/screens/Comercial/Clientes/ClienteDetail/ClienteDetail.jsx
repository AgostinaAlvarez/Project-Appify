import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectComponent from '../../../../components/Select/SelectComponent';
import ClienteResumen from './ClienteDeatilComponents/ClienteResumen';
import ClienteProyectos from './ClienteDeatilComponents/ClienteProyectos';
import ClienteFacturas from './ClienteDeatilComponents/ClienteFacturas';
import { FaArrowLeftLong, FaPlus } from 'react-icons/fa6';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { AiFillEdit } from 'react-icons/ai';
import Filter from '../../../../components/Filter/Filter';
import { DatePicker, Table } from 'antd';
import { FaClipboard } from 'react-icons/fa';
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';

const ResumenHeader = () => {
  return (
    <>
      <div className='row-test'>
        <button>NUEVO PROYECTO</button>
        <button>NUEVA FACTURA</button>
      </div>
    </>
  )
}



const ClienteDetail = () => {
  const navigate = useNavigate();
  const [ layout,setLayout ] = useState(0);

  function RenderHeaderComponent () {
    switch ( layout ) {
      case 0:
        return <ResumenHeader/>
      default:
        return <></>
    }
  }

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <ClienteResumen/>
      case 1: 
        return <ClienteProyectos/>
      case 2:
        return <ClienteFacturas/>
    }
  }


  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión','/clients/dashboard')
    setMenuOptions(updateData)
  }, [])


  return (
    <>
    <div className='row' onClick={()=>{navigate('/clients/dashboard')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
      <FaArrowLeftLong/>
      <span>Volver a clientes</span>
    </div>
    <h1>ACADEMIA PÚBLICA SPA</h1>
    <div className='principal-container-column'>
      <PrincipalCard>
        <div className='principal-container-column'>
        
          <div className='row-space-btw'>
            <h2>Información de contacto</h2>
            <AiFillEdit style={{fontSize:24}}/>
          </div>
        
          <div className='principal-grid grid-3-columns'>
            <div className='principal-grid-item column'>
              <span className='principal-grid-item-value'>ACADEMIA PUBLICA SPA</span>
              <span>Razón social / Nombre</span>
            </div>
            <div className='principal-grid-item column'>
              <span className='principal-grid-item-value'>ACADEMIA PUBLICA SPA</span>
              <span>Razón social / Nombre</span>
            </div>
            <div className='principal-grid-item column'>
              <span className='principal-grid-item-value'>ACADEMIA PUBLICA SPA</span>
              <span>Razón social / Nombre</span>
            </div>
          </div>

          <h2>Datos de contacto</h2>
          <div className='row'>
            <div style={{height:30,color:"#FFFF",width:30,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",backgroundColor:"#006F76"}}>
              <span>1</span>
            </div>
            <div className='principal-grid grid-3-columns' style={{width:"70%"}}>
              <div className='principal-grid-item column'>
                <span className='principal-grid-item-value'>ACADEMIA PUBLICA SPA</span>
                <span>Razón social / Nombre</span>
              </div>
              <div className='principal-grid-item column'>
                <span className='principal-grid-item-value'>ACADEMIA PUBLICA SPA</span>
                <span>Razón social / Nombre</span>
              </div>
              <div className='principal-grid-item column'>
                <span className='principal-grid-item-value'>ACADEMIA PUBLICA SPA</span>
                <span>Razón social / Nombre</span>
              </div>
            </div>
          </div>

        </div>
      </PrincipalCard>
      
      <PrincipalCard>
        <div className='principal-container-column'>
          <div className='row-space-btw'>
            <h2>Proyectos</h2>
            <FaPlus/>
          </div>
          <Filter>
            <div className='filter-menu-item'>
              <DatePicker picker="week" />
            </div>
            <div className='filter-menu-item'>
              <DatePicker picker="year" />
            </div>
          </Filter>
          <div className='principal-grid grid-4-columns' style={{width:"60%",margin:"0 auto"}}>
            <div className='principal-grid-item column'>
              <span className='principal-grid-item-value'>5</span>
              <span>Aceptado</span>
            </div>
            <div className='principal-grid-item column'>
              <span className='principal-grid-item-value'>2</span>
              <span>En proceso</span>
            </div>
            <div className='principal-grid-item column'>
              <span className='principal-grid-item-value'>0</span>
              <span>En espera</span>
            </div>
            <div className='principal-grid-item column'>
              <span className='principal-grid-item-value'>$0</span>
              <span>Anticipos</span>
            </div>
          </div>
        </div>

      </PrincipalCard>
      
      <div className='principal-grid grid-3-columns client-detail-grid-principal-card'>
        <PrincipalCard>
          <div className='principal-container-column' style={{gap:27,position:"relative"}}>
            <div className='row-space-btw'>
              <h2>Ordenes de trabajo</h2>
              <FaPlus/>
            </div>
            <div className='row-space-btw'>
              <div className='column'>
                <span style={{color:'grey'}}>Nº 2525</span>
                <span>Arriendo</span>
              </div>
              <div className='item-yellow'>En proceso</div>
            </div>
            <div className='row-space-btw'>
              <div className='column'>
                <span style={{color:'grey'}}>Nº 2297</span>
                <span>Arriendo</span>
              </div>
              <div className='item-red'>Pendiente</div>
            </div>
            <div className='row-space-btw'>
              <div className='column'>
                <span style={{color:'grey'}}>Nº 2297</span>
                <span>Arriendo</span>
              </div>
              <div className='item-red'>Pendiente</div>
            </div>
            {/**elemento de abajo */}
          </div>
        </PrincipalCard>

        <PrincipalCard>
          <div className='principal-container-column' style={{gap:27}}>
            <div className='row-space-btw'>
              <h2>Facturas</h2>
              <FaPlus/>
            </div>
            <span style={{color:"grey"}}>Nº FE15229</span>
            <span style={{color:"grey"}}>Nº FE15229</span>
            <span style={{color:"grey"}}>Nº FE15229</span>
            {/**elemento de abajo */}

          </div>
        </PrincipalCard>

        <PrincipalCard>
          <div className='principal-container-column ' style={{gap:27,position:"relative"}}>
            <div className='row-space-btw'>
              <h2>Notas</h2>
              <FaPlus/>
            </div>
            <span style={{color:"grey"}}>Nota</span>

            {/**elemento de abajo */}

          </div>
        </PrincipalCard>


      </div>

      <PrincipalCard>
        <div className='principal-container-column'>
          <div className='row-space-btw'>
            <h2>Cobros</h2>
            <FaPlus style={{fontSize:24}}/>
          </div>
          <Filter>
            <div className='filter-menu-item'>
              <DatePicker picker="week" />
            </div>
            <div className='filter-menu-item'>
              <DatePicker picker="year" />
            </div>
            <div className='filter-menu-item'> 
              <SelectComponent/>
            </div>
          </Filter>
          <Table
            dataSource={[
              {
                id:'#15220',
                vencimiento: '05/06/2024',
                bruto: 1000,
                monto: 1000
              },
              {
                id:'#15220',
                vencimiento: '05/06/2024',
                bruto: 1000,
                monto: 1000
              },
              {
                id:'#15220',
                vencimiento: '05/06/2024',
                bruto: 1000,
                monto: 1000
              }
            ]}
            columns={
              [
                {
                  title: 'ID',
                  dataIndex: 'id',
                  key: 'id',
                },
                {
                  title: 'Vencimiento',
                  dataIndex: 'vencimiento',
                  key: 'vencimiento',
                },
                {
                  title: 'Bruto',
                  dataIndex: 'bruto',
                  key: 'bruto',
                },
                {
                  title: 'Monto Pendiente',
                  dataIndex: 'monto',
                  key: 'monto',
                },
              ]
            }
          />
        </div>
      </PrincipalCard>
    </div>

    {
      /*
      
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 onClick={()=>{navigate('/clients/dashboard')}}>Clientes</h3>
          <h3>Información Detallada</h3>
        </div>
        <div className='row-test'>
          <SelectComponent/>
          <div>ic1</div>
          <button onClick={()=>{navigate('/clients/new')}}>AGREGAR</button>
        </div>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button onClick={()=>{setLayout(0)}}>RESUMEN</button>
          <button onClick={()=>{setLayout(1)}}>PROYECTOS</button>
          <button onClick={()=>{setLayout(2)}}>FACTURAS</button>
        </div>
        {RenderHeaderComponent()}
      </div>
      {RenderPrincipalComponent()}
      */
    }
    </>
  )
}

export default ClienteDetail