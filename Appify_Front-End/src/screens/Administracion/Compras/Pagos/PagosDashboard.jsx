import React, { useContext, useEffect } from 'react'
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn'
import SearchBtn from '../../../../components/Buttons/SearchBtn'
import Filter from '../../../../components/Filter/Filter'
import SelectComp from '../../../../components/Select/SelectComp'
import { Button, DatePicker, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../../context/AppContext'
import { updatePagosDash } from '../../../../utils/helpers'

const PagosDashboard = () => {
  //const navigate = useNavigate()
  const { setMenuOptions } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    const updateData = updatePagosDash()
    setMenuOptions(updateData)
  }, [])
  
  function newPay (){
    navigate('/payment/new')
  }
  return (
    <>
     <div className="principal-container-column">
        <div className='row-space-btw'>
          <h1>Pagos</h1>
          <div className='row'>
            <SearchBtn/>
            <AddMoreBtn label={'Agregar'} HanldeClick={newPay}/>
          </div>
        </div>
        <Filter>
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Por aprobar'}
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
              placeholder={'Pendiente'}
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
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Vendedor'}
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
                  <Button type='primary'  onClick={()=>{navigate(`/`)}}>Ver</Button>
                ),
              }
            ]
          }
        />
     </div>
    </>
  )
}

export default PagosDashboard