import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComp from '../../../../components/Select/SelectComp';
import { Radio, Checkbox} from 'antd';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
export const NuevaCtaBancaria = () =>{
    const navigate = useNavigate();
    const [value, setValue]=useState(false);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value === "true"); // Convertir el valor de string a booleano
    };
    const [checked, setChecked]=useState(false);
    const onChange2 = (e) => {
        console.log('checkbox checked', e.target.checked);
        setChecked(e.target.checked); // Convertir el valor de string a booleano
    }
    return(
    <>
    <div className='row' onClick={()=>{navigate('/banks')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
    <FaArrowLeftLong/>
    <span>Volver a cuentas bancarias</span>
    </div>
    <h1>Agregar cuenta bancaria</h1>
    <div>
        <PrincipalCard>
        <form className='step-form'>
            <div className='principal-container-column'>

                <div className='form-grid'>
                    <div className='column' style={{gap:5}}>
                        <span className='form-label'>Nombre<span style={{color:"red"}}>*</span></span>
                        <input style={{padding:8}} placeholder='Ingrese el nombre de la cuenta'/>
                    </div>
                    <div className='column' style={{gap:5}}>
                    <span className='form-label'>Tipo de cuenta <span style={{color:"red"}}>*</span></span>
                    <SelectComp
                    HandleChange={(text,record)=>{

                    }}
                    placeholder={'Seleccione el tipo de cuenta'}
                    options={[
                        { label: "Activo circulante", value: 1 },
                      { label: "Activo fijo", value: 2 },
                      { label: "Pasivo circulante", value: 3 },
                      { label: "Pasivo largo plazo", value: 4 },
                      { label: "Reparación y mantenimiento", value: 5 },
                      { label: "Ventas ", value: 6 },
                      { label: "Costos de productos y servicios", value: 7 },
                      { label: "Transporte y gastos de entrega", value: 8 },
                      { label: "Nomina/Remuneraciones", value: 9 },
                      { label: "Alquiler y arrendamiento inmuebles y maquinarias", value: 10 },
                      { label: "Oficia/Gastos administrativos generales", value: 11 },
                      { label: "Otros gastos misceláneos", value: 12 },
                      { label: "Impuestos", value: 13 },
                      { label: "Gastos financieros", value: 14 }
                    ]}

                    />
                    </div>
                </div>

                <div className='form-grid'>
                    <div className='column' style={{gap:5}}>
                    <span className='form-label'>N° de cuenta corriente <span style={{color:"red"}}>*</span></span>
                    <input style={{padding:8}} placeholder='Ingrese el número de cuenta'/>
                    </div>
                    <div className='column' style={{gap:5}}>
                        <span className='form-label'>Predeterminada para pagos</span>
                        <Radio.Group>  {/*onChange={onChange} value={value} */}
                        <Radio value={true}>Si</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                    </div>
                </div>
                <div className='form-grid'>
                    <div className='column' style={{gap:5}}>
                        <span className='form-label'>Código<span style={{color:"red"}}>*</span></span>
                        <input style={{padding:8}} placeholder='Ingrese el código'/>
                    </div>
                    <div className='column' style={{gap:5}}>
                    <span className='form-label'>Predeterminada para cobros</span>
                        <Radio.Group>  {/*onChange={onChange} value={value} */}
                        <Radio value={false}>Si</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                    </div>
                </div>
                <div className='form-grid'>
                    <div className='column' style={{gap:5}}>
                        <span className='form-label'>Moneda secundaria<span style={{color:"red"}}>*</span></span>
                        <Radio.Group>  {/*onChange={onChange} value={value} */}
                        <Radio value={true}>Si</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                    </div>
                    <div className='column' style={{gap:5}}>
                        <span className='form-label'>Cuenta activa<span style={{color:"red"}}>*</span></span>
                        <Radio.Group>  {/*onChange={onChange} value={value} */}
                        <Radio value={true}>Si</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                    </div>
                </div>
                <div className='form-grid'>
                    <div className='column'>
                        <span className='form-label'>Documentos permitidos</span>
                        <Checkbox onChange={onChange2} checked={checked}>
                        Automaticos
                        </Checkbox>
                    </div>
                </div>
            </div>
            <div className='container-item-flex-end' style={{marginTop:30}}>
                <CreateBtn label={'Agregar cuenta'}/>
            </div>    
        </form>
        </PrincipalCard>
    </div> 
    </>
    )
}