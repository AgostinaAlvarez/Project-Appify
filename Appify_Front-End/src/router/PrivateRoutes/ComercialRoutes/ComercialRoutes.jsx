import React from 'react'
import PrivateStructure from '../../../screens/Structure/PrivateStructure'
import { Route, Routes } from 'react-router-dom'
import ProyectosDashboard from '../../../screens/Comercial/Proyectos/ProyectosDashboard';
import ClientesDashboard from '../../../screens/Comercial/Clientes/ClientesDashboard';
import NuevoProyecto from '../../../screens/Comercial/Proyectos/NuevoProyecto/NuevoProyecto';
import NuevaConsulta from '../../../screens/Comercial/Proyectos/NuevaConsulta/NuevaConsulta';
import NuevoCliente from '../../../screens/Comercial/Clientes/NuevoCliente/NuevoCliente';
import ClienteDetail from '../../../screens/Comercial/Clientes/ClienteDetail/ClienteDetail';
import ProyectoDetail from '../../../screens/Comercial/Proyectos/ProyectoDetail/ProyectoDetail';

const ComercialRoutes = [
  //Proyectos
  <Route key="1" path='/quotes' element={<PrivateStructure><ProyectosDashboard/></PrivateStructure>} />,
  <Route key="2" path='/quotes/new' element={<PrivateStructure><NuevoProyecto/></PrivateStructure>} />,
  <Route key="3" path='/quotes/:id' element={<PrivateStructure><ProyectoDetail/></PrivateStructure>} />,

  //Consultas
  <Route key="4" path='/quote_requests' element={<PrivateStructure><ProyectosDashboard/></PrivateStructure>} />,
  <Route key="5" path='/quote_requests/new' element={<PrivateStructure><NuevaConsulta/></PrivateStructure>} />,
  ////////
  //Clientes
  <Route key="6" path='/clients/dashboard' element={<PrivateStructure><ClientesDashboard/></PrivateStructure>} />,
  <Route key="7" path='/clients/new' element={<PrivateStructure><NuevoCliente/></PrivateStructure>} />,
  <Route key="8" path='/clients/detail/:id' element={<PrivateStructure><ClienteDetail/></PrivateStructure>} />,

];


export default ComercialRoutes