import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from '../screens/Login/LoginScreen';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import PublicRoutes from './PublicRoutes/PublicRoutes';

const AppRouter = () => {
  const { logged,setLogged } = useContext(AppContext);

  return (
    <>
      {
        logged === true ?
        <PrivateRoutes/>
        :
        <PublicRoutes/>
      }
    </>
  )
}

export default AppRouter