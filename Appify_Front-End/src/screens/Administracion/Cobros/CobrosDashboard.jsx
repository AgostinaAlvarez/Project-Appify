import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import CobrosComponent from './CobrosComponent/CobrosComponent';
import RegistroCobros from './RegistroCobros/RegistroCobros';

const CobrosHeader = () =>{
  const { setModal,setModalContent } = useContext(AppContext);

  return (
    <>
      <div className='row-test'>
        <button onClick={()=>{
           setModal(true)
           setModalContent(
             <>
               <div>Registrar Cobro</div>
             </>
           )
        }}>TRANSACCION</button>
      </div>
    </>
  )
}

const CobrosDashboard = () => {
  const {menuOptions,setMenuOptions} = useContext(AppContext);

  const location = useLocation();

  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    //seteo el path name
    set_path_name(location.pathname)
  }, [location]);

  const navigation = useNavigate()
  
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Administracion','/sale_invoices/payments')
    setMenuOptions(updateData)
  }, [])

  function RenderHeaderComponent () {
    switch (path_name) {
      case '/sale_invoices/payments':
        return <CobrosHeader/>
      case '/sale_payment_groups':
        return <></>
    }
  }

  function RenderPrincipalComponent () {
    switch (path_name) {
      case '/sale_invoices/payments':
        return <CobrosComponent/>
      case '/sale_payment_groups':
        return <RegistroCobros/>
    }
  }

  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 className={path_name === '/sale_invoices/payments' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{navigation('/sale_invoices/payments')}}>Cobros</h3>
          <h3 className={path_name === '/sale_payment_groups' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{navigation('/sale_payment_groups')}}>Registro Cobros</h3>
        </div>
        {RenderHeaderComponent()}
      </div>
      {RenderPrincipalComponent()}
    </>
  )
}

export default CobrosDashboard