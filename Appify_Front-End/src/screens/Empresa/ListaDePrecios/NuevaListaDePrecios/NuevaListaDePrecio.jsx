import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import Success from '../../../../components/Modals/Success'
import PrincipalCard from '../../../../components/Card/PrincipalCard'
import { Button, ConfigProvider, Radio } from 'antd'
import SelectComponent from '../../../../components/Select/SelectComponent'
import { GrDownload } from 'react-icons/gr'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'



const NuevaListaDePrecio = () => {
  const [ step,setStep ] = useState(1)
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <div className='row' onClick={()=>{navigate('/price_lists')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a lista de precios</span>
      </div>
      <h1>Nueva Lista de Precios</h1>
      {
        step === 2 ?
        <Success message={'Lista de precio creada!'}/>
        :
        <PrincipalCard>
          <form className='step-form'>
            <div className='principal-container-column'>
              <div className='row-space-btw'>
                <h2>Lista de precios</h2>
                <div className='row'>

                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: `#22D695`,
                          colorPrimaryHover: `#22D695`,
                          colorPrimaryActive: `#22D695`,
                          lineWidth: 0,
                        },
                      },
                    }}
                  >
                    <Button onClick={()=>{setStep(value)}} type="primary" size='middle' style={{display:"flex",alignItems:"center",gap:15}}>
                      <FaPlus style={{color:"#fffff"}}/>
                      <span>Incluir todos los productos</span>
                    </Button>
                  </ConfigProvider>

                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: `#4880FF`,
                          colorPrimaryHover: `#4880FF`,
                          colorPrimaryActive: `#4880FF`,
                          lineWidth: 0,
                        },
                      },
                    }}
                  >
                    <Button onClick={()=>{setStep(value)}} type="primary" size='middle' style={{display:"flex",alignItems:"center",gap:15}}>
                    <GrDownload style={{color:"#fffff"}}/>
                    <span>Importar</span>
                    </Button>
                  </ConfigProvider>


                </div>
              </div>
              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Nombre <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}} placeholder='Ingrese la dirección'/>
                </div>
                <div className='column' style={{gap:15, justifyContent:"center"}}>
                  <span className='form-label'>Incluir IVA</span>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Si</Radio>
                    <Radio value={2}>No</Radio>
                  </Radio.Group>
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Producto <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}} placeholder='Introduce el nombre'/>
                </div>
              </div>

            </div>
          </form>
        </PrincipalCard>
      }
    </>
  )
}

export default NuevaListaDePrecio