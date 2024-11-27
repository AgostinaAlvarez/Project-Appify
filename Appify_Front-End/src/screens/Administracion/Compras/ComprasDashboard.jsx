import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import { AppContext } from '../../../context/AppContext';
import ComprasSection from './ComprasSection/ComprasSection';
import DTEPendientes from './DTEPendientes/DTEPendientes';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import Filter from '../../../components/Filter/Filter';
import { Button, DatePicker, Table } from 'antd';
import { GrDownload } from 'react-icons/gr';
import { FaFileDownload } from 'react-icons/fa';
import SelectComp from '../../../components/Select/SelectComp';


const ComprasHeaderComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='row-test'>
        <div>Ic 1</div>
        <button>REPORTE</button>
        <button onClick={()=>{navigate('/service_invoices/new')}}>AGREGAR</button>
      </div>
    </>
  )
}

const DTEPendientesHeader = () =>{
  return (
    <>
      <div className='row-test'>
        <div>Aceptar automaticamente</div>
        <button>INGRESO MASIVO</button>
      </div>
    </>
  )
}


const ComprasDashboard = () => {
  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    //seteo el path name
    set_path_name(location.pathname)
  }, [location]);



  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/service_invoices')
    setMenuOptions(updateData)
  }, [])
  

  function renderHeaderComponent () {
    switch (path_name) {
      case '/service_invoices':
        return <ComprasHeaderComponent/>
      case '/purchase_invoice_pendings':
        return <DTEPendientesHeader/>
    }
  }


  function RenderPrincipalComponent () {
    switch (path_name) {
      case '/service_invoices':
        return <ComprasSection/>
      case '/purchase_invoice_pendings':
        return <DTEPendientes/>
    }
  }

  return (
    <>
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <h1>Compras</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{navigate('/service_invoices/new')}}/>
        </div>
      </div>
      
      <div className='row-space-btw'>
        <Filter>
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Pendientes'}
              options={[
                {
                  value: 'Aprobado',
                  label: 'Aprobado',
                },
                {
                  value: 'Pendiente',
                  label: 'Pendiente',
                },
                {
                  value: 'En proceso',
                  label: 'En proceso',
                },
              ]}
            />
          </div>
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Tipo'}
              options={[
                {
                  value: 'Aprobado',
                  label: 'Aprobado',
                },
                {
                  value: 'Pendiente',
                  label: 'Pendiente',
                },
                {
                  value: 'En proceso',
                  label: 'En proceso',
                },
              ]}
            />
          </div>
          <div className='filter-menu-item'>
            <DatePicker picker='week'/>
          </div>
        </Filter>
        <div className='row'>
          <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
            <GrDownload/>
            <span>Importar</span>
          </Button>
          <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
            <FaFileDownload/>
            <span>Descargar</span>
          </Button>
        </div>
      </div>
      
      <Table
          dataSource={
            [ 
              {
                key:1,
                id: 2297,
                proveedor: 'Comercializadora',
                numero: '24388',
                fecha1:'26/03',
                neto: 1500,
                bruto: 1500,
                fecha2:'26/03',
              },
              {
                key:2,
                id: 2297,
                proveedor: 'Comercializadora',
                numero: '24388',
                fecha1:'26/03',
                neto: 1500,
                bruto: 1500,
                fecha2:'26/03',
              },
              {
                key:3,
                id: 2297,
                proveedor: 'Comercializadora',
                numero: '24388',
                fecha1:'26/03',
                neto: 1500,
                bruto: 1500,
                fecha2:'26/03',
              }
            ]
          }
          columns={
            [
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Proveedor',
                dataIndex: 'proveedor',
                key: 'proveedor',
              },
              {
                title: 'N° documento',
                dataIndex: 'numero',
                key: 'numero',
              },
              {
                title: 'Fecha',
                dataIndex: 'fecha1',
                key: 'fecha',
              },
              {
                title: 'Neto',
                dataIndex: 'neto',
                key: 'neto',
              },
              {
                title: 'Bruto',
                dataIndex: 'bruto',
                key: 'bruto',
              },
              {
                title: 'Fecha',
                dataIndex: 'fecha2',
                key: 'fecha2',
              },
              
              {
                title:'',
                render: (text, record) => (
                  <Button type='primary'  onClick={()=>{console.log('agregar')}}>Ver</Button>
                ),
              }
            ]
          }
        />

        <div className='container-item-flex-end'>
          <div style={{minWidth:300,padding:30,borderRadius:20,backgroundColor:"white"}} className='column'>
            <h2>TOTAL</h2>
            <div className='row'>
              <span>Neto: </span>
              <span>$</span>
            </div>
            <div className='row'>
              <span>Bruto: </span>
              <span>$</span>
            </div>
          </div>
        </div>


    </div>
    {
      /*
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 className={ path_name === '/service_invoices' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{navigation('/service_invoices')}}>Compras</h3>
          <h3 className={path_name === '/purchase_invoice_pendings' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{navigation('/purchase_invoice_pendings')}}>DTE Pendientes</h3>
        </div>
        {renderHeaderComponent()}
      </div>
      {RenderPrincipalComponent()}
      
      */
    }
    </>
  )
}

export default ComprasDashboard