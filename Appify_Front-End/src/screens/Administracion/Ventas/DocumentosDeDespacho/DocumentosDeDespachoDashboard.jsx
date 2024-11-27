import { Button, DatePicker, Space, Table } from 'antd'
import React, { useContext, useEffect } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import { AppContext } from '../../../../context/AppContext'
import TableComponent from '../../../../components/Table/TableComponent'
import { updateDispachDash } from '../../../../utils/helpers'
import SearchBtn from '../../../../components/Buttons/SearchBtn'
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn'
import Filter from '../../../../components/Filter/Filter'
import { FaFileDownload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { TableReusable } from '../../../../components/Table/TableReusable'
const DocumentosDeDespachoDashboard = () => {
  const { column_shipping_invoices_table,setMenuOptions } = useContext(AppContext);
  const navigate = useNavigate();
  const dataSource = [
    {
      key: '1',
      id:'N1',
      date: '10/04/2024',
      ot: 'N2331',
      cliente :'Pepito Juan',
      total_real : '$13221',
      total_orden: '$10200',
      unidades: 4,
      anular: ''
    }
  ]

  useEffect(() => {
    const updateData = updateDispachDash()
    setMenuOptions(updateData)
  }, [])
  

  function newDispachDocument (){
    navigate('/dispach_documents/new')
  }

  return (
    <>
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <h1>Documentos de despacho</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={newDispachDocument}/>
        </div>
      </div>

      <div className='row-space-btw'>
        <Filter>
          <div className='filter-menu-item'>
            <DatePicker picker='week'/>
          </div>
        </Filter>
        <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
          <FaFileDownload/>
          <span>Reporte</span>
        </Button>
      </div>


      <TableReusable
        dataSource={
          [ 
            {
              key:1,
              id: 2297,
              cliente: 'Cliente 1',
              date:'26/03',
              documento: 'N° doc',
              neto: 233,
              bruto: 200,
            },
            {
              key:2,
              id: 2297,
              cliente: 'Cliente 1',
              date:'26/03',
              documento: 'N° doc',
              neto: 233,
              bruto: 200,
            },
            {
              key:3,
              id: 2297,
              cliente: 'Cliente 1',
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
              title: 'Fecha',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Orden de trabajo',
              dataIndex: 'documento',
              key: 'documento',
            },
            {
              title: 'Cliente',
              dataIndex: 'cliente',
              key: 'cliente',
            },
            
            
            {
              title: 'Total real',
              dataIndex: 'neto',
              key: 'neto',
            },
            {
              title: 'Total orden',
              dataIndex: 'bruto',
              key: 'bruto',
            },
            
            // {
            //   title:'',
            //   render: (text, record) => (
            //     <Button type='primary'  onClick={()=>{}}>Ver</Button>
            //   ),
            // }
          ]
        }
        onRowClick={false}
      />


    </div>
    {
      /*
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      <div>Documentos de despacho</div>
      <TableComponent dataSource={dataSource} columns={column_shipping_invoices_table}/>
      
      */
    }

    </>
  )
}

export default DocumentosDeDespachoDashboard