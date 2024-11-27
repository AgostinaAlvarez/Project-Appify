import { Button, DatePicker, Space, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import TableExample from '../../../components/Table/TableExample'
import { AppContext } from '../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../../components/Table/TableComponent';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import Filter from '../../../components/Filter/Filter';
import SelectComp from '../../../components/Select/SelectComp';
import { BsListCheck } from "react-icons/bs";
import { FaFileDownload } from 'react-icons/fa';
import { TableReusable } from '../../../components/Table/TableReusable';
import { applyFilters, handleChangeFilter } from '../../../utils/filters/filterUtils';

const OrdenesDeCompraDashboard = () => {
  const {menuOptions,setMenuOptions,columns_purchases_table,ordenesDeCompra} = useContext(AppContext);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [dateRange, setDateRange] = useState(null)
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/purchases')
    setMenuOptions(updateData)
  }, [])
  const resetFilters = () => {
    setFilterDate([]);
    setDateRange(null)
  };

  useEffect(() => {
    const filters = [
      { type: 'date', field: 'orden.fecha', value: filterDate },
    ];
    setFilteredData(applyFilters(ordenesDeCompra, filters));
  }, [filterDate, ordenesDeCompra]);
  
  useEffect(() => {
    console.log('ORDENES DE COMPRA')
    console.log(ordenesDeCompra)
  }, [])
  

  const dataSource = [
    {
      key: '1',
      id:'1-ODC',
      proveedor: '-',
      documento: '1',
      date: '03/04/2024',
      neto: '$1233',
      bruto: '$1500',

    },
    
  ]

  function newODC (){
    navigate('/purchases/new')
  }
  const getRowClickPath = (text)=>{
    return`/purchases/detail/${text.key}`;
  }


  return (
    <>
    {
      /*
      <div className='row-space-btw-test'>
        <h3>Ordenes de Compra</h3>
        <div className='row-test'>
          <button>Reporte</button>
          <button onClick={()=>{navigate('/purchases/new')}}>Agregar</button>
        </div>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      <TableComponent dataSource={dataSource} columns={columns_purchases_table}/>
      
      */
    }
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Órdenes de compra</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={newODC}/>
        </div>
      </div>

      <div className='row-space-btw'>
      <Filter  onResetFilters={resetFilters} filters={[]} onChangeFilter={handleChangeFilter} >
          <div className='filter-menu-item'>
          <Space direction='vertical' size={12}>
        <DatePicker.RangePicker
          value={dateRange} 
          onChange={(dates, dateStrings) => {
            setDateRange(dates)
            handleChangeFilter('filterDate', dateStrings, { setFilterDate })}
          }/>
      </Space>
          </div>
        </Filter>
        <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
          <FaFileDownload/>
          <span>Reporte</span>
        </Button>
      </div>

      <TableReusable
        dataSource={ //ordenesDeCompra
          filteredData
          /*
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
          */
        }
        columns={
          [
            {
              title: 'ID',
              render: (text,record) => (
                <>OC-{record.orden.id.slice(-4)}</>
              )
            },
            {
              title: 'Proveedor',
              render: (text,record) => (
                <>{record.proveedor}</>
              ),
            },
           
            {
              title: 'Documento',
              render: (text,record) =>(
                <>{record.orden.numero_documento}</>
              ),
            },
            {
              title: 'Fecha',
              render: (text,record) => (
                <>{record.orden.fecha.split("T")[0]}</>
              ),
            },
            {
              title: 'Neto',
              render: (text,record)=>(
                <>{record.orden.subtotal}</>
              ),
            },
            {
              title: 'Bruto',
              render: (text,record)=>(
                <>{record.orden.total}</>
              ),
            },
            
            
            {
              title: 'Recibido',
              dataIndex: 'recibido',
              key: 'recibido',
              render: (text, record) => (
                <>
                  <div className='row'>
                    <BsListCheck/>
                    <span>0/1</span>
                  </div>
                </>
              ),
            },
          ]
        }
        onRowClick={true}
        getRowClickPath={getRowClickPath}
      />

    </div>

    
    </>
  )
}

export default OrdenesDeCompraDashboard