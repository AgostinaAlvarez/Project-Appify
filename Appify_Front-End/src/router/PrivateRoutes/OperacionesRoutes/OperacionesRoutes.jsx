import React from 'react'
import { Route } from 'react-router-dom'
import PrivateStructure from '../../../screens/Structure/PrivateStructure'
import OrdenesDeTrabajoDashboard from '../../../screens/Operaciones/OrdenesDeTrabajo/OrdenesDeTrabajoDashboard';
import TableroDashboard from '../../../screens/Operaciones/Tablero/TableroDashboard';
import OrdenesDeCompraDashboard from '../../../screens/Operaciones/OrdenesDeCompra/OrdenesDeCompraDashboard'
import NuevaODT from '../../../screens/Operaciones/OrdenesDeTrabajo/NuevaODT/NuevaODT';
import NuevaODC from '../../../screens/Operaciones/OrdenesDeCompra/NuevaODC/NuevaODC';
import ODCDetail from '../../../screens/Operaciones/OrdenesDeCompra/ODCDetail/ODCDetail';
const OperacionesRoutes = [
      //ORDENES DE TRABAJO 
      <Route path='/work_orders' element={<PrivateStructure><OrdenesDeTrabajoDashboard/></PrivateStructure>}/>,
      <Route path='/work_orders/new' element={<PrivateStructure><NuevaODT/></PrivateStructure>}/>,

      ///
      <Route path='/work_orders/panel' element={<PrivateStructure><TableroDashboard/></PrivateStructure>}/>,
      //ORDENES DE COMPRA
      <Route path='/purchases' element={<PrivateStructure><OrdenesDeCompraDashboard/></PrivateStructure>}/>,
      <Route path='/purchases/new' element={<PrivateStructure><NuevaODC/></PrivateStructure>}/>,
      <Route path='/purchases/detail/:id' element={<PrivateStructure><ODCDetail/></PrivateStructure>}/>
];
export default OperacionesRoutes