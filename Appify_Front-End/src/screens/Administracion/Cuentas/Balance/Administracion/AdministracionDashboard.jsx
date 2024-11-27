import React, { useContext, useState } from 'react'
import AddMoreBtn from '../../../../../components/Buttons/AddMoreBtn'
import Filter from '../../../../../components/Filter/Filter'
import SelectComp from '../../../../../components/Select/SelectComp'
import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import SearchBtn from '../../../../../components/Buttons/SearchBtn'
import { AppContext } from '../../../../../context/AppContext'
import NuevaCategoriaCtas from './CategoriaCtas/NuevaCategoriaCtas'
import NuevoTipoDcto from './Documentos/NuevoTipoDcto'
import NuevoBco from './Bancos/NuevoBco'
import EditarCategoriaCtas from './CategoriaCtas/EditarCategoriaCtas'
import EditarBco from './Bancos/EditarBco'
import EditarTipoDcto from './Documentos/EditarTipoDcto'



const Cuentas = () =>{
  const navigate = useNavigate()
  return (
    <>
      <Filter>
        <div className='filter-menu-item'>
          <SelectComp
            placeholder={'Periodo'}
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
      </Filter>
      <div style={{width:"85%",margin:"0 auto"}}>
        <Table
          dataSource={
            [ 
              {
                key:1,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:2,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:3,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
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
                title: 'Documento',
                dataIndex: 'documento',
                key: 'documento',
              },
              
              
              {
                title:'',
                render: (text, record) => (
                  <Button type='primary'  onClick={()=>{navigate(`/acount/3`)}}>Ver</Button>
                ),
              }
            ]
          }
        />
      </div>
    </>
  )
}

const Categorias = () =>{
  const { setModal,setModalContent } = useContext(AppContext)

  return(
    <>
      <div style={{width:"85%",margin:"0 auto"}}>
        <Table
          dataSource={
            [ 
              {
                key:1,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:2,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:3,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
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
                title: 'Documento',
                dataIndex: 'documento',
                key: 'documento',
              },
              {
                title:'',
                render: (text, record) => (
                  <div style={{display:"flex",gap:10}}>
                    <Button type='primary'  onClick={()=>{console.log('nose')}}>Ver</Button>
                    <Button type='primary' onClick={()=>{
                      setModal(true)
                      setModalContent(<EditarCategoriaCtas/>)
                    }}>Editar</Button>
                  </div>
                ),
              }
            ]
          }
        />
      </div>
    </>
  )
}

const Documentos = () =>{
  const { setModal,setModalContent } = useContext(AppContext)
  return(
    <>
      <div style={{width:"85%",margin:"0 auto"}}>
        <Table
          dataSource={
            [ 
              {
                key:1,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:2,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:3,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
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
                title: 'Documento',
                dataIndex: 'documento',
                key: 'documento',
              },
              
              
              {
                title:'',
                render: (text, record) => (
                  <div style={{display:"flex",gap:10}}>
                    <Button type='primary'  onClick={()=>{console.log('nose')}}>Ver</Button>
                    <Button type='primary' onClick={()=>{
                      setModal(true)
                      setModalContent(<EditarTipoDcto/>)
                    }}>Editar</Button>
                  </div>
                ),
              }
            ]
          }
        />
      </div>
    </>
  )
}

