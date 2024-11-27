import React, { useContext, useEffect, useState } from 'react'
import { updateSubMenuAsideOptions } from '../../../utils/helpers'
import { AppContext } from '../../../context/AppContext'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaDownload, FaFileDownload, FaTrashAlt } from "react-icons/fa";
import ClientesActivados from './ClientesActivados';
import ClientesDesactivados from './ClientesDesactivados';
import { Button, Table } from 'antd';
import Filter from '../../../components/Filter/Filter';
import SelectComp from '../../../components/Select/SelectComp';
import { AiFillEdit } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa6';
import { FiDownload } from 'react-icons/fi';
import { GrDownload } from "react-icons/gr";
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import { TableReusable } from '../../../components/Table/TableReusable';
import SearchClient from '../../../components/Buttons/SearchClient';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import { width } from '@mui/system';
import { ReportExcel } from '../../../components/Buttons/ReportExcel';
const ClientesDashboard = () => {

  const {menuOptions,setMenuOptions,clientes} = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [ layout,setLayout ] = useState(0);
  const [ loading,setLoading ] = useState(true)
  const [ error,setError ] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClientes, setFilteredClientes] = useState(clientes);
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión',location.pathname)
    setMenuOptions(updateData)
  }, [])
  
  function RenderComponent () {
    switch (layout){
      case 0:
        return <ClientesActivados/>
      case 1:
        return <ClientesDesactivados/>
    }
  }

  function newClient () {
    navigate('/clients/new')
  }

  const getRowClickPath = (record) => {
    return `/clients/detail/${record.cliente.id}`;
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    if (term === '') {
      setFilteredClientes(clientes);
    } else {
      const filtered = clientes.filter((cliente) =>
        cliente.cliente.razon_social.toLowerCase().includes(term)
      );
      setFilteredClientes(filtered);
    }
  };
  const columnsExcel = [
    {
      header:'Razón Social/Nombre',
      key:'razon_social',
      width:20,
    },
    {
      header:'Rut',
      key:'rut',
      width:20,
    },
    {
      header:'Contacto',
      key:'nombre',
      width:40,
    },
    {
      header:'Teléfono',
      key:'telefono',
      width:20,
    },
    {
      header:'Crédito',
      key:'credito',
      width:20,
      style:{numFmt:'"$"#,##0.00;[Red]\-"$"#,##0.00'},
    },
  ]

  const objetoCliente = (clientes) =>{
    return clientes.map(item => {
      const cliente = item.cliente;
      const contacto = item.contactos.find(c => c.nombre && c.telefono) || { nombre: '', telefono: '' }; 
      return {
        razon_social: cliente.razon_social,
        rut:cliente.rut,
        nombre: contacto.nombre,
        telefono:contacto.telefono,
        credito:cliente.linea_de_credito ? cliente.linea_de_credito : 0,
      }
    })
  }

  const transformedData = objetoCliente(clientes);

  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Clientes</h1>
        <div className='row'>
          <AddMoreBtn label={'Agregar'} HanldeClick={newClient}/>
        </div>
      </div>
      <div className='row-space-btw'>
        <SearchClient onSearch={handleSearch}/>
        <div className='row'>
          <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
            <GrDownload/>
            <span>Importar</span>
          </Button>
          <ReportExcel data={transformedData} fileName={"reporte_clientes"} columns={columnsExcel}/>
        </div>
      </div>
      <TableReusable
        columns={[
          {
            title: 'Razón social / Nombre',
            dataIndex: 'razon_social',
            key: 'razon_social',
            render: (text,record) => (
              <>{record.cliente.razon_social}</>
            )
          },
          {
            title: 'Rut',
            dataIndex: 'rut',
            key: 'rut',
            render: (text,record) => (
              <>{record.cliente.rut}</>
            )
          },
          {
            title: 'Contacto',
            dataIndex: 'contacto',
            key: 'contacto',
            render: (text,record) => (
              <>{record.contactos.length == 0 ? '-' : record.contactos[0].nombre}</>
            )
          },
          {
            title: 'Teléfono',
            dataIndex: 'telefono',
            key: 'telefono',
            render: (text,record) => (
              <>{record.contactos.length == 0 ? '-' : record.contactos[0].telefono}</>
            )
          },
          {
            title: 'Crédito',
            dataIndex: 'linea_de_credito',
            key: 'linea_de_credito',
            render: (text,record) => (
              <>${record.cliente.linea_de_credito ? record.cliente.linea_de_credito : '0' }</>
            )
          },
          
        ]}
        dataSource={filteredClientes}
        onRowClick={true} 
        getRowClickPath={getRowClickPath} 
      />
    </div>
    </>
  )
}

export default ClientesDashboard