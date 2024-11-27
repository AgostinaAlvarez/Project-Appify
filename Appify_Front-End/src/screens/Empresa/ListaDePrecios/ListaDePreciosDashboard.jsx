import React from 'react'
import TableExample from '../../../components/Table/TableExample'
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn'
import SearchBtn from '../../../components/Buttons/SearchBtn'
import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RiEditFill } from "react-icons/ri";
import { TableReusable } from '../../../components/Table/TableReusable'


const ListaDePreciosDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <h1>Lista de precios</h1>
        <div className='row'>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{navigate('/price_lists/new')}}/>
        </div>
      </div>
      <TableReusable
        dataSource={[]}
        columns={[
          {
            title: 'Nombre',
            dataIndex: 'usuario',
            key: 'usuario',
          },
          {
            title: 'Precio Neto',
            dataIndex: 'cargo',
            key: 'cargo',
          },
          {
            title: 'Monto Bruto',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Editar',
            render: (text, record) => (
              <>
                <RiEditFill/>
              </>
            ),
          },
          /*
          {
            title:'',
            render: (text, record) => (
              <Button type='primary'  onClick={()=>{}}>Ver</Button>
            ),
          }
          */
        ]}
        onRowClick={false} 
      />
      
    </div>
    </>
  )
}

export default ListaDePreciosDashboard