import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { FaArrowLeftLong } from "react-icons/fa6";
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { Radio, Spin } from 'antd';
import { Button, ConfigProvider, DatePicker, Slider, Space, Switch, Table } from 'antd';
import { useNavigate } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import SelectComponent from '../../../../components/Select/SelectComponent';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import Success from '../../../../components/Modals/Success';
import { FaRegCheckCircle, FaRegTimesCircle, FaRegTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import SelectComp from '../../../../components/Select/SelectComp';
import { MdErrorOutline } from 'react-icons/md';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { Loader } from '../../../../components/Loader/Loader';
import ModalError from '../../../../components/Modal/ModalError';
import { newClientValidation } from '../../../../utils/validations/newClientValidation';
import {TableReusable} from "../../../../components/Table/TableReusable";
import ErrorMessage from '../../../../components/FormValidation/ErrorMessage';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
const FirstStep = ({setStep,data,setData}) =>{
  const [value, setValue] = useState(data.activo);
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setData({ ...data,activo: e.target.value })
    setValue(e.target.value);
    
  };
  const handleValidation = () =>{
    const newErrors = newClientValidation(1, data);
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  }
  return(
    <div className='principal-container-column'>

      <h2 style={{fontSize:20}}>Datos principales</h2>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Razón Social / Nombre <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={data.razon_social} onChange={(e)=>{setData({ ...data, razon_social: e.target.value })}} placeholder='Ingrese la razón social o nombre'/>
          <ErrorMessage error={errors.razon_social}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Rut<span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={data.rut} onChange={(e)=>{ setData({ ...data,rut: e.target.value }) }} placeholder='Ingrese su Rut'/>
         <ErrorMessage error={errors.rut}/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Giro <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={data.giro} onChange={(e)=>{ setData({ ...data,giro: e.target.value }) }} placeholder='Ingrese el giro comercial'/>
          <ErrorMessage error={errors.giro}/>
        </div>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Estado del cliente</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={true}>Cliente activo</Radio>
            <Radio value={false}>Cliente no activo</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Dirección<span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={data.direccion}  onChange={(e)=>{ setData({ ...data, direccion: e.target.value }) }} placeholder='Ingrese la dirección'/>
          <ErrorMessage error={errors.direccion}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna<span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={data.comuna} onChange={(e)=>{setData({ ...data, comuna: e.target.value })}} placeholder='Ingrese la comuna'/>
          <ErrorMessage error={errors.comuna}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad<span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={data.ciudad} onChange={(e)=>{ setData({ ...data,ciudad: e.target.value }) }} placeholder='Ingrese la ciudad'/>
          <ErrorMessage error={errors.ciudad}/>
        </div>
      </div>
      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn 
        setStep={setStep} 
        value={2}
        handleClick={() => {
          if (handleValidation()) {
            setStep(2);
          }
        }}
        />
      </div>
    </div>
  )
}


