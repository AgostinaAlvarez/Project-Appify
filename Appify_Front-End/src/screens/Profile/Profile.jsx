import React, { useContext, useState } from 'react'
import PrincipalCard from '../../components/Card/PrincipalCard'
import { CiEdit } from "react-icons/ci";
import { MdImage } from "react-icons/md";
import { AppContext } from '../../context/AppContext';
import { formatDateToDMY} from '../../utils/date/formatDate';

const Profile = () => {
  const { userLoggedData } = useContext(AppContext);
  return (
    <div >
        <h1>Mi Perfil</h1>
        <PrincipalCard>
           <div className='profile-container'>
            {/*ICONO ABSOLUTO*/}
            <CiEdit style={{position:"absolute",top:0,right:0,fontSize:26,cursor:"pointer"}}/>
            {/*Primera seccion*/}
            <div className='profile-header-container'>
              <div className='profile-img-container'>
                <MdImage/>
              </div>
              <h2>{userLoggedData.data.nombre} {userLoggedData.data.apellido}</h2>
              <span>{userLoggedData.data.cargo ? userLoggedData.data.cargo : 'Administrador'}</span>
            </div>
            <div style={{width:"100%",padding:"10px 0px"}}>
              <h2>Datos del perfil</h2>
            </div>
            {/*Segunda seccion*/}
            <div className='profile-grid'>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>+{userLoggedData.data.celular}</span>
                <span>N de teléfono</span>
              </div>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>{formatDateToDMY(userLoggedData.data.fecha_de_nacimiento)}</span>
                <span>Fecha de nacimiento</span>
              </div>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>{userLoggedData.data.email}</span>
                <span>Email</span>
              </div>
            </div>
            <div>
              {userLoggedData.data.user}
            </div>
          </div>
        </PrincipalCard>
    </div>
  )
}

export default Profile