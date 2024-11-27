import React, { useContext, useEffect, useState } from 'react'
import { updateSubMenuAsideOptions } from '../../../utils/helpers'
import { AppContext } from '../../../context/AppContext'
import TableroTodos from './TableroTodos'
import TableroAceptados from './TableroAceptados'
import TableroEnProceso from './TableroEnProceso'
import TableroEnRevision from './TableroEnRevision';
import SearchBtn from '../../../components/Buttons/SearchBtn'
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn'
import Filter from '../../../components/Filter/Filter'
import { Button, DatePicker, Table } from 'antd'
import SelectComp from '../../../components/Select/SelectComp'


const TableroDashboard = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const [ layout,setLayout ] = useState(0);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Operaciones','/work_orders/panel')
    setMenuOptions(updateData)
  }, [])
  function RenderPrincipalComponent () {
    switch (layout){
      case 0:
        return <TableroTodos/>
      case 1:
        return <TableroAceptados/>
      case 2:
        return <TableroEnProceso/>
      case 3:
        return <TableroEnRevision/>
    }
  }

  function newDashboard () {
    console.log('nuevo tablero')
  }

  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Tablero</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={newDashboard}/>
        </div>
      </div>
      <Filter>
        <div className='filter-menu-item'>
          <DatePicker picker="week" />
        </div>
        <div className='filter-menu-item'>
          <SelectComp
            placeholder={'Estado'}
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
            placeholder={'Mostrar'}
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
            placeholder={'Vista'}
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

      <Table
        dataSource={
          [ 
            {
              key:1,
              numero: 2297,
              proyecto:'Proyecto 1',
              miembros:'Miembro 1',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              compromiso:null,
              date:'26/03',
              estado: 'Aceptado'
            },
            {
              key:2,
              numero: 2297,
              proyecto:'Proyecto 1',
              miembros:'Miembro 1',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              compromiso:null,
              date:'26/03',
              estado: 'En proceso'
            },
            {
              key:3,
              numero: 2297,
              proyecto:'Proyecto 1',
              miembros:'Miembro 1',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              compromiso:null,
              date:'26/03',
              estado: 'Pendiente'
            }
            
          ]
        }
        columns={
          [
            {
              title: 'N°',
              dataIndex: 'numero',
              key: 'numero',
            },
            {
              title: 'Proyecto',
              dataIndex: 'proyecto',
              key: 'proyecto',
            },
            {
              title: 'Cliente',
              dataIndex: 'client',
              key: 'client',
            },
            {
              title: 'Producto/Servicio',
              dataIndex: 'product',
              key: 'product',
            },
            {
              title: 'Miembros',
              dataIndex: 'miembros',
              key: 'miembros',
            },
            {
              title: 'Fecha',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Estado',
              dataIndex: 'status',
              key: 'status',
              render: (text, record) => (
                <>
                {
                  record.estado === 'Aceptado' ? 
                  <div className='item-green'>Aceptado</div>
                  :
                  <>
                  {
                    record.estado === 'En proceso' ?
                    <div className='item-yellow'>En proceso</div>
                    :
                    <div className='item-red'>Pendiente</div>

                  }
                  </>
                }
                </>
              ),
            },
            {
              title:'',
              render: (text, record) => (
                <Button type='primary'  onClick={()=>{navigate(`/quotes/${text.key}`)}}>Ver</Button>
              ),
            }
          ]
        }
      />
    </div>
    {
      /*
      <div className='row-space-btw-test'>
        <h3>Tablero Producción</h3>
        <div className='row-test'>
          <button>Tags</button>
          <div>Icon1</div>
          <div>Icon2</div>
        </div>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>TODOS</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>ACEPTADO</button>
          <button className={layout === 2 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(2)}}>EN PROCESO</button>
          <button className={layout === 3 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(3)}}>EN REVISION</button>
        </div>
        <div>Config icon</div>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      {RenderPrincipalComponent()}
      
      */
    }
    </>
  )
}

export default TableroDashboard