const SecondStep = ({setStep,data,setData, contactos, setContactos}) => {
  
  const dd = [];
  const { subusuarios } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const [btnAddVisible , setBtnAddVisible]= useState(false);
  const [formVisible,setFormVisible]=useState(true)
  const contactInitialState = {
    nombre: '',
    celular: '',
    email: '',
    telefono: '',
    vendedor : null,
    vendedorId: null
  }
  const [ contactData,setContactData ] = useState(contactInitialState)
  const handleValidation = () => {
    const newErrors = newClientValidation(2, contactData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function AddData () {
    if (handleValidation()) {
      setContactos([...contactos, { ...contactData, id: uuidv4() }]);
      setContactData(contactInitialState);
      setBtnAddVisible(true);
      setFormVisible(false)
    }
  }
  
  function deleteRecord (recordId) {
    console.log(recordId)
    const updateTable = contactos.filter((item)=>item.id !== recordId)
    setContactos(updateTable)
  }

  useEffect(() => {
    console.log(subusuarios)
  }, [])
  
  function restructuredVendedores (arraySubUsuarios) {
    const updateData = arraySubUsuarios.map((item)=>{
      return {...item, value: item.id, label: item.nombre}
    })

    return updateData
  }


  const handleAddNewData = () =>{
    setBtnAddVisible(false);
    setFormVisible(true)
  }
  const cancelDataContact = ()=>{
    setBtnAddVisible(true);
    setFormVisible(false);
  }
  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Datos de contacto</h2>
        {btnAddVisible && !formVisible && (
          <> 
          <div>
            <div className="add-client">
              <AddMoreBtn label={'Agregar más datos'} HanldeClick={handleAddNewData}/>
            </div>
                <TableReusable
                columns={[
                  {
                    title: 'Nombre',
                    dataIndex: 'nombre',
                    key: 'nombre'
                  },
                  {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email'
                  },
                  {
                    title: 'N° de celular',
                    dataIndex: 'celular',
                    key: 'celular'
                  },
                  {
                    title: 'N° de teléfono',
                    dataIndex: 'telefono',
                    key: 'telefono'
                  },
                  {
                    title: 'Vendedor',
                    dataIndex: 'vendedor',
                    key: 'vendedor',
                    
                  },
                  {
                    title: '',
                    render: (text, record) => (
                      <FaRegTrashAlt onClick={()=>{deleteRecord(record.id)}}/>
                    )
                  }

                ]}
                dataSource={contactos}
              />
           </div>    
          <div className='row-space-btw' style={{marginTop:30}}>
              <FormerBtn setStep={setStep} value={1}/>
              <FollowingBtn 
              setStep={setStep}
              value={3}
              />
          </div> 
        </>
        )}  
      {!btnAddVisible && formVisible &&(
        <>
        {contactos != 0 && (
            <>
            <div className='row-space-btw'>
              <CancelBtn label={'Eliminar datos contacto'} HanldeClick={cancelDataContact}/>
            </div>
            </>
        )}
        <div className='form-grid'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Nombre <span style={{color:"red"}}>*</span></span>
            <input style={{padding:8}} type='text' value={contactData.nombre}  onChange={(e)=>{setContactData({...contactData,nombre:e.target.value})}} placeholder='Ingrese nombre del contacto'/>
            <ErrorMessage error={errors.nombre}/>
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>N° de celular <span style={{color:"red"}}>*</span> </span>
            <input style={{padding:8}} type='text' value={contactData.celular} onChange={(e)=>{setContactData({...contactData,celular:e.target.value})}} placeholder='Ingrese número de celular del contacto'/>
            <ErrorMessage error={errors.celular}/>
          </div>
        </div>

        <div className='form-grid'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Email <span style={{color:"red"}}>*</span></span>
            <input style={{padding:8}} type='text' value={contactData.email}  onChange={(e)=>{setContactData({...contactData,email:e.target.value})}} placeholder='Ingrese el email del contacto'/>
            <ErrorMessage error={errors.email}/>
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>N° de teléfono </span>
            <input style={{padding:8}} type='text' value={contactData.telefono} onChange={(e)=>{setContactData({...contactData,telefono:e.target.value})}} placeholder='Ingrese número de teléfono del contacto'/>
          </div>
        </div>

        <div className='form-grid'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
            <SelectComp
              placeholder={'Seleccionar vendedor'}
              HandleChange={(value,record)=>{
                console.log(`seleccionado ${value} ${record.label}`)
                setContactData({...contactData, vendedor: record.label, vendedorId: value})
              }}
              options={restructuredVendedores(subusuarios)}
              value={contactData.vendedorId ? contactData.vendedorId : null}
            />
            <ErrorMessage error={errors.vendedor}/>
          </div>
        </div>
        {/* Boton de agregar datos  */}
        <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <AddMoreBtn label={'Agregar datos de contacto'} HanldeClick={AddData}/>
        </div>
        </>
      )}  
      {/* <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn 
        setStep={setStep}
        value={3}
        handleClick={() => {
          if (handleValidation()) {
            setStep(3);
          }
        }}
         />
      </div> */}
    </div>
  )
}

const ThirdStep = ({setStep,data,setData,condicionDePago,setCondicionDePago}) => {
  const [errors,setErrors]=useState({})
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const [value, setValue] = useState(data.exension_de_impuestos);
  const onChange2 = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    setData({...data,exension_de_impuestos:e.target.value})
  };

  const handleValidation = () => {
    const newErrors = newClientValidation(3,data);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  return(
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <div className='column'>
          <h2 style={{fontSize:20}}>Datos de pago</h2>
        </div>
        <div className='row' style={{marginTop:20}}>
          <span>Agregar datos de pago</span>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago <span style={{color:"red"}}>*</span></span>
          <SelectComp
            placeholder={'Seleccionar condición de pago'}
            HandleChange={(value,record)=>{
              setData({...data,condicion_de_pago:value})
            }}
            options={[
              {
                value: '1',
                label: '10 días'
              },
              {
                value: '2',
                label: '15 días'
              },
              {
                value: '3',
                label: '30 días'
              },
              {
                value: '4',
                label: '45 días'
              },
              {
                value: '5',
                label: 'condición creada por el cliente'
              },
            ]}
            value={data.condicion_de_pago ? data.condicion_de_pago : null}
          />
          <ErrorMessage error={errors.condicion_de_pago}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Línea de crédito </span>
          <input value={data.linea_de_credito} onChange={(e)=>{setData({...data,linea_de_credito:e.target.value})}} style={{padding:8}} placeholder='Ej: 40000'/>
        </div>
      </div>
      

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Lista de precio <span style={{color:"red"}}>*</span></span>
          <SelectComp
            placeholder={'Seleccionar lista de precio'}
            HandleChange={(value,record)=>{
              console.log(`seleccionado ${value} ${record.label}`)
              //setContactData({...contactData, vendedor: record.label, vendedorId: value})
            }}
            options={[
              {
                //value es el id
                value: '1',
                label: 'Lista 1'
              },
              {
                //value es el id
                value: '2',
                label: 'Lista 2'
              },
              {
                //value es el id
                value: '3',
                label: 'Lista 3'
              },
            ]}
          />
        </div>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Exención de impuesto</span>
          <Radio.Group onChange={onChange2} value={value}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas</span>
          <input style={{padding:8}} value={data.notas} onChange={(e)=>{setData({...data,notas:e.target.value})}} placeholder='Ingrese las notas que considere necesarias'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Pie de página</span>
          <input value={data.pie_de_pagina} onChange={(e)=>{setData({...data,pie_de_pagina:e.target.value})}} style={{padding:8}} placeholder='Ingrese el  pie de página de proyecto'/>
        </div>
      </div>

      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={2}/>
        <FollowingBtn 
        setStep={setStep} 
        value={4}
        handleClick={() => {
          if (handleValidation()) {
            setStep(4);
          }
        }}
        />
      </div>      

    </div>
  )
}

const FourthStep = ({setStep,data,setData,puntosDeDespacho,setPuntosDeDespacho,contactos, setContactos,setErrorScreen,setLoadingScreen,clienteInitialState,setClose}) => {
  const { userLoggedData,clientes,setClientes } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const [btnAddVisible , setBtnAddVisible]= useState(false);
  const [formVisible,setFormVisible]=useState(true)
    useEffect(() => {
      console.log(userLoggedData)
    }, [])
  
  const puntoDeDespachiInitialState = {
    direccion: '',
    nombre_receptor: '',
    lugar: '',
    comuna: '',
    ciudad: '',
    datos_de_pago:true
  }

  const [ puntoDeDespacho,setPuntoDeDespacho ] = useState(puntoDeDespachiInitialState);
  const handleValidation = () => {
    const newErrors = newClientValidation(4, puntoDeDespacho);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function AddData () {
    if(handleValidation()){
      setPuntosDeDespacho([...puntosDeDespacho, {...puntoDeDespacho,id:uuidv4()}])
      setPuntoDeDespacho(puntoDeDespachiInitialState)
      setBtnAddVisible(true);
      setFormVisible(false)
    } 
  }
  function deleteRecord (recordId) {
    const updateTable = puntosDeDespacho.filter((item)=>item.id !== recordId)
    setPuntosDeDespacho(updateTable)
  }

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setPuntoDeDespacho({...puntoDeDespacho,datos_de_pago:checked})
  };

  function createClient () {
    //console.log({...data,contactos: contactos,puntos_de_despacho:puntosDeDespacho })
    const dataRestructured = {
      ...data,
      user: userLoggedData.data.user,
      linea_de_credito : data.linea_de_credito === null || data.linea_de_credito.trim().replace(/\s/g, "") === "" ? null : parseFloat(data.linea_de_credito),
      
    } 
    
    function restructureContactos ( contactArray ) {
      const updateArray = contactArray.map((item)=>{
        return {
          nombre: item.nombre,
          email: item.email,
          celular: item.celular,
          telefono: item.telefono,
          vendedorId : item.vendedorId
        }
      })
      return updateArray
    }

    console.log({
      ...dataRestructured,
      contactos: contactos.length === 0 ? contactos : restructureContactos(contactos),puntos_de_despacho:puntosDeDespacho
    
    })
    
    
    sendData(
      {
        ...dataRestructured,
        contactos: contactos.length === 0 ? contactos : restructureContactos(contactos),puntos_de_despacho:puntosDeDespacho
      
      }
    )
  
   console.log(
    {
      ...dataRestructured,
      contactos: contactos.length === 0 ? contactos : restructureContactos(contactos),puntos_de_despacho:puntosDeDespacho
    
    }
   )
    //console.log('crear cliente')
    /*
    setStep(5)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
    */
  }


  async function sendData (data) {
    setLoadingScreen(true)
    try{
      const response = await axios.post(
        `https://appify-black-side.vercel.app/clientes/cliente`,data
      );
      console.log('respuesta de la base de datos')
      console.log(response)
      console.log(typeof response.data.payload)
      console.log(response.data.payload)
      setClientes([...clientes,response.data.payload])
      //sin error
      setErrorScreen(false)
      ///data inicial
      setData(clienteInitialState)
      //modal de producto creado
      setLoadingScreen(false)
      setStep(5)

      setTimeout(() => {
        setStep(1)
        setClose ? setClose(false) : null
      }, 3000);
      
    }catch(err){
      console.log(err)
      
      setLoadingScreen(false)
      setErrorScreen(true)
      
    }
  }
  const handleAddNewData = () =>{
    setBtnAddVisible(false);
    setFormVisible(true)
  }
  const cancelDataContact = ()=>{
    setBtnAddVisible(true);
    setFormVisible(false);
  }
  return(
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Dirección de despacho</h2>
      {btnAddVisible && !formVisible && (
        <>
        <div>
          <AddMoreBtn label={'Agregar más datos'} HanldeClick={handleAddNewData}/>
        </div> 
        <TableReusable 
          columns={[
            {
              title: 'Punto',
              dataIndex: 'direccion',
              key: 'direccion'
            },
            {
              title: 'Atención a',
              dataIndex: 'nombre_receptor',
              key: 'nombre_receptor'
            },
            {
              title: 'Lugar',
              dataIndex: 'lugar',
              key: 'lugar'
            },
            {
              title: 'Comuna',
              dataIndex: 'comuna',
              key: 'comuna'
            },
            {
              title: 'Ciudad',
              dataIndex: 'ciudad',
              key: 'ciudad'
            },
            {
              title: 'Datos de pago',
              render: (text, record) => (
                <>
                  {
                    record.datos_de_pago === true ?
                    <FaRegCheckCircle/>
                    :
                    <FaRegTimesCircle/>
                  }
                
                </>
              )
            },
            {
              title: '',
              render: (text, record) => (
                <FaRegTrashAlt onClick={()=>{deleteRecord(record.id)}}/>
              )
            },
            
          ]}
          dataSource={puntosDeDespacho}
        />
        <div className='row-space-btw' style={{marginTop:30}}>
          <FormerBtn setStep={setStep} value={3}/>
          <CreateBtn label={'Crear cliente'} HanldeClick={createClient}/> 
        </div> 
        </>
      )}
      {!btnAddVisible && formVisible && (
        <>
        {puntosDeDespacho != 0 && (
          <>
            <div className='row-space-btw'>
              <CancelBtn label={'Eliminar dirección'} HanldeClick={cancelDataContact}/>
            </div>
          </>  
        )}
         <div className='container-item-flex-end' style={{marginTop:"40px"}}>
        <div className='row'>
          <span>Agregar datos de pago</span>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </div>


      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Punto <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={puntoDeDespacho.direccion} onChange={(e)=>{setPuntoDeDespacho({...puntoDeDespacho,direccion:e.target.value})}}/>
          <ErrorMessage error={errors.direccion}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Atención a <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Introduce el nombre' value={puntoDeDespacho.nombre_receptor} onChange={(e)=>{setPuntoDeDespacho({...puntoDeDespacho,nombre_receptor: e.target.value})}}/>
          <ErrorMessage error={errors.nombre_receptor}/>
        </div>
      </div>


      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Lugar <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la dirección' value={puntoDeDespacho.lugar} onChange={(e)=>{setPuntoDeDespacho({...puntoDeDespacho,lugar: e.target.value})}}/>
          <ErrorMessage error={errors.lugar}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={puntoDeDespacho.comuna} onChange={(e)=>{setPuntoDeDespacho({...puntoDeDespacho,comuna:e.target.value})}} placeholder='Ingrese la comuna'/>
          <ErrorMessage error={errors.comuna}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={puntoDeDespacho.ciudad} onChange={(e)=>{setPuntoDeDespacho({...puntoDeDespacho,ciudad:e.target.value})}}  placeholder='Ingrese la ciudad'/>
          <ErrorMessage error={errors.ciudad}/>
        </div>
      </div>
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={3}/>
        <AddMoreBtn label={'Agregar dirección'} HanldeClick={AddData}/>
      </div>
      </>
      )}
    </div>
  )
}

const NuevoCliente = ({reference,setClose}) => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const navigate = useNavigate();

  const [ loadingScreen,setLoadingScreen ] = useState(false);

  const [ errorScreen,setErrorScreen ] = useState(false);
  

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión','/clients/dashboard')
    setMenuOptions(updateData)
  }, [])

  const [step,setStep] = useState(1)

  const clienteInitialState = {
    
    razon_social: "",
    rut: "",
    giro: "",
    direccion: null,
    comuna: null,
    ciudad: null,
    //bool
    suscripcion_a_encuestas	: null,
    activo: true, 
    //varchar
    condicion_de_pago: null,
    //float
    linea_de_credito: null,
    //bull
    exension_de_impuestos: null,
    notas: null,
    pie_de_pagina: null
  }

  const [ data,setData ] = useState(clienteInitialState)


  const [ contactos, setContactos ] = useState([]);


  const [ condicionDePago,setCondicionDePago ] = useState(null)

  const [ puntosDeDespacho,setPuntosDeDespacho ] = useState([])



  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep} data={data} setData={setData}/>
      
      case 2:
        return <SecondStep setStep={setStep} data={data} setData={setData} contactos={contactos} setContactos={setContactos}/>
      
      case 3:
        return <ThirdStep setStep={setStep} data={data} setData={setData} condicionDePago={condicionDePago} setCondicionDePago={setCondicionDePago}/>
        
      case 4:
        return <FourthStep setStep={setStep} data={data} setData={setData} puntosDeDespacho={puntosDeDespacho} setPuntosDeDespacho={setPuntosDeDespacho} contactos={contactos} setContactos={setContactos} setLoadingScreen={setLoadingScreen} setErrorScreen={setErrorScreen} clienteInitialState={clienteInitialState} setClose={setClose ? setClose : null}/>
     
    }
  }



  function tryAgain () {
    setData(clienteInitialState)
    setStep(1)
    setLoadingScreen(false)
    setErrorScreen(false)
  }

  function goBack () {
    navigate('/clients/dashboard')
  
  }
  
  return (
    <>
      {
        reference ?
        <></>
        :
        <div className='row' onClick={()=>{navigate('/clients/dashboard')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
          <FaArrowLeftLong/>
          <span>Volver a clientes</span>
        </div>
      }
      <h1>Agregar cliente</h1>
      {
        loadingScreen === true ?
        <>
          <Loader label={'Registrando cliente...'}/>

        </>
        :
        <>
          {
            errorScreen === true ?
            <>
              <ModalError 
                onCancel={tryAgain}
                errorMessage={'Error al crear el cliente'}
              />              
            </>
            :
            <>
              {
                step === 5 ?
                <Success message={'Cliente creado con éxito!'}
                />
                :
                <PrincipalCard>
                  <div className='step-container'>
                    <div className='step-container-item'>
                      <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
                      <div className='step-item-dot-cta' style={{left:-20}}>1</div>
                      <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>
        
                    </div>
                    <div className='step-container-item'>
                      <div className={step >= 3 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
                      <div className={step >= 3 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>3</div>
                    </div>
                    <div className='step-container-item'>
                      <div className={step >= 4 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
                      <div className={step >= 4 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>4</div>
                    </div>
                  </div>
                  <form className='step-form'>
                    {formSetupSteps()}
                  </form>
                </PrincipalCard>
              }
            </>
          }
        </>
      }
    
    </>
  )
}

export default NuevoCliente