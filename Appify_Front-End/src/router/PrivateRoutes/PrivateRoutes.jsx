import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFoundScreen from '../../screens/NotFoundScreen'
import HomeScreen from '../../screens/Home/HomeScreen'
import PrivateStructure from '../../screens/Structure/PrivateStructure'
import ComercialRoutes from './ComercialRoutes/ComercialRoutes'
import OperacionesRoutes from './OperacionesRoutes/OperacionesRoutes'
import CalendarioRoutes from './CalendarioRoutes/CalendarioRoutes'
import AdministracionRoutes from './AdministracionRoutes/AdministracionRoutes'
import EmpresaRoutes from './EmpresaRoutes/EmpresaRoutes'
import { AppContext } from '../../context/AppContext'
import { getDataProveedores } from '../../utils/helpers'
import { fetchDataAfterLogin } from '../../utils/index.js'
import Profile from '../../screens/Profile/Profile.jsx'
import ProgressBar from '../../components/Loader/LoaderLogin.jsx'
import NuevoDcVentaTst from '../../screens/Administracion/Ventas/NuevoDocumentoDeVenta/NuevoDcVentaTst.jsx'

const PrivateRoutes = () => {
  const { loadingPrivateRoutes } = useContext(AppContext)
  const [ error,setError ] = useState(false)
  

  return (
    <Routes>
      {
        loadingPrivateRoutes === true ?
        <Route path='*' element={<PrivateStructure>
          <>
            <div>Loading</div>
          </>
        </PrivateStructure>}/>
        :
        <>
          {
            error === true ?
            <Route path='*' element={<PrivateStructure><div>Error</div></PrivateStructure>}/>
            :
            <>
            <Route
              path='*'
              element={
                <Routes>
                  <Route path='/' element={<PrivateStructure><HomeScreen/></PrivateStructure>}/>
                  {/*GESTION*/}
                  {ComercialRoutes}
                  {/*ORDENES*/}           
                  {OperacionesRoutes}
                  {CalendarioRoutes}
                  {/*FINANZAS */}
                  {AdministracionRoutes}
                  {/*MI EMPRESA*/}
                  {EmpresaRoutes}
                  <Route path='/tesster' element={<PrivateStructure><NuevoDcVentaTst/></PrivateStructure>} />
                  <Route path='/profile' element={<PrivateStructure><Profile/></PrivateStructure>}/>
                  <Route path='/login' element={<Navigate to='/'/>}/>
                  <Route path='*' element={<Navigate to="/not-found"/>}/>
                </Routes>
              }
            />
            <Route path='/not-found' element={<NotFoundScreen/>}/>            
            </>
          }
        </>
      }
    </Routes>
  )
}

export default PrivateRoutes