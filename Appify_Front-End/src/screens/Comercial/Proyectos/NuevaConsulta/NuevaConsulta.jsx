import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';

const NuevaConsulta = () => {
  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Comercial','/quote_requests')
    setMenuOptions(updateData)
  }, [])
  return (
    <>
      <h3>Datos</h3>
      <div>Formulario para registrar una nueva consulta</div>
      <form>
        <button>ENVIAR</button>
      </form>
    </>
  )
}

export default NuevaConsulta