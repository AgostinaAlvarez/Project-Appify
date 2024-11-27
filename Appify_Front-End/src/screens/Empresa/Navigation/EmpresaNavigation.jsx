import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext';
import UsuariosDashboard from '../Usuarios/UsuariosDashboard';
import ProductosServiciosDashboard from '../ProductosServicios/ProductosServiciosDashboard';
import ListaDePreciosDashboard from '../ListaDePrecios/ListaDePreciosDashboard';
import ProveedoresDashboard from '../Proveedores/ProveedoresDashboard';
import ConfiguracionesDashboard from '../Configuraciones/ConfiguracionesDashboard';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';


const EmpresaNavigation = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);

  const location = useLocation();

  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    set_path_name(location.pathname)
  }, [location]);

  const navigation = useNavigate()

  
  function setNavigation (name){
    let updatedMenuOptions = menuOptions;
    updatedMenuOptions[4].submenuOptions.forEach((option, index) => {
      if (option.name === name) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
    setMenuOptions(updatedMenuOptions);
  }
  //
  function renderComponent (){
    switch (path_name) {
      case '/users':
        return <UsuariosDashboard/>
      case '/products':
        return <ProductosServiciosDashboard/>
      case '/price_lists':
        return <ListaDePreciosDashboard/>
      case '/providers':
        return <ProveedoresDashboard/>
      case '/confs':
        return <ConfiguracionesDashboard/>
    }
  }


  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Mi Empresa',location.pathname)
    console.log(updateData)
    setMenuOptions(updateData)
  }, [])
  


  return (
    <>
      <div className='card'>
        <div className='row-test'>
          <h3 className={path_name === '/users' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{
            setNavigation('Usuarios')
            navigation('/users')}} >Usuarios</h3>
          <h3 className={path_name === '/products' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{
            setNavigation('Productos/Servicios')
            navigation('/products')}}>Productos / Servicios</h3>
          <h3 className={path_name === '/price_lists' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{
            setNavigation('Lista de precios')
            navigation('/price_lists')}} >Lista de precios</h3>
          <h3 className={path_name === '/providers' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{
            setNavigation('Proveedores')
            navigation('/providers')}}>Proveedores</h3>
          <h3 className={path_name === '/confs' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{
            setNavigation('Configuraciones')
            navigation('/confs')}} >Configuraciones</h3>
        </div>
        <div>
          {renderComponent()}
        </div>
      </div>
    </>
  )
}

export default EmpresaNavigation