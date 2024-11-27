import React from 'react'
import { Route } from 'react-router-dom'
import PrivateStructure from '../../../screens/Structure/PrivateStructure'
import TareasDashboard from '../../../screens/Calendario/Tareas/TareasDashboard';
import AgendamientoDashboardd from '../../../screens/Calendario/Agendamiento/AgendamientoDashboardd';

const CalendarioRoutes = [
    <Route path='/delivery_orders/delivery_route' element={<PrivateStructure><AgendamientoDashboardd/></PrivateStructure>}/>,
    <Route path='/qtwist/delivery_orders' element={<PrivateStructure><TareasDashboard/></PrivateStructure>}/>      
];

export default CalendarioRoutes