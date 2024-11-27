import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/isologo_appify.svg'
const NotFoundScreen = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className='not-found-screen'>
      <div className='not-found-screen-container'>
        <div className='row-test'>
          <img src={logo} className='not-found-screen-logo'/>
          <h1 style={{fontSize:"6rem"}}>404</h1>
        </div>
        <h2>¡Ops!</h2>
        <span>La página que buscas no existe. Probablemente está mal escrita la dirección o la página ha sido cambiada de lugar.</span> 
        <NavLink to='/'>Volver al inicio</NavLink>
      </div>
    </div>
    </>
  )
}

export default NotFoundScreen