const Bancos = () =>{
  const navigate = useNavigate()
  const { setModal,setModalContent } = useContext(AppContext)
  return(
    <>
      <div style={{width:"85%",margin:"0 auto"}}>
        <Table
          dataSource={
            [ 
              {
                key:1,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:2,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:3,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
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
                title: 'Documento',
                dataIndex: 'documento',
                key: 'documento',
              },
              
              
              {
                title:'',
                render: (text, record) => (
                  <div style={{display:"flex",gap:10}}>
                    <Button type='primary'  onClick={()=>{console.log('nose')}}>Ver</Button>
                    <Button type='primary' onClick={()=>{
                      setModal(true)
                      setModalContent(<EditarBco/>)
                    }}>Editar</Button>
                  </div>
                ),
              }
            ]
          }
        />
      </div>
    </>
  )
}
const Condiciones = () =>{
  const navigate = useNavigate()
  return(
    <>
      <div style={{width:"85%",margin:"0 auto"}}>
        <Table
          dataSource={
            [ 
              {
                key:1,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:2,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
              {
                key:3,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
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
                title: 'Documento',
                dataIndex: 'documento',
                key: 'documento',
              },
              
              
              {
                title:'',
                render: (text, record) => (
                  <div style={{display:"flex",gap:10}}>
                    <Button type='primary'  onClick={()=>{console.log('nose')}}>Ver</Button>
                    <Button type='primary' onClick={()=>{
                      navigate('/payment_condition/edit')
                    }}>Editar</Button>
                  </div>
                ),
              }
            ]
          }
        />
      </div>
    </>
  )
}


const AdministracionDashboard = () => {
  const [ layout,setLayout ] = useState(0);
  const { setModal,setModalContent } = useContext(AppContext)
  const navigate = useNavigate()
  //const {modalContent,setModal} = useContext(AppContext)
  //const [ modal,setModal ] = useState(false);

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <Cuentas/>
      case 1:
        return <Categorias/>
      case 2:
        return <Documentos/>
      case 3:
        return <Bancos/>
      case 4:
        return <Condiciones/>
    }
  }

  function RenderHeaderFunctions () {
    switch (layout) {
      case 0:
        return <> 
          <AddMoreBtn label={'Agregar'} 
          HanldeClick={()=>{navigate('/admin_acount/new')}}/>
        </>
      case 1:
        return <> 
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{
            console.log('Agregar nueva categoria de cuenta')
            setModal(true)
            setModalContent(<NuevaCategoriaCtas/>)  
          }}/> 
        </>
      case 2:
        return <> 
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{
            console.log('Nuevo tipo de documento')
            setModal(true)  
            setModalContent(<NuevoTipoDcto/>)  
          }}/> 
        </>
      case 3:
        return <> 
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{
            console.log('Nuevo banco')
            setModal(true) 
            setModalContent(<NuevoBco/>)   
          }}/> 
        </>
      case 4:
        return <> 
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{
            console.log('Nueva condicion de pago')
            navigate('/payment_condition/new')
            
          }}/> 
        </>
    
    }
  }


  function RenderModalComponent () {
    switch (layout) {
      case 0:
        return <>Nueva cuenta </>
      case 1:
        return <NuevaCategoriaCtas/>
      case 2:
        return <NuevoTipoDcto/>
      case 3:
        return <NuevoBco/>
      case 4:
        return <>Nueva condicion de pago</>
    }
  }

  return (
    <>
      <div className='principal-container-column'>
        <div className='row-space-btw'>
          <h1>Administración cuentas</h1>
          <div className='row'>
            {RenderHeaderFunctions()}
          </div>
        </div>

        <div className='row-space-btw proyectos-detail-header'>
          <div onClick={()=>{setLayout(0)}} className={layout === 0 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
            <span>Cuentas</span>
          </div>
          <div onClick={()=>{setLayout(1)}} className={layout === 1 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
            <span>Categoría de cuentas</span>
          </div>
          <div onClick={()=>{setLayout(2)}} className={layout === 2 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
            <span>Tipos de documentos</span>
          </div>
          <div onClick={()=>{setLayout(3)}} className={layout === 3 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
            <span>Bancos</span>
          </div>
          <div onClick={()=>{setLayout(4)}} className={layout === 4 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
            <span>Condiciones de pago</span>
          </div>
        </div>
        {
          RenderPrincipalComponent()
        }
      </div>
      {
        /*
        modal === true ?
        <div className='modal-overlay'>
          <div className='modal'>
            <button style={{position:"absolute",right:0,top:0}} onClick={()=>{setModal(false)}}>x</button>
            {RenderModalComponent()}
          </div>
        </div>
        :
        <></>
        */
      }
    </>
  )
}

export default AdministracionDashboard