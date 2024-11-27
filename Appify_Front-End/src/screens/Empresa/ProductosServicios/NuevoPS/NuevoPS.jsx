import React, { useContext, useEffect, useState } from 'react'
import SelectComponent from '../../../../components/Select/SelectComponent'
import axios from 'axios';
import { FaArrowLeftLong, FaRegTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { Button, Radio, Spin, Switch, Table } from 'antd';
import { MdErrorOutline, MdImage } from 'react-icons/md';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { LoadingOutlined } from '@ant-design/icons';
import { ImgInput } from '../../../../components/img/ImgInput';
import { AppContext } from '../../../../context/AppContext';

const FirstStep = ({setStep,data,setData}) =>{
  const [errors, setErrors] = useState({});
  const [imgLink, setImgLink]= useState('');//guardo el enlace
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setData({...data,iva:e.target.value})
  };


  const onChange2 = (checked) => {
    console.log(`switch to ${checked}`);
    setData({...data,activo:checked})

  };

  //Validacion step
  const validateStep = () => {
    let newErrors = {};
    if (!data.nombre.trim()) {
      newErrors.nombre = 'Debe ingresar el nombre del producto';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  return (
    <div className='principal-container-column'>

      <h2 style={{fontSize:20}}>Datos principales</h2>
      <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}>
        <div className='column' style={{width:"fit-content",boxSizing:"border-box",alignItems:"center",padding:20,gap:20}}>
            {/* <span style={{fontSize:20}}>Agregar imagen</span> */}
            <div className='profile-header-container'>              
              <div className='profile-img-container'>
              <ImgInput setImgLink={setImgLink} />
              </div>
            </div>
        </div>
      </div>

      <div className='form-grid'>
        <div className='row' style={{marginBottom:20}}>
          <span>Producto activo</span>
          <Switch value={data.activo} onChange={onChange2} />
        </div>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Nombre <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} type='text' placeholder='Ingrese el nombre del producto' value={data.nombre} onChange={(e)=>{setData({...data,nombre:e.target.value})}}/>
          {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio sugerido</span>
          <input style={{padding:8}} placeholder='Ingrese el precio' type='number' onChange={(e)=>{setData({...data,precio:e.target.value})}}/>
        </div>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>IVA</span>
          <Radio.Group onChange={onChange} value={data.iva}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
      </div>

      

      <div className='container-item-flex-end' style={{marginTop:30}}>
      <FollowingBtn
        setStep={setStep}
        value={2}
        handleClick={() => {
          if (validateStep()) {
            setStep(2);
          }
        }}
      />

      </div>

    </div>
  )
}

const SecondStep = ({setStep,data,setData}) => {
  const [value, setValue] = useState(null);
  
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setData({...data,exencion_valor:null,exencion_impuesto:e.target.value})
    setValue(e.target.value);
  };
  return (
    <div className='principal-container-column'>

      <div className='row' style={{alignItems:"center"}}>
        <h2 style={{fontSize:20}}>Campos avanzados</h2>
        <span>(Opcional)</span>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Código </span>
          <input style={{padding:8}} placeholder='Ingrese el código '
          value={data.codigo} onChange={(e)=>{setData({...data,codigo:e.target.value})}}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Código de barras</span>
          <input style={{padding:8}} placeholder='Ingrese el código ' 
          value={data.codigo_barra}
          onChange={(e)=>{setData({...data,codigo_barra:e.target.value})}}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Medidas</span>
          <input style={{padding:8}} placeholder='kg'
          value={data.unidad}
          onChange={(e)=>{setData({...data,unidad:e.target.value})}}
          />
        </div>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Costo estimado </span>
          <input style={{padding:8}} placeholder='Ingrese el código '
          value={data.costo}
          onChange={(e)=>{setData({...data,costo:e.target.value})}}
          />
        </div>
        
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Exención de impuestos</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>

        <div></div>
      </div>
      {
        value === true ?
        <div className='principal-grid grid-3-columns'>
          <div></div>
          
          <div className='column' style={{gap:5}}>
            <span className='form-label'></span>
            <input style={{padding:8}} type='number' placeholder='%'
            value={data.exencion_valor}
            onChange={(e)=>{setData({...data,exencion_valor:e.target.value})}}
            />
          </div>

          <div></div>
        </div>
        
        :
        <></>
      }

      
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn
          setStep={setStep}
          value={3}
        />
      </div>

    </div>
  )
}

