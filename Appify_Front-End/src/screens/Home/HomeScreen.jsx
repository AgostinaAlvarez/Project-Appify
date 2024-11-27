import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Select } from 'antd';
import { DatePicker } from 'antd';
import { FaUserAlt } from "react-icons/fa";
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import { AppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';
import PrincipalCard from '../../components/Card/PrincipalCard';
import SelectComponent from '../../components/Select/SelectComponent';
import { TbFileDownload } from "react-icons/tb";
import { FaFileDownload } from "react-icons/fa";

import { PieChart } from '@mui/x-charts/PieChart';
import Elementobar from '../../components/Test/Elementobar';

import { GraphProject } from './Graficos/GraphProject';
import { SelectPeriod } from '../../components/Select/SelectPeriod';
import { GraphSales } from './Graficos/GraphSales';
import { GraphExpenses } from './Graficos/GraphGastos';
import { GraphIngresos } from './Graficos/GraphIngresos';
import { GraficoFlujo } from './Graficos/GraphFlujo';
import { GraficoFacturacion } from './Graficos/GraphFacturacion';
import { generatePDF } from '../../utils/pdf/download';
const data1 = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
  { label: 'Group E', value: 278 },
  { label: 'Group F', value: 189 },
];

const data2 = [
  { label: 'Group A', value: 2400 },
  { label: 'Group B', value: 4567 },
  { label: 'Group C', value: 1398 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



const HomeScreen = () => {

  const { menuOptions,setMenuOptions,menuOptionsinitialState } = useContext(AppContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const [ VFOption,setVFOption ] = useState(0)
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,
      },
    ],
  };

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Agrega un event listener para el evento 'resize'
    window.addEventListener('resize', handleResize);
    // Elimina el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // El segundo argumento [] asegura que useEffect solo se ejecute una vez, equivalente a componentDidMount en clases
  
  //esto es para actualizar la navbar
  useEffect(() => {
    setMenuOptions(menuOptionsinitialState)
  }, [])


  //esto es para saber donde estoy parado y setear las opciones del menu options
  
  const { userLoggedData } = useContext(AppContext);

  useEffect(() => {
    console.log(userLoggedData)
  }, [])
  const [period,setPeriod]=useState('mensual');
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateGastos, setStartDateGastos] = useState(new Date())
    const getPeriod = (period) => {
      const now = new Date();
      let start;
      if (period === "mensual") {
        start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      } else if (period === "trimestral") {
        start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      } else if (period === "anual") {
        start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      } else {
        start = now;
      }
      setStartDateGastos(start)
      setStartDate(start);
      setEndDate(now);
  };
  useEffect(() => {
    getPeriod('mensual');
  }, []);
  const handleChangePeriod = (newPeriod) =>{
    getPeriod(newPeriod)
    setPeriod(newPeriod)
  }
  const formatDate = (date)=>{
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
   let dateString = date.toLocaleDateString('es-ES', options);

    dateString = dateString.replace(/\b(\w+)\b/g, (match) => {
      if (match.toLowerCase() === 'de') {
        return match.toLowerCase();
      }
      return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });

    return dateString;
  }

  return (
    <>
      <div>
        <h1>Hola {userLoggedData.data.nombre} !</h1>
        <h2>Bienvenido a Appify</h2>
        {/*Proyectos*/}
        <PrincipalCard>
       <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', borderRadius: 16}}>
        <div className='proyectos-section' >
                <div className='row-space-btw divGraficosMobile'>
                  <div className='column'>
                    <h3>Proyectos</h3>
                    <span>Desde el <span className='fecha-periodo'>{formatDate(startDate)}</span> al <span className='fecha-periodo'>{formatDate(endDate)}</span></span>
                  </div>
                  <div className='row'>
                    <SelectPeriod onChange={handleChangePeriod} defaultValue={period}/>
                    {/* <Button 
                    type='primary' 
                    onClick={() => generatePDF('reporteProyectos', 'Reporte_Proyectos')}
                    style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <FaFileDownload/>
                    </Button> */}
                   
                  </div>
                </div>
        </div>
          <div id='reporteProyectos' className='divProyecto'> 
  
              <GraphProject period={period} startDate={formatDate(startDate)} endDate={formatDate(endDate)}/>
          </div>
      </div>
        </PrincipalCard>

        {/*Gastos*/}
        <div className='home-egresos-ingresos-grid'>
          <PrincipalCard>
            <div className='row-space-btw divGraficosMobile'>
              <div className='column divGastos'>
                <h3>Gastos</h3>
                <span>Desde el <span className='fecha-periodo'>{formatDate(startDateGastos)}</span> al <span className='fecha-periodo'>{formatDate(endDate)}</span></span>
              </div>
              <SelectPeriod onChange={handleChangePeriod} defaultValue={period}/>
            </div>
            <div>
               <GraphExpenses/>
            </div>
          </PrincipalCard>   
          <PrincipalCard>
            <div className='row-space-btw divGraficosMobile' style={{marginBottom:20}}>
              <div className='column divGastos'>
                <h3>Ingresos</h3>
                <span>Del 1 al 13 de marzo</span>
              </div>
              <SelectComponent/>
            </div>
            <div>
              <GraphIngresos/>
            </div>
          </PrincipalCard>
        </div>

        {/*Ventas */}
        <PrincipalCard>
          <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', borderRadius: 16}}>
            <div className='proyectos-section'>
                    <div className='row-space-btw divGraficosMobile'>
                      <div className='column'>
                        <h3>Ventas</h3>
                        <span>Del 1 al 13 de marzo</span>
                      </div>
                      <div className='row'>
                        <SelectComponent/>
                        <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <FaFileDownload/>
                        </Button>
                      </div>
                    </div>
            </div>
              <div className='divVen'>
                  <GraphSales/>
              </div>
      </div>
        </PrincipalCard>
        <div className='home-egresos-ingresos-grid'>
          <PrincipalCard>
          <div className='row-space-btw divGraficosMobile'>
              <div className='column divGastos'>
                <h3>Facturación</h3>
                <span>Del 1 al 13 de marzo</span>
              </div>
              <SelectComponent/>
            </div>
            <div className='graphFlujo'>
              <GraficoFacturacion/>
            </div>
            <div className='labelfacturacion'>

              <div className='conciliado'>
                <div className='barraConciliado'></div>
                <div>
                   <p>Conciliado</p>
                  <span>25%</span>
                </div>
              </div>
              <div className='pendiente'>
                <div className='barraPendiente'></div>
                <div>
                  <p>Pendiente</p>
                  <span>75%</span> 
                </div>
              </div> 
            </div>
          </PrincipalCard>
          <PrincipalCard>
          <div className='row-space-btw divGraficosMobile'>
              <div className='column'>
                <h3>Flujo de caja</h3>
                <span>Del 1 al 13 de marzo</span>
              </div>
              <SelectComponent/>
            </div>
            <div className='graphFlujo'>
              <GraficoFlujo/>
            </div>
            <div className='labelFlujo'>
              <div className='ingresos'>
                <div className='barraIngresos'></div>
                <div>
                   <p>Ingresos</p>
                </div>
              </div>
              <div className='egresos'>
                <div className='barraEgresos'></div>
                <div>
                  <p>Egresos</p>
                </div>
              </div> 
            </div>
          </PrincipalCard>
        </div>
      </div>
    </>
  )
}

export default HomeScreen