import React, { useState } from 'react'
import Success from '../../../../../../components/Modals/Success';
import PrincipalCard from '../../../../../../components/Card/PrincipalCard';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import SelectComponent from '../../../../../../components/Select/SelectComponent';
import FollowingBtn from '../../../../../../components/Buttons/FollowingBtn';
import AddMoreBtn from '../../../../../../components/Buttons/AddMoreBtn';
import CreateBtn from '../../../../../../components/Buttons/CreateBtn';
import FormerBtn from '../../../../../../components/Buttons/FormerBtn';
import { Table } from 'antd';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

/*STEPS*/

const FirstStep = ({setStep}) =>{
  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Datos generales</h2>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Nombre <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el nombre'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Interés</span>
          <input style={{padding:8}} placeholder='%'/>
        </div>
      </div>

      <div className='column' style={{gap:5}}>
        <span className='form-label'>Cuenta cobro </span>
        <SelectComponent/>
      </div>

      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>
    </div>
  )
}


const SecondStep = ({setStep}) => {

  const [ pslist,setPslist ] = useState([])


  function addItem (){
    setPslist([...pslist,{
      key:1+pslist.length,
      porcentaje: 18,
      days: 3
    }])
  }

  function createProject () {
    setStep(3)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  return (
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h2 style={{fontSize:20}}>Condición de pago</h2>
        <AddMoreBtn label={'Agregar otro item'} HanldeClick={addItem}/>
      </div> 
      {
        pslist.length === 0 ?
        <></>
        :
        <div style={{width:"100%",alignItems:"center"}}>
          <Table
            dataSource={pslist}
            columns={[
              {
                title: 'Porcentaje',
                dataIndex: 'porcentaje',
                key: 'porcentaje',
              },
              {
                title: 'Número de días',
                dataIndex: 'days',
                key: 'days',
              },
              {
                title: 'Acciones',
                key: 'actions',
                render: (text, record) => (
                  <div style={{display:"flex",alignItems:"center",gap:15}}>
                    <AiFillEdit style={{cursor:"pointer"}}/>
                    <FaTrashAlt style={{cursor:"pointer"}}/>
                  </div>
                ),
              },
            ]}
          />
        </div>
      }
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Porcentaje <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='%'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Número de días </span>
          <input style={{padding:8}} placeholder='Ingrese el número de días '/>
        </div>
      </div>
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <CreateBtn label={'Crear condición'} HanldeClick={createProject}/>
      </div>
    </div>
  )
}

const NuevaCondicionDePago = () => {
  const [ step,setStep ] = useState(1);
  const navigate = useNavigate();


  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep}/>
      case 2:
        return <SecondStep setStep={setStep}/>
      
      
    }
  }
  return (
    <>
      <div className='row' onClick={()=>{navigate('/admin_acount')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a condición de pago</span>
      </div>
      <h1>Agregar condición de pago</h1>
      {
        step === 3 ?
        <Success message={'Condición de pago creada!'}/>
        :
        <PrincipalCard>
          <div className='step-container step-container-2-steps'>
            <div className='step-container-item'>
              <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
              <div className='step-item-dot-cta' style={{left:-20}}>1</div>
              <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>

            </div>
            
          </div>
          <form className='step-form'>
            {formSetupSteps()}
          </form>

        </PrincipalCard>
      }
    </>
  )
}

export default NuevaCondicionDePago