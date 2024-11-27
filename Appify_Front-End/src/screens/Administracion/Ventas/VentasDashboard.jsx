import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FaDownload, FaFileDownload } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import DocumentosDeVentaDashboard from './DocumentosDeVenta/DocumentosDeVentaDashboard';
import DocumentosDeDespachoDashboard from './DocumentosDeDespacho/DocumentosDeDespachoDashboard';
import { AppContext } from '../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import { Button, ConfigProvider, Table } from 'antd';
import { IoFolder } from 'react-icons/io5';
import Filter from '../../../components/Filter/Filter';
import SelectComp from '../../../components/Select/SelectComp';
import PrincipalCard from '../../../components/Card/PrincipalCard';
import { TableReusable } from '../../../components/Table/TableReusable';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import {  vendedoresRestructured } from '../../../utils/controllers/controllers';
import { render } from 'react-dom';

const { RangePicker } = DatePicker;

const DocumentosDeVentaHeader = () =>{
  const navigate = useNavigate()
  return (
    <>
      <div className='row-test'>
        <MdOutlineUploadFile/>
        <div style={{display:"flex",alignItems:"center",border:"1px solid black",boxSizing:"border-box",padding:"5px",gap:10}}>
          <FaDownload/>
          <span>REPORTE</span>
        </div>
        <button onClick={()=>{navigate('/sale_invoices/new')}}>Agregar</button>
      </div>
    </>
  )
} 

const DocumentosDeDespachoHeader = () =>{
  const navigate = useNavigate()
  return (
    <>
      <div className='row-test'>
        <MdOutlineUploadFile/>
        <button onClick={()=>{navigate('/shipping_invoices/new')}}>Agregar</button>
      </div>
    </>
  )
}

