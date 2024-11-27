import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateSubMenuAsideOptions } from '../../../utils/helpers'
import { Button, DatePicker, Space, Table } from 'antd'
import { AppContext } from '../../../context/AppContext'
import { FaDownload } from "react-icons/fa";
import OrdenesDeTrabajoTodas from './OrdenesDeTrabajoTodas'
import OrdenesDeTrabajoPendientes from './OrdenesDeTrabajoPendientes'
import OrdenesDeTrabajoEnProceso from './OrdenesDeTrabajoEnProceso'
import OrdenesDeTrabajoFinalizadas from './OrdenesDeTrabajoFinalizadas'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn'
import SearchBtn from '../../../components/Buttons/SearchBtn'
import Filter from '../../../components/Filter/Filter'
import SelectComp from '../../../components/Select/SelectComp'
import { TableReusable } from '../../../components/Table/TableReusable'
import { applyFilters, handleChangeFilter } from '../../../utils/filters/filterUtils'
const OrdenesDeTrabajoDashboard = () => {
  const {menuOptions,setMenuOptions,ordenesDeTrabajo} = useContext(AppContext);
  const [ layout,setLayout ] = useState(0);
  const navigate = useNavigate();
  const [filteredData, setFilteredData]= useState([]);
  const [filterDate, setFilterDate]=useState([]);
  const [filterStatus,setFilterStatus]=useState('');
  const initialStatusPlaceholder = 'Selecciona estado';
  const [statusPlaceholder, setStatusPlaceholder] = useState(initialStatusPlaceholder);
  const [dateRange, setDateRange] = useState(null);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/work_orders')
    setMenuOptions(updateData)

  }, [])
  console.log('Datos de ordenes' ,ordenesDeTrabajo)

  useEffect(() => {
    console.log('ordenes de trabajo')
    console.log(ordenesDeTrabajo)
  }, [])
  

  function newOT (){
    navigate('/work_orders/new')
  }


  function renderProducts (productsArray) {
    let char_product = '';
    productsArray.forEach(element => {
      char_product += `${element.nombre} , `
    });
    char_product = char_product.slice(0, -2)
    return char_product
    
  }
  useEffect(()=>{
    const filters = [
      {type:'date',field:'fechaOrden',value:filterDate},
      {type:'select', field:'estado', value: filterStatus}
    ]
    setFilteredData(applyFilters(ordenesDeTrabajo,filters))
  },[filterDate,filterStatus,ordenesDeTrabajo])
  const resetFilters = () =>{
    setFilterDate([])
    setFilterStatus('')
    setDateRange(null)
    setStatusPlaceholder(initialStatusPlaceholder);
    
  }
  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Órdenes de trabajo</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={newOT}/>
        </div>
      </div>
      <Filter onResetFilters={resetFilters} filters={[]} onChangeFilter={handleChangeFilter}>
        <div className='filter-menu-item'>
        <Space direction='vertical' size={12}>
        <DatePicker.RangePicker
         value={dateRange} 
         onChange={(dates, dateStrings) => {
          setDateRange(dates); 
          handleChangeFilter('filterDate', dateStrings, { setFilterDate, setFilterStatus });
        }}
        />
      </Space>
        </div>
        <div className='filter-menu-item'>
          <SelectComp
            placeholder={statusPlaceholder}
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
            HandleChange={(value)=>{
              handleChangeFilter('filterStatus', value, {setFilterDate, setFilterStatus})
            }}
          value={filterStatus || initialStatusPlaceholder}

          />
        </div>
      </Filter>
      <TableReusable
      dataSource={filteredData}
      columns={
        [
          {
            title: 'N°',
            dataIndex: 'numero',
            key: 'numero',
          },
          {
            title: 'Cod',
            render: (text,record) => (
              <>OT-{record.orden.slice(-4)}</>
            ),
          },
          {
            title: 'Cliente',
            dataIndex: 'cliente',
            key: 'cliente',
          },
          {
            title: 'Producto/Servicio',
            dataIndex: 'product',
            key: 'product',
            render : (text,record) => (
              <>{renderProducts(record.productos_servicios.productos)}</>
            )
          },
          {
            title: 'Vendedor',
            dataIndex: 'vendedor',
            key: 'vendedor',
          },
          {
            title: 'Compromiso',
            dataIndex: 'compromiso',
            render : (text,record) => (
              <>-</>
            )
          },
          {
            title: 'Fecha',
            dataIndex: 'fechaOrden',
            key: 'fechaOrden',
            render : (text,record) => (
              <>{text.split("T")[0]}</>
            )
          },
          {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
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
        ]
      }
      onRowClick={false}
      />
      
    </div>
    
    </>
  )
}

export default OrdenesDeTrabajoDashboard