const ThirdStep = ({setStep,data,setData,dataInitialState,setErrorScreen,setLoadingScreen,setClose}) => {

  const {  products,setProducts } = useContext(AppContext)
  //stock
  const [value, setValue] = useState(null);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setData({...data,manejo_stock:e.target.value,maximo_stock:null,minimo_stock:null,unidad_medida:''})
    setValue(e.target.value);
  };

  //disponible para venta
  const [value2, setValue2] = useState(null);
  const onChange2 = (e) => {
    console.log('radio checked', e.target.value);
    setData({...data,disponibilidad:e.target.value})
    setValue2(e.target.value);
  };

  //vincular producto/servicio (lista)
  const [value3, setValue3] = useState(null);
  const onChange3 = (e) => {
    setPslist([])
    console.log('radio checked', e.target.value);
    setValue3(e.target.value);
  };

  const [ pslist,setPslist ] = useState([])


  function addProductoServicio (){
    setPslist([...pslist,{
      key:1+pslist.length,
      producto: `producto ${1+pslist.length}`,
      cantidad: 1,
      precio: 2300,
      porcentaje: 0,
      neto: 2450,
      iva: 19,
      total: 2600
    }])
  }

  function createProduct () {
    const dataRestructured = {
      ...data,
      
      costo: data.costo === null || data.costo.trim().replace(/\s/g, "") === "" ? null : parseFloat(data.costo),

      exencion_valor: data.exencion_valor === null || data.exencion_valor.trim().replace(/\s/g, "") === "" ? null : parseFloat(data.exencion_valor),
      
      precio: data.precio === null || data.precio.trim().replace(/\s/g, "") === "" ? null : parseFloat(data.precio),
      
      
      maximo_stock: data.maximo_stock === null || data.maximo_stock.trim().replace(/\s/g, "") === "" ? null : parseInt(data.maximo_stock),

      minimo_stock: data.minimo_stock === null || data.minimo_stock.trim().replace(/\s/g, "") === "" ? null : parseInt(data.minimo_stock),

    }
    console.log(dataRestructured)
    console.log('enviando datos')
    sendData(dataRestructured)
  }


  async function sendData (data) {
    setLoadingScreen(true)
    try{
      const response = await axios.post(
        `https://appify-black-side.vercel.app/products/product`,
        data
      );
      console.log('Respuesta de neuvo producto')
      console.log(response)

      
      //setProducts([...products,response.data.payload])

      setProducts([...products,response.data.payload])

      //sin error
      setErrorScreen(false)

      ///data inicial
      setData(dataInitialState)
      //modal de producto creado
      setLoadingScreen(false)
      setStep(4)
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


  return (
    <div className='principal-container-column'>

      <div className='row' style={{alignItems:"center"}}>
        <h2 style={{fontSize:20}}>Campos avanzados II</h2>
        <span>(Opcional)</span>
      </div>
      
      <div className='principal-grid grid-3-columns'>

        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Stock</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>

        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Disponible para venta</span>
          <Radio.Group onChange={onChange2} value={value2}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>

        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Vincular producto/servicio</span>
          <Radio.Group onChange={onChange3} value={value3}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>

      </div>
      <div className='principal-grid grid-3-columns'>
        {
          value === true ?
          <div className='column' style={{gap:20}}>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Mínimo</span>
              <input style={{padding:8}} type='number' placeholder='Ingrese el mínimo' value={data.minimo_stock} onChange={(e)=>{setData({...data,minimo_stock:e.target.value})}}/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Máximo</span>
              <input style={{padding:8}} placeholder='Ingrese el máximo' type='number' value={data.maximo_stock} onChange={(e)=>{setData({...data,maximo_stock: e.target.value})}}/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Proveedor</span>
              <SelectComponent/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Unidad de medida</span>
              <input style={{padding:8}} placeholder='Kg' value={data.unidad_medida} onChange={(e)=>{setData({...data,unidad_medida:e.target.value})}}/>
            </div>
            <div className='column' style={{gap:25}}>
              <span className='form-label'>Cantidad</span>
              <div className='principal-grid grid-3-columns' style={{fontSize:20}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>+</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>1</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>-</div>
              </div>
            </div>
            
          </div>
          :
          <div></div>
        }

        <div></div>
        {
          value3 === true ?
          <div className='column' style={{gap:20}}>
            {
              pslist.length === 0 ?
              <></>
              :
              <Table 
                columns={[
                  {
                    title: 'Producto/Servicio',
                    dataIndex: 'producto',
                    key: 'producto',
                  },
                  {
                    title: 'Cantidad',
                    dataIndex: 'cantidad',
                    key: 'cantidad',
                  },
                  {
                    title: '',
                    render: (text, record) => (
                      <FaRegTrashCan/>
                    ),
                  },
                ]}
                dataSource={pslist}
              />
            }
            <div className='container-item-flex-end'>
              <AddMoreBtn label={'Vincular otro'} HanldeClick={addProductoServicio}/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Producto/Servicio</span>
              <SelectComponent/>
            </div>
            <div className='column' style={{gap:25}}>
              <span className='form-label'>Cantidad</span>
              <div className='principal-grid grid-3-columns' style={{fontSize:20}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>+</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>1</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>-</div>
              </div>
            </div>
          </div>
          :
          <div></div>
        }
      </div>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas </span>
          <textarea style={{height:100}} value={data.notas} onChange={(e)=>{setData({...data,notas:e.target.value})}}/>
        </div>
        
      </div>

      
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={2}/>
        <CreateBtn label={'Crear producto'} HanldeClick={createProduct}/>
      </div>      


    </div>
  )
}

const NuevoPS = ({reference,setClose}) => {
  
  const { userLoggedData } = useContext(AppContext)

  const [ loadingScreen,setLoadingScreen ] = useState(false);

  const [ errorScreen,setErrorScreen ] = useState(false);
  

  /*
    {
      "user": "usuario1",
      "nombre": "Producto Ejemplo",
      "moneda": 1,
      "precio": 99.99,
      "imagen": "https://ejemplo.com/imagen.jpg",
      "iva": true,
      "activo": true,
      "codigo": "PROD123",
      "codigo_barra": "1234567890123",
      "unidad": "pieza",
      "costo": 50.00,
      "exencion_impuesto": false,
      "exencion_valor": null,
      "disponibilidad": true,
      "manejo_stock": true,
      "minimo_stock": 10,
      "maximo_stock": 100,
      "unidad_medida": "kg",
      "cantidad": 20,
      "notas": "Este es un producto de ejemplo."
    }
    
  */

  const dataInitialState = {
    user: userLoggedData.data.user,
    nombre: '',
    moneda: 1,
    precio: null,
    imagen: 'url',
    iva: false,
    activo: true,
    codigo:'',
    codigo_barra:'',
    unidad:'',
    costo: null,
    exencion_impuesto: false,
    exencion_valor: null,
    disponibilidad: false,
    manejo_stock:false,
    //numero
    maximo_stock:null,
    //numero
    minimo_stock:null,
    unidad_medida:'unidad',
    cantidad:null,
    notas:'',
    
  }

  const [ data,setData ] = useState(dataInitialState)

  const navigate = useNavigate();

  const [ step,setStep ] = useState(1)

  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep} data={data} setData={setData}/>
      
      case 2:
        return <SecondStep setStep={setStep} data={data} setData={setData}/>
      
      case 3:
        return <ThirdStep setStep={setStep} data={data} setData={setData} dataInitialState={dataInitialState} setErrorScreen={setErrorScreen} setLoadingScreen={setLoadingScreen} setClose={setClose ? setClose : null}/>
    }
  }
  

  function tryAgain () {
    setData(dataInitialState)
    setStep(1)
    setLoadingScreen(false)
    setErrorScreen(false)
      
  }

  function goBack () {
    navigate('/products')
  
  }

  return (
    <>
      {
        reference ?
        <></>
        :
        <div className='row' onClick={()=>{goBack()}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
          <FaArrowLeftLong/>
          <span>Volver a productos</span>
        </div>
      }
      <h1>Nuevo producto</h1>
      {
        loadingScreen === true ?
        <>
          <div style={{height:"80%",width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:85}}>
            <h2>Creando producto...</h2>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 90,
                  }}
                  spin
                />
              }
            />
          </div>

        </>
        :
        <>
          {
            errorScreen === true ?
            <>
              <div style={{height:"80%",width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:30}}>
                <MdErrorOutline style={{fontSize:100, color:"#EA0234"}}/>
                <h2>¡Error al crear el producto!</h2>
                <span>Vuelve a intentarlo más tarde</span>
                <div className='row'>
                  <Button onClick={()=>{goBack()}} type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
                    <span>Aceptar</span>
                  </Button>
                  <Button onClick={()=>{tryAgain()}} type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
                    <span>Volver a intentar</span>
                  </Button>
                </div>
              </div>

            </>
            :
            <>
              {
                step === 4 ?
                <Success message={'Producto creado con exito!'}/>
                :
                <PrincipalCard>
                  <div className='step-container step-container-3-steps'>
                    <div className='step-container-item'>
                      <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
                      <div className='step-item-dot-cta' style={{left:-20}}>1</div>
                      <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>
        
                    </div>
                    <div className='step-container-item'>
                      <div className={step >= 3 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
                      <div className={step >= 3 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>3</div>
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

export default NuevoPS