const VentasDashboard = () => {
  const {menuOptions,setMenuOptions,ventas,subusuarios} = useContext(AppContext);
  const navigate = useNavigate()
  const location = useLocation();
  const [ path_name,set_path_name ] = useState('');
  const [docEmitidios,setDocEmitidos]=useState(true);
  const [docPendientes, setDocPendientes]=useState(false);
    const[docRecurrentes, setDocRecurrentes] =useState(false);
    const handleTypeDoc = (value) => {
      switch (value) {
        case 1:
          setDocEmitidos(true);
          setDocPendientes(false);
          setDocRecurrentes(false);
          break;
        case 2:
          setDocEmitidos(false);
          setDocPendientes(true);
          setDocRecurrentes(false);
          break;
        case 3:
          setDocEmitidos(false);
          setDocPendientes(false);
          setDocRecurrentes(true);
          break;
        default:
          break;
      }
    };
  useEffect(() => {
    set_path_name(location.pathname)
  }, [location]);

  const navigation = useNavigate()

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/sale_invoices')
    setMenuOptions(updateData)
  }, [])
  



  function renderHeaderComponent (){
    switch (path_name) {
      case '/sale_invoices':
        return <DocumentosDeVentaHeader/>
      case '/shipping_invoices':
        return <DocumentosDeDespachoHeader/>
    }
  }

  function renderPrincipalComponent (){
    switch (path_name) {
      case '/sale_invoices':
        return <DocumentosDeVentaDashboard/>
      case '/shipping_invoices':
        return <DocumentosDeDespachoDashboard/>
    }
  }

  function newDDV () {
    navigate('/sale_invoices/new')
  }

  

  useEffect(() => {
    console.log('VENTAS')
    console.log(ventas)
  }, [])
  
  
  const [ renderedData,setRenderedData ] = useState(ventas.factura_venta)
  const [ selectedStatus,setSelectedStatus ] = useState(1)
  const [ selectedType,setSelectedType ] = useState(1)
  const [ dateRange,setDateRange ] = useState(null)
  const [ selectedVendedor,setSelectedVendedor ] = useState(null)


  // function filterByType (value){
  //   //function para filtrar por tipo 
  //   switch (value) {
  //     case 1:
  //       if(selectedVendedor){
  //         if(dateRange){
  //           //es con vendedor y con rango de fechas
  //         }else{
  //           //es con vendedor pero sin rango de fehcas
  //         }
  //       }else{

  //       }
  //       return
  //     case 2:

  //       return
  //   }
    
  // }

  // function filterByDateRange () {

  // }

  // function filterBySubUser () {

  // }

  function deleteFilters () {
    setRenderedData(ventas.factura_venta)
    setDocEmitidos(true)
    setSelectedStatus(1)
    setDocPendientes(false)
    setDocRecurrentes(false)
    setSelectedType(1)
    setDateRange(null)
    setSelectedVendedor(null)
  }
 console.log(renderedData)

  return (
    <>
      <div className='principal-container-column'>

        <div className='row-space-btw'>
          <h1>Ventas</h1>
          <div className='row'>
            <SearchBtn/>
            {/**Nuevo componente */}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `#00B69B`,
                    colorPrimaryHover: `#00B69B`,
                    colorPrimaryActive: `#00B69B`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button onClick={()=>{setStep(value)}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
                <IoFolder style={{color:"#fffff"}}/>
                <span>Gestionar documentos</span>
              </Button>
            </ConfigProvider>
            {/*-------------------*/}
            <AddMoreBtn label={'Agregar'} HanldeClick={newDDV}/>
          </div>
        </div>
        {/* Documentos emitidos por defecto  */}
          <>
            <div className='row-space-btw'>
          <Filter onResetFilters={deleteFilters}  >
            {docEmitidios &&(
              <>
                <div className='filter-menu-item'>
                  <SelectComp
                    value={selectedStatus}
                    placeholder={'Emitido'}
                    HandleChange={(value, record) => {
                      setSelectedStatus(value);
                      handleTypeDoc(value); 
                    }}  
                    options={[
                      {
                        label: 'Emitidas',
                        value: 1,
                      },
                      {
                        label: 'Pendientes',
                        value: 2,
                      },
                      {
                        label: 'Recurrentes',
                        value: 3,
                      },
                    ]}
                    />
                </div>
                <div className='filter-menu-item'>
                  <SelectComp
                    placeholder={'Tipo'}
                    value={selectedType}
                    options={[
                      {
                        label: 'Facturas de venta',
                        value: 1,
                      },
                      {
                        label: 'Facturas de venta excenta',
                        value: 2,
                      },
                      {
                        label: 'Notas de credito',
                        value: 3,
                      },
                      {
                        label: 'Notas de debito',
                        value: 4,
                      },
                    ]}
                    HandleChange={(value,record)=>{
                      setSelectedType(value)
                      switch (value) {
                        case 1:
                          return setRenderedData(ventas.factura_venta)
                        case 2:
                          return setRenderedData(ventas.factura_venta_excenta)
                        case 3:
                          const notasCredito = ventas.notas.filter((item)=>item.tipo_credito === 1)
                          return setRenderedData(notasCredito)
                        case 4:
                          const notasDebito = ventas.notas.filter((item)=>item.tipo_debito === 1)
                          return setRenderedData(notasDebito)
                      }
                    }}
                  />
                </div>
                <div className='filter-menu-item'>
                  <DatePicker.RangePicker
                    value={dateRange} 
                    onChange={(values)=>{ 
                      setDateRange(values)
                      //console.log(moment(values[1]).format('YYYY-MM-DD'))
                      //console.log(date[0].$D)
                      /*
                      console.log(values)
                      if(values){
                        console.log('hay que filtrar cosas')
                      }else{
                        console.log('hay que eliminar los filtros')
                      }
                      */
                    }}
                  />
                </div>
                <div className='filter-menu-item'>
                  <SelectComp
                    placeholder={'Seleccionar vendedor'}
                    value={selectedVendedor ? selectedVendedor.value : null}
                    HandleChange={(value,record)=>{setSelectedVendedor(record)}}
                    options={vendedoresRestructured(subusuarios)}
                  />
                </div>
              </>
            )}
           {docPendientes&&(
            <>
              <div className='filter-menu-item'>
                  <SelectComp
                    value={selectedStatus}
                    placeholder={'Pendientes'}
                    HandleChange={(value, record) => {
                      setSelectedStatus(value);
                      handleTypeDoc(value); 
                    }}  
                    options={[
                      {
                        label: 'Emitidas',
                        value: 1,
                      },
                      {
                        label: 'Pendientes',
                        value: 2,
                      },
                      {
                        label: 'Recurrentes',
                        value: 3,
                      },
                    ]}
                    />
                </div>
             <div className='filter-menu-item'>
                <Space direction='vertical' size={12}>
                  <DatePicker.RangePicker/>
                </Space>
              </div>
              <div className='filter-menu-item'>
                <SelectComp
                  placeholder={'Estado'}
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
            </>
           )}
           {docRecurrentes&&(
            <>
               <div className='filter-menu-item'>
                  <SelectComp
                    value={selectedStatus}
                    placeholder={'Recurrentes'}
                    HandleChange={(value, record) => {
                      setSelectedStatus(value);
                      handleTypeDoc(value); 
                    }}  
                    options={[
                      {
                        label: 'Emitidas',
                        value: 1,
                      },
                      {
                        label: 'Pendientes',
                        value: 2,
                      },
                      {
                        label: 'Recurrentes',
                        value: 3,
                      },
                    ]}
                    />
                </div>
                <div className='filter-menu-item'>
                  <SelectComp
                    placeholder={'Tipo'}
                    value={selectedType}
                    options={[
                      {
                        label: 'Facturas de venta',
                        value: 1,
                      },
                      {
                        label: 'Facturas de venta excenta',
                        value: 2,
                      },
                      {
                        label: 'Notas de credito',
                        value: 3,
                      },
                      {
                        label: 'Notas de debito',
                        value: 4,
                      },
                    ]}
                    HandleChange={(value,record)=>{
                      setSelectedType(value)
                      switch (value) {
                        case 1:
                          return setRenderedData(ventas.factura_venta)
                        case 2:
                          return setRenderedData(ventas.factura_venta_excenta)
                        case 3:
                          const notasCredito = ventas.notas.filter((item)=>item.tipo_credito === 1)
                          return setRenderedData(notasCredito)
                        case 4:
                          const notasDebito = ventas.notas.filter((item)=>item.tipo_debito === 1)
                          return setRenderedData(notasDebito)
                      }
                    }}
                  />
                </div>
                <div className='filter-menu-item'>
                  <DatePicker.RangePicker
                    value={dateRange} 
                    onChange={(values)=>{ 
                      setDateRange(values)
                      //console.log(moment(values[1]).format('YYYY-MM-DD'))
                      //console.log(date[0].$D)
                      /*
                      console.log(values)
                      if(values){
                        console.log('hay que filtrar cosas')
                      }else{
                        console.log('hay que eliminar los filtros')
                      }
                      */
                    }}
                  />
                </div>
            </>
           )}
          </Filter>
          <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
            <FaFileDownload/>
            <span>Reporte</span>
          </Button>
        </div>
        {docEmitidios && (
             <TableReusable
            dataSource={ renderedData }
            columns={
            [
              {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Cliente',
                dataIndex: 'cliente',
                key: 'cliente',
              },
              {
                title: 'Fecha',
                dataIndex: 'fecha',
                key: 'fecha',
                render: (text,record) => (
                  <>{text.split("T")[0]}</>
                )
              },
              {
                title: 'Neto',
                dataIndex: 'Neto',
                key: 'Neto',
                render: (text,record) => (
                  <>{text.toFixed(2)}</>
                )
              },
              {
                title: 'Bruto',
                dataIndex: 'Bruto',
                key: 'Bruto',
                render: (text,record) => (
                  <>{text.toFixed(2)}</>
                )
              },
              {
                title: 'Descargar',
                dataIndex: 'download',
                key: 'download',
                  render: () => (
                    <>
                      <div className='row' onClick={() => console.log('Descargar')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M14.25 2.5C14.25 2.36193 14.1381 2.25 14 2.25H7C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V9.14706C19.75 9.00899 19.6381 8.89706 19.5 8.89706H15C14.5858 8.89706 14.25 8.56127 14.25 8.14706V2.5ZM14.0315 13.1643C14.355 12.9056 14.8269 12.958 15.0857 13.2815C15.3444 13.6049 15.292 14.0769 14.9685 14.3357L12.4746 16.3308C12.3459 16.4361 12.1816 16.4994 12.0025 16.5L12.0001 16.5L11.9937 16.5C11.8177 16.4985 11.6561 16.4364 11.5288 16.3335L9.03151 14.3357C8.70806 14.0769 8.65562 13.6049 8.91438 13.2815C9.17313 12.958 9.6451 12.9056 9.96855 13.1643L11.2501 14.1896V10.75C11.2501 10.3358 11.5858 10 12.0001 10C12.4143 10 12.7501 10.3358 12.7501 10.75V14.1895L14.0315 13.1643Z" fill="#979797"/>
                          <path d="M15.75 2.82414C15.75 2.63964 15.9426 2.5225 16.0862 2.63839C16.2071 2.736 16.3158 2.85036 16.4085 2.97955L19.4217 7.17745C19.4903 7.27302 19.416 7.39706 19.2983 7.39706H16C15.8619 7.39706 15.75 7.28513 15.75 7.14706V2.82414Z" fill="#979797"/>
                        </svg>
                      </div>
                    </>
                  ),
              },
              {
                title: 'Compartir',
                dataIndex: 'share',
                key: 'share',
                render: () => (
                  <>
                    <div className='row' onClick={() => console.log('Compartir')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_246_6592)">
                        <path d="M14.4994 11.0003C13.932 11.0005 13.3731 11.1387 12.8709 11.403C12.3688 11.6674 11.9385 12.0499 11.6172 12.5176L6.74218 10.3163C7.08406 9.4768 7.08675 8.53734 6.74968 7.69585L11.6202 5.4841C12.0951 6.17315 12.8013 6.66915 13.6106 6.8821C14.42 7.09505 15.2788 7.01085 16.0314 6.64477C16.784 6.27869 17.3804 5.65499 17.7125 4.88681C18.0445 4.11864 18.0903 3.25688 17.8413 2.45787C17.5924 1.65887 17.0654 0.975552 16.3558 0.531889C15.6462 0.0882255 14.801 -0.0863923 13.9737 0.0397141C13.1464 0.165821 12.3917 0.584297 11.8465 1.21922C11.3013 1.85415 11.0017 2.66347 11.0022 3.50035C11.0022 3.69941 11.019 3.89811 11.0524 4.09435L5.88418 6.44035C5.38595 5.97567 4.76294 5.66649 4.09155 5.55074C3.42016 5.43498 2.72959 5.51767 2.10451 5.78868C1.47944 6.05968 0.947039 6.50721 0.572606 7.07639C0.198173 7.64556 -0.00201597 8.31164 -0.00341063 8.99293C-0.00480529 9.67422 0.192655 10.3411 0.564755 10.9118C0.936854 11.4825 1.46742 11.9322 2.09138 12.2058C2.71534 12.4793 3.40557 12.5649 4.07742 12.4519C4.74928 12.3389 5.37355 12.0322 5.87368 11.5696L11.0487 13.9073C10.927 14.6146 11.0258 15.3422 11.3315 15.9915C11.6371 16.6408 12.135 17.1805 12.7577 17.5374C13.3803 17.8943 14.0976 18.0511 14.8124 17.9867C15.5272 17.9223 16.2049 17.6398 16.7537 17.1773C17.3025 16.7149 17.6959 16.0949 17.8806 15.4014C18.0653 14.7079 18.0324 13.9744 17.7863 13.3002C17.5402 12.6261 17.0928 12.0439 16.5047 11.6325C15.9167 11.2211 15.2164 11.0004 14.4987 11.0003H14.4994Z" fill="#979797"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_246_6592">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    </div>
                  </>
                )
              },
              {
                title: 'Ceder',
                dataIndex: 'ceder',
                key: 'ceder',
                render: () => (
                  <>
                    <div className='row' onClick={() => console.log('Ceder')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                      <path d="M5.07922 1.98245C5.53273 1.52893 5.53273 0.793646 5.07922 0.340134C4.62571 -0.113378 3.89042 -0.113378 3.43691 0.340134L0.340134 3.43691C-0.113378 3.89042 -0.113378 4.62571 0.340134 5.07922L3.43691 8.17599C3.89042 8.62951 4.62571 8.62951 5.07922 8.17599C5.53273 7.72248 5.53273 6.98719 5.07922 6.53368L3.96489 5.41935H19.7419C20.3833 5.41935 20.9032 4.89943 20.9032 4.25806C20.9032 3.6167 20.3833 3.09677 19.7419 3.09677H3.96489L5.07922 1.98245Z" fill="#979797"/>
                      <path d="M18.9208 12.7272C18.4673 13.1807 18.4673 13.916 18.9208 14.3695L20.0351 15.4839H4.25806C3.6167 15.4839 3.09677 16.0038 3.09677 16.6452C3.09677 17.2865 3.6167 17.8065 4.25806 17.8065H20.0351L18.9208 18.9208C18.4673 19.3743 18.4673 20.1096 18.9208 20.5631C19.3743 21.0166 20.1096 21.0166 20.5631 20.5631L23.6599 17.4663C24.1134 17.0128 24.1134 16.2775 23.6599 15.824L20.5631 12.7272C20.1096 12.2737 19.3743 12.2737 18.9208 12.7272Z" fill="#979797"/>
                    </svg>
                    </div>
                  </>
                ),
              },
            ]
          }
            onRowClick={false}
            />
        )}
        {docPendientes&&(
          <TableReusable
          dataSource={ renderedData }

          columns={
            [
              {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Cliente',
                dataIndex: 'cliente',
                key: 'cliente',
              },
              {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
              },
              {
                title: 'Fecha Compromiso',
                dataIndex: 'fechaCompromiso',
                key: 'fechaCompromiso',
              },
              {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
              },
              {
                title: 'Insoluto',
                dataIndex: 'insoluto',
                key: 'insoluto',
              },
              {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
              },
            ]
          }
          />
        )}
        {docRecurrentes &&(
          <TableReusable
          dataSource={ renderedData }

          columns={
            [
              {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Cliente',
                dataIndex: 'cliente',
                key: 'cliente',
              },
              {
                title: 'Documento',
                dataIndex: 'documento',
                key: 'documento',
              },
              {
                title: 'Intervalo',
                dataIndex: 'intervalo',
                key: 'intervalo',
              },
              {
                title: 'Útima Emisión',
                dataIndex: 'ultimaEmision',
                key: 'ultimaEmision',
              },
              {
                title: 'Siguiente emisión',
                dataIndex: 'siguienteEmision',
                key: 'siguienteEmision',
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
            ]
          }
          />
        )}
     
          </>
 
     

        <div className='container-item-flex-end'>
          <div style={{minWidth:300,padding:30,borderRadius:20,backgroundColor:"white"}} className='column'>
            <h2>TOTAL</h2>
            <div className='row'>
              <span>Neto: </span>
              <span>$</span>
            </div>
            <div className='row'>
              <span>Bruto: </span>
              <span>$</span>
            </div>
          </div>
        </div>
      </div>
    {
      /*
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 onClick={()=>{navigation('/sale_invoices')}} className={path_name === '/shipping_invoices' ? 'section-ttl' : 'section-ttl-cta'}>Documentos de venta</h3>
          <h3 onClick={()=>{navigation('/shipping_invoices')}} className={path_name === '/shipping_invoices' ? 'section-ttl-cta' : 'section-ttl'}>Documentos de despacho</h3>
        </div>
        {renderHeaderComponent()}
      </div>
      {renderPrincipalComponent()}  
      */
    }
    </>
  )
}

export default VentasDashboard