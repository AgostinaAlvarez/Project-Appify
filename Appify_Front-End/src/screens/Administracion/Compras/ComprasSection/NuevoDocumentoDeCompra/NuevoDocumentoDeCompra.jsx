import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../../utils/helpers';

const NuevoDocumentoDeCompra = () => {
  const navigate = useNavigate()

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Administracion','/service_invoices')
    setMenuOptions(updateData)
  }, [])

  return (
    <>
      <div className='row-test'>
        <h3 onClick={()=>{navigate('/service_invoices')}} style={{color:"red"}}>Compras</h3>
        <h3>Nueva Factura</h3>
      </div>
      <h3>Compra Nº 0000000 04/04/2024</h3>
      <div>Formulario para generar un nuevo documento de compra</div>
      <form>
        <button>Previsualizar</button>
        <button>Crear</button>
      </form>
    </>
  )
}

export default NuevoDocumentoDeCompra