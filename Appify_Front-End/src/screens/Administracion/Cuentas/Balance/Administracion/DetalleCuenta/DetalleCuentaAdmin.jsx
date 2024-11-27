import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import PrincipalCard from '../../../../../../components/Card/PrincipalCard'
import AddMoreBtn from '../../../../../../components/Buttons/AddMoreBtn'
import Filter from '../../../../../../components/Filter/Filter'
import { DatePicker, Table } from 'antd'
import { AiFillEdit } from 'react-icons/ai'

const DetalleCuentaAdmin = () => {
  const navigate = useNavigate()

  function AddTransacion () {
    navigate('/transaction/new')
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/admin_acount')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a administrar cuentas</span>
      </div>
      <h1>Nombre cuenta</h1>
      <div className='principal-container-column'>
        <PrincipalCard>
          <div className='principal-grid grid-2-columns'>
            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>Activo fijo</span>
              <span>Tipo de cuenta</span>
            </div>
            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>Automático</span>
              <span>Docuemntos permitidos</span>
            </div>
          </div>
        </PrincipalCard>

        <div className='row-space-btw'>
          <h2>Transacciones</h2>
          <AddMoreBtn label={'Agregar'} HanldeClick={AddTransacion}/>
        </div>


        <Filter>
          <div className='filter-menu-item'>
            <DatePicker picker='week'/>
          </div>
        </Filter>

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
                    title: 'Fecha',
                    dataIndex: 'date',
                    key: 'date',
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
                    title:'',
                    render: (text, record) => (
                      <AiFillEdit onClick={()=>{navigate('/transaction/edit/3')}} style={{cursor:"pointer"}}/>
                    ),
                  }
                ]
              }
            />

        
      </div>


    </>
  )
}

export default DetalleCuentaAdmin