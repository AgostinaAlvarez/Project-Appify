import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import CuentasBancarias from './CuentasBancarias/CuentasBancarias';
import Resultados from './Resultados/Resultados';
import BalanceDashboard from './Balance/BalanceDashboard';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import PrincipalCard from '../../../components/Card/PrincipalCard';
import Elementobar from '../../../components/Test/Elementobar';
import { Bar } from 'react-chartjs-2';
import { BsBank2 } from 'react-icons/bs';
import { GraficoFlujo } from '../../../components/Test/GraficoFlujo-2';
import { NuevaCtaBancaria } from './CuentasBancarias/NuevaCtaBancaria';
const CuentasBancariasHeader = () =>{
  return (
    <>
      <div>Config Icon</div>
    </>
  )
}

const ResultadosHeader = () =>{
  const { setModal,setModalContent } = useContext(AppContext);
  return (
    <>
      <div className='row-test'>
        <div>Config Icon</div>
        <button>REPORTES</button>
        <button onClick={()=>{
          setModal(true)
          setModalContent(
            <>
              <div>Registrar Nueva Cuenta</div>
            </>
          )
        }}>NUEVA CUENTA</button>
      </div>
    </>
  )
}

const BalanceHeader = () =>{
  const { setModal,setModalContent } = useContext(AppContext);

  return (
    <>
      <div className='row-test'>
        <div>Config Icon</div>
        <button>REPORTES</button>
        <button onClick={()=>{
          setModal(true)
          setModalContent(
            <>
              <div>Registrar Nueva Cuenta</div>
            </>
          )
        }}>NUEVA CUENTA</button>
      </div>
    </>
  )
}

const labelsBardTwo = ["Enero", "Febrero", "Marzo", "Abril",  ];


const optionsBarTwo = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return "$" + value;
        },
      },
    },
  },
};




const dataBarTwo = {
  labels: labelsBardTwo,
  datasets: [
    {
      label: "Ingresos",
      data: [7451698, 2896570, 3158946, 6234540, ],
      backgroundColor: "rgba(0, 182, 155, 1)",
      borderRadius: 80,
      barSpacing: 5,
    },
    {
      label: "Egresos",
      data: [5651140, 2654610, 5989801, 4656540, ],
      borderRadius: 80,
      barSpacing: 5,
      backgroundColor: "rgba(253, 115, 16, 1)",
    },
  ],
};


const CuentasDashboard = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    //seteo el path name
    set_path_name(location.pathname)
  }, [location]);

  const {menuOptions,setMenuOptions} = useContext(AppContext);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/banks')
    setMenuOptions(updateData)
  }, [])

  

  function RenderHeaderComponent () {
    switch (path_name){
      case '/banks':
        return <CuentasBancariasHeader/>
      case '/banks/results':
        return <ResultadosHeader/>
      case '/banks/balance':
        return <BalanceHeader/>
    }
  }


  function RenderPrincipalComponent () {
    switch (path_name){
      case '/banks':
        return <CuentasBancarias/>
      case '/banks/results':
        return <Resultados/>
      case '/banks/balance':
        return <BalanceDashboard/>
      case '/banks/new':
        return <NuevaCtaBancaria/>
    }
  }

  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Cuentas bancarias</h1>
        <AddMoreBtn label={'Agregar'} HanldeClick={()=>{navigate('/banks/new')}}/>
      </div>
      <PrincipalCard>
        <div className='principal-container-column' style={{padding:"15px 30px",gap:80}}>
          <div className='row-space-btw cuentas-header'>
            <h2 className='ttl'>Flujo de caja</h2>
            <div className='row' style={{gap:40}}>
              <div className='row' style={{fontWeight:300}}>
                <div className='cuentas-label-aside' style={{backgroundColor:"#00B69B"}}></div>
                <span>Ingresos</span>
              </div>
              <div className='row' style={{fontWeight:300}}>
                <div className='cuentas-label-aside' style={{backgroundColor:"#FD7338"}}></div>
                <span>Egresos</span>
              </div>
            </div>
          </div>
          {/*GRAFICO DE BARRAS*/}
          <div >
            <GraficoFlujo/>
          </div>
          {
            /**
             <div style={{ width: "100%",height:"300px" }}>
               <Bar options={optionsBarTwo} data={dataBarTwo} />
             </div>
             
             */
          }
        </div>
      </PrincipalCard>
      <div className='home-screen-section home-screen-second-card-container'>
          <PrincipalCard>
            <div onClick={()=>{navigate('/bank/1')}} style={{cursor:"pointer"}} className='principal-container-column'>
              <div className='row-space-btw' style={{fontSize:19}}>
                <h2>Banco 1</h2>
                <BsBank2 style={{fontSize:26,color:"#4880FF"}}/>
              </div>
              <div>
                <span>N cuenta</span>
              </div>
              <div className='row-space-btw' style={{fontWeight:700,fontSize:23}}>
                <span>Monto</span>
                <span>$2300</span>
              </div>
            </div>
          </PrincipalCard>
          <PrincipalCard>
            <div onClick={()=>{navigate('/bank/1')}} style={{cursor:"pointer"}} className='principal-container-column'>
              <div className='row-space-btw' style={{fontSize:19}}>
                <h2>Banco 1</h2>
                <BsBank2 style={{fontSize:26,color:"#4880FF"}}/>
              </div>
              <div>
                <span>N cuenta</span>
              </div>
              <div className='row-space-btw' style={{fontWeight:700,fontSize:23}}>
                <span>Monto</span>
                <span>$2300</span>
              </div>
            </div>
          </PrincipalCard>
      </div>
    </div>
    {
      /*
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 className={ path_name === '/banks' ? 'section-ttl-cta' : 'section-ttl' } onClick={()=>{navigation('/banks')}}>Cuentas bancarias</h3>
          <h3 className={ path_name === '/banks/results' ? 'section-ttl-cta' : 'section-ttl' } onClick={()=>{navigation('/banks/results')}}>Resultados</h3>
          <h3 className={ path_name === '/banks/balance' ? 'section-ttl-cta' : 'section-ttl' } onClick={()=>{navigation('/banks/balance')}}>Balance</h3>
        </div>
        {RenderHeaderComponent()}
      </div>
      {RenderPrincipalComponent()}
      
      */
    }
    </>
  )
}

export default CuentasDashboard