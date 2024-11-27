import React, { useState } from 'react'
import BalanceComponent from './BalanceComponent/BalanceComponent';
import BalanceClasificado from './BalanceClasificado/BalanceClasificado';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import Filter from '../../../../components/Filter/Filter';
import { Button, DatePicker, Table } from 'antd';
import SelectComp from '../../../../components/Select/SelectComp';
import { FaFileDownload } from 'react-icons/fa';

const BalanceDashboard = () => {
  
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout){
      case 0:
        return <BalanceComponent/>
      case 1:
        return <BalanceClasificado/>
    }
  }

  return (
    <>
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <h1>Balance</h1>
        <div className='row'>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{console.log('navegar')}}/>
        </div>
      </div>

      <div className='row-space-btw'>
        <Filter>
          <div className='filter-menu-item'>
            <DatePicker picker='week'/>
          </div>
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
        </Filter>
        <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
          <FaFileDownload/>
        </Button>
      </div>

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
    {
      /*
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>BALANCE</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>BALANCE CASIFICADO</button>
        </div>
        <div className='row-test'>
          <div>Ic1</div>
          <div>Ic2</div>
        </div>
      </div>
      {RenderPrincipalComponent()}
      */
    }
    
    </>
  )
}

export default BalanceDashboard