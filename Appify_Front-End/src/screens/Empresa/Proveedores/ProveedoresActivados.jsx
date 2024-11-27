import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../../components/Table/TableComponent';
import { AppContext } from '../../../context/AppContext';
import { Button } from 'antd';

const ProveedoresActivados = () => {
  const {proveedores} = useContext(AppContext);
  const navigate = useNavigate();


  const columns_products_table = [
    {
      title: 'Razon social o nombre',
      dataIndex: 'razon_social',
      key: 'razon_social',
    },
    {
      title: 'Rut',
      dataIndex: 'rut',
      key: 'rut',
    },
    {
      title: 'Contacto',
      dataIndex: 'contacto',
      key: 'contacto',
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'telefono',
    },
    
    {
      title: 'Cuenta contable',
      dataIndex: 'cuenta_contable',
      key: 'cuenta_contable',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Button type="primary" onClick={() => {navigate(`/providers/${record.id}`)}}>
          Ver
        </Button>
      ),
    },
  ] 

  const dataSource = proveedores.filter((proveedor)=>proveedor.activo === true)

  return (
    <>
      <TableComponent dataSource={dataSource} columns={columns_products_table}/>        
    </>
  )
}

export default ProveedoresActivados