import React from 'react'
import Profile from '../../../screens/Empresa/Perfil/Profile'
import EditProfile from '../../../screens/Empresa/Perfil/EditProfile'
import EmpresaNavigation from '../../../screens/Empresa/Navigation/EmpresaNavigation'
import { Route } from 'react-router-dom'
import PrivateStructure from '../../../screens/Structure/PrivateStructure'
import UsuarioDetail from '../../../screens/Empresa/Usuarios/UsuarioDetail/UsuarioDetail'
import UsuarioEdit from '../../../screens/Empresa/Usuarios/UsuarioEdit/UsuarioEdit'
import NuevoPS from '../../../screens/Empresa/ProductosServicios/NuevoPS/NuevoPS'
import ProductoDetail from '../../../screens/Empresa/ProductosServicios/ProductoDetail/ProductoDetail'
import NuevoProveedor from '../../../screens/Empresa/Proveedores/NuevoProveedor/NuevoProveedor'
import ProveedorDetail from '../../../screens/Empresa/Proveedores/ProveedorDetail/ProveedorDetail'
import ProductoEdit from '../../../screens/Empresa/ProductosServicios/ProductoEdit/ProductoEdit'
import UsuariosDashboard from '../../../screens/Empresa/Usuarios/UsuariosDashboard'
import ProductosServiciosDashboard from '../../../screens/Empresa/ProductosServicios/ProductosServiciosDashboard'
import ListaDePreciosDashboard from '../../../screens/Empresa/ListaDePrecios/ListaDePreciosDashboard'
import ProveedoresDashboard from '../../../screens/Empresa/Proveedores/ProveedoresDashboard'
import NuevaListaDePrecio from '../../../screens/Empresa/ListaDePrecios/NuevaListaDePrecios/NuevaListaDePrecio'
import NuevoUsuario from '../../../screens/Empresa/Usuarios/NuevoUsuario.jsx/NuevoUsuario'

const EmpresaRoutes = [
  //USUARIOS  
  <Route path='/users/my_profile' element={<PrivateStructure><Profile/></PrivateStructure>}/>,
  //<Route path='/users/:id/edit' element={ <PrivateStructure><EditProfile/></PrivateStructure>}/>,
  <Route path='/users/:id/edit' element={ <PrivateStructure><UsuarioEdit/></PrivateStructure>}/>,  
  <Route path='/users' element={<PrivateStructure><UsuariosDashboard/></PrivateStructure>}/>,
  <Route path='/users/new' element={<PrivateStructure><NuevoUsuario/></PrivateStructure>}/>,
  <Route path='/users/:id' element={<PrivateStructure><UsuarioDetail/></PrivateStructure>}/>,
  
  //PRODUCTOS Y SERVICIOS
  <Route path='/products' element={<PrivateStructure><ProductosServiciosDashboard/></PrivateStructure>}/>,
  <Route path='/products/new' element={<PrivateStructure><NuevoPS/></PrivateStructure>}/>,
  <Route path='/products/:id' element={<PrivateStructure><ProductoDetail/></PrivateStructure>}/>,
  <Route path='/products/:id/edit' element={<PrivateStructure><ProductoEdit/></PrivateStructure>}/>,
  //
  <Route path='/price_lists' element={<PrivateStructure><ListaDePreciosDashboard/></PrivateStructure>}/>,
  <Route path='/price_lists/new' element={<PrivateStructure><NuevaListaDePrecio/></PrivateStructure>}/>,

  //PROVEEDORES
  <Route path='/providers' element={<PrivateStructure><ProveedoresDashboard/></PrivateStructure>}/>,
  <Route path='/providers/:id' element={<PrivateStructure><ProveedorDetail/></PrivateStructure>}/>,
  <Route path='/providers/new' element={<PrivateStructure><NuevoProveedor/></PrivateStructure>}/>,
  
  <Route path='/confs' element={<PrivateStructure><EmpresaNavigation/></PrivateStructure>}/>
];

export default EmpresaRoutes