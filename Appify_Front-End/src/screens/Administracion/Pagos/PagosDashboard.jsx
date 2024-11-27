import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import PagosComponent from './PagosComponent/PagosComponent';
import RegistroPagos from './RegistroPagos/RegistroPagos';
import Modal from '../../../components/Modal/Modal';

const PagosHeader = () =>{
  const { setModal,setModalContent } = useContext(AppContext);

  return (
    <>
      <button onClick={()=>{
        setModal(true)
        setModalContent(
          <>
            <div>Registrar pago</div>
          </>
        )
      }}>Transaccion</button>
    </>
  )
}


const PagosDashboard = () => {
  
  const {menuOptions,setMenuOptions,setModal} = useContext(AppContext);

  const location = useLocation();

  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    //seteo el path name
    set_path_name(location.pathname)
  }, [location]);

  const navigation = useNavigate()
  
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Administracion','/service_invoices/payments')
    setMenuOptions(updateData)
  }, [])

  function RenderHeaderComponent () {
    switch (path_name) {
      case '/service_invoices/payments':
        return <PagosHeader/>
      case '/payment_groups':
        return <></>
    }
  }

  function RenderPrincipalComponent () {
    switch (path_name) {
      case '/service_invoices/payments':
        return <PagosComponent/>
      case '/payment_groups':
        return <RegistroPagos/>
    }
  }
  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 className={path_name === '/service_invoices/payments' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{navigation('/service_invoices/payments')}}>Pagos</h3>
          <h3 className={path_name === '/payment_groups' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{navigation('/payment_groups')}}>Registro Pagos</h3>
        </div>
        {RenderHeaderComponent()}
      </div>
      {RenderPrincipalComponent()}
    </>
  )
}

export default PagosDashboard