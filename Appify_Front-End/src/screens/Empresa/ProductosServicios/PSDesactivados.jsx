import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext';
import TableComponent from '../../../components/Table/TableComponent';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PSDesactivados = () => {
  
  
  const { products } = useContext(AppContext);
  const navigate = useNavigate();
  

  const columns_products_table = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Codigo',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Costo',
      dataIndex: 'costo',
      key: 'costo',
      render: (text, record) => {
        if(record.costo === null){
          return null
        }else{
          return `$${record.costo}`
        }
      },
    },
    {
      title: 'Precio Neto',
      dataIndex: 'precio',
      key: 'precio',
      render: (text, record) => `$${record.precio}`,
    },
    {
      title: 'Exension de IVA',
      dataIndex: 'exension_iva',
      key: 'exension_iva',
      render: (text, record) => {
        if(record.exencion_impuesto === false){
          return `0`
        }else if(record.exencion_impuesto === true){
          return `${record.exencion_valor}`
        }
      },
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Button type="primary" onClick={() => {navigate(`/products/${record.id}`)}}>
          Ver
        </Button>
      ),
    },
  ] 


  const dataSource = products.filter((product)=>product.activo === false)

  return (
    <>

      <TableComponent dataSource={dataSource} columns={columns_products_table}/>

    </>
  )
}

export default PSDesactivados