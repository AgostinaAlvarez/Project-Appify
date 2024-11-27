import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import IsologoLogin from '../../assets/isologo_login.svg';
import CodigoVerificacion from '../../components/InputCode/CodigoVerificacion';
import axios from 'axios';
import { display } from '@mui/system';
import { DatePicker } from 'antd';
import { Loader } from '../../components/Loader/Loader';
import LogoLogin from '../../assets/assets/logo_login.svg';
import { getAllProducts, getAllProviders, getAllUsers, getClientes, getOCs, getOTs, getProyectos, getVentas } from '../../utils/api/Login/LoginFunction';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { TermsAndCondition } from '../terms/Terms';
const FirstStep = ({setStep}) =>{
  const [ loading,setLoading ] = useState(false);
  const [ data,setData ] = useState({email:''})

  function sendCode (e) {
    e.preventDefault()
    console.log(data)
    sendEmail()
  }


  async function sendEmail () {
    setLoading(true)
    try{
      const response = await axios.post('https://appify-black-side.vercel.app/user/send-mail',data)
      console.log(response)
    }catch (err){
      console.log(err)
    }finally{
      localStorage.setItem('code_screen',2)
      localStorage.setItem('user_email',data.email)
      setStep(2)
      setLoading(false)
    }
  }


  return(
    <>
      
      <div className='login-form-container'>
        <div className='login-isologo-container'>
          <img src={IsologoLogin} alt='isologoAppify' className='login-isologo' />
          <h1 className='login-title'>Registrarse</h1>
        </div>
        <form className='login-form' onSubmit={sendCode}>
          <div className='label-email'>
              <label htmlFor="email" className='email'>Email</label>
              <input
              name="email"
              placeholder="Ingrese su email"
              value={data.email}
              onChange={(e)=>{setData({email:e.target.value})}}
              //value={formData.email}
              //onChange={handleChange}
              />
          </div>
          <div className='label-email'>
              <label htmlFor="email" className='email'>Confirme su email</label>
              <input
              name="email"
              placeholder="Confirme su email"
              //value={formData.email}
              //onChange={handleChange}
              />
          </div>

          <div>
            <button 
            type="submit" 
            className='login-button'>Enviar código</button>
          </div>
        </form>
      </div>

      {
        loading === true ?
        <Loader label={'Enviando código'}/>
        :
        <></>
      }

    </>
  )
}


const SecondStep = ({setStep}) =>{
  const { setSignUpCode } = useContext(AppContext);

  //codigos hardcodeados
  const codigos = [
    "S31D",
    "M14C",
    "P03L",
    "A86M",
    "C8HY",
    "L85S",
    "M21S",
    "M20F",
    "Q20G",
    "P20S",
  ]


  function cancel() {
    localStorage.clear()
    setSignUpCode(false)
  }

  function confirmCode (e){
    e.preventDefault()
    //localStorage.setItem('code_screen', 3);
    //setStep(3)
  }

  /*---------------------*/

  const [inputs, setInputs] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value.slice(0, 1);

    setInputs(newInputs);

    // Mover el enfoque automáticamente
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !inputs[index]) {
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        inputRefs.current[previousIndex].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 4).split('');
    pasteData.forEach((value, i) => {
      handleChange(i, value);
      if (i < 3) inputRefs.current[i + 1].focus();
    });
  };

  const inputStyle = {
    width: '60px', 
    height: '60px',
    marginRight: '10px',
    fontSize: '25px',
    textAlign: 'center',
    border: '2px solid #ccc',
    borderRadius: '8px'
  };

  /*--------------*/

  function verCodigo (e){
    e.preventDefault()
    //console.log(inputs)
    //console.log("Código ingresado:", inputs.join(""));
    let codeConfirm = false;
    const code = inputs.join("").toUpperCase();

    codigos.forEach(element => {
      if(element === code){
        codeConfirm = true;
      }
    });

    if(codeConfirm === true){
      console.log('confirmado')
      localStorage.setItem('code_screen', 3);
      setStep(3)
    }else{
      alert('codigo incorrecto')
    }

  }

  return(
    <>
      <div className='login-form-container'>
        <div className='login-isologo-container'>
          <img src={IsologoLogin} alt='isologoAppify' className='login-isologo' />
          <h1 className='login-title'>Confirmar código</h1>
        </div>
        <form className='login-form' onSubmit={verCodigo}>
          <div style={{width:"100%",boxSizing:"border-box",textAlign:"center",fontSize:12,padding:"0px 10px"}}>
            Te hemos enviado un código a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y tu carpeta de spam si no lo ves.
          </div>
          <div style={{width:"100%",boxSizing:"border-box",display:"flex", alignItems:"center",justifyContent:"center",gap:10, margin:"30px 0px"}}>
            {/*componente imputs*/}
            <div style={{ maxWidth: '300px', margin: 'auto', display: 'flex', justifyContent: 'center' }} onPaste={handlePaste}>
              {inputs.map((value, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  name={`input-${index}`}
                  type="tel"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  style={inputStyle}
                />
              ))}
            </div>
          </div>

          <div>
            <button 
            type="submit" 
            className='login-button'>Confirmar código</button>
          </div>

          <div className='login-sign-up' 
          onClick={cancel} 
          >Cancelar</div>
        </form>
      </div>

      
    </>
  )
}

const ThirdStep = ({setStep}) =>{


  const { setUserLoggedData,setLogged,setProyectos,setClientes,setOrdenesDeTrabajo,setSubusuarios,setProducts,setProveedores,setOrdenesDeCompra,setSignUpCode,setVentas,setLoadingPrivateRoutes } = useContext(AppContext)
  const navigate = useNavigate()

  const [showPassword, setShowPassword]= useState('');
  const [showConfirmPassword, setShowConfirmPassword]=useState('')
  const [ loading,setLoading ] = useState(false);
  const [errors,setErrors]=useState({});
  const [correctPass , setCorrectPass]=useState(false)
  const dataInitialState = {
      nombre: null,
      apellido: null,
      email: null,
      celular: null,
      fecha_de_nacimiento: "1997/02/20",
      password: null,
      passwordConfirm: null
  }
  const [ data,setData ] = useState(dataInitialState)
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    getEmailData()
  }, [])
  
  function getEmailData () {
    const email = localStorage.getItem('user_email')
    console.log(email)
    console.log({...data,email:email})
    setData({...data,email:email})
  }
  function disabledDate(current) {
    return current && current.valueOf() > Date.now();
  }
  
  const validatePass = (password)=>{
    const newErrors = {};
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      newErrors.passwordSpecialChar = '*La contraseña debe contener al menos un carácter especial';
    }

    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
      newErrors.passwordUppercase = '*La contraseña debe contener al menos una mayúscula';
    }

    setErrors(newErrors);
  }
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setData({ ...data, password: newPassword });
    validatePass(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setData({ ...data, passwordConfirm: confirmPassword });
    if (data.password !== confirmPassword) {
      setCorrectPass(true);
    } else {
      setCorrectPass(false);
    }
  };
  function registrarUsuario (e) {
    e.preventDefault()

    const newErrors = {};
    if (data.nombre == null) {
      newErrors.nombre = '*El campo nombre debe estar completo';
    }
    if (data.apellido == null) {
      newErrors.apellido = '*El campo apellido debe estar completo';
    }
    if (!data.password) {
      newErrors.password = '*La contraseña es requerida';
    }
    if (!data.passwordConfirm) {
      newErrors.passwordConfirm = '*Debe confirmar la contraseña';
    }
    if (data.password !== data.passwordConfirm) {
      newErrors.passwordMismatch = '*Las contraseñas no coinciden';
      setCorrectPass(true)
    }
    if(Object.keys(newErrors).length===0){
      sendData(data)
    }else {
      setErrors(newErrors);
    }
  }

  async function sendData (data) {
    console.log('inicando')
     setLoading(true)
      try{
      const response = await axios.post('https://appify-black-side.vercel.app/user/register',data)
      console.log('usuario creado')
      console.log(response)
      //setLoading(false)

      const userData = {
        data: response.data.payload.result[1],
        email: data.email,
        id: response.data.payload.result[0].id,
        permisos: "all",
        userType: "superusuario"
      }

      console.log('data del usuariooo')
      console.log(response.data.payload.result[0].id, userData)
      console.log(userData)
      setTkn(userData)
      getLoginData(response.data.payload.result[0].id, userData)

    }catch (err){
      console.log('error')
      console.log(err)
    }finally{
      console.log('peticion finalizada')
    }


  }


  async function setTkn (data){
    try{
      const response = await axios.post(`https://appify-black-side.vercel.app/user/token`,data)
      console.log('token seteado')
      Cookies.set('tkn', response.data.payload)
    }catch(err){
      console.log(err)
    }
  }


  async function getLoginData (userId,data){
    //Esta funcion es para hacer todas las llamsdas correspondoentes
    //proyectos
    setUserLoggedData(data)
    getProyectos(userId,setProyectos)
    getClientes(userId,setClientes)
    getOTs(userId,setOrdenesDeTrabajo)
    getAllUsers(userId,setSubusuarios)
    getAllProviders(userId,setProveedores)
    //getAllProductos(userId)
    getAllProducts(userId,setProducts)
    getOCs(userId,setOrdenesDeCompra)
    getVentas(userId,setVentas)
    
    localStorage.clear()
    setLogged(true)
    navigate('/')
    setTimeout(() => {
      setLoadingPrivateRoutes(false)
      setLoading(false)
    }, 3000);

  }

  return(
    <>
    <div className='container-register-form'>
      <div className='login-register-container'>
      <div className='login-isologo-container'>
          <img src={IsologoLogin} alt='isologoAppify' className='login-isologo' />
          <h1 className='login-title'>Registrarse</h1>
        </div>
        <form onSubmit={registrarUsuario} className='login-form-register'>
          <div className='columnRegister'>
              <div className='labelR label-register-name'>
                <label className='nombre'>Nombre <span className='span-required'>*</span></label>
                <input  name='nombre' value={data.nombre} onChange={((e)=>{
                  if( e.target.value.trim().replace(/\s/g, "") === ""){
                    setData({...data,nombre:null})
                  }else{
                    setData({...data,nombre:e.target.value})
                  }
                })} 
                placeholder='Ingrese su nombre'
                
                />
             {errors.nombre && <p className='errorInput'>{errors.nombre}</p>}
              </div>
              <div className='labelR label-register-apellido'>
                <label className='apellido'>Apellido <span className='span-required'>*</span></label>
                <input name='apellido' value={data.apellido}  onChange={((e)=>{
                  if( e.target.value.trim().replace(/\s/g, "") === ""){
                    setData({...data,apellido:null})
                  }else{
                    setData({...data,apellido:e.target.value})
                  }
                })} placeholder='Ingrese su apellido' 
                />
                {errors.apellido && <p className='errorInput'>{errors.apellido}</p>}
              </div>
          </div>
          <div className='columnRegister'>
            <div className='labelR label-register-numero'>
              <label className='numero'>Número</label>
              <input name="numero"value={data.celular} onChange={((e)=>{
                if( e.target.value.trim().replace(/\s/g, "") === ""){
                  setData({...data,celular:null})
                }else{
                  setData({...data,celular:e.target.value})
                }
              })}  placeholder='Ingrese su número'/>
            </div>
            
            <div className='labelR label-register-date'>
              <label className='nacimiento'>Fecha de nacimiento <span className='span-required'>*</span></label>
              <DatePicker picker='date' className='picker' placeholder="Seleccione su fecha" disabledDate={disabledDate}/>
            </div>
          </div>
          <div className='columnRegisterPass'>
            <div className='labelR label-register-pass'>
            <label className='passRegister'>Contraseña <span className='span-required'>*</span></label>
            <div className='input-password'>
            <input 
            name="passRegister"
            type={showPassword ? 'text' : 'password'}
            placeholder='Ingrese su contraseña'

             value={data.password} 
            //  onChange={((e)=>{
            //   if( e.target.value.trim().replace(/\s/g, "") === ""){
            //     setData({...data,password:null})
            //   }else{
            //     setData({...data,password:e.target.value})
            //   }
            // })}  
            onChange={handlePasswordChange}
            />
              <label 
                htmlFor="toggle-password"
                className="toggle-password"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </label>
            </div>
            {errors.password && <p className='errorInput'>{errors.password}</p>}
            <div className={`req-pass ${!errors.passwordSpecialChar && !errors.passwordUppercase ? 'valid' : 'invalid'}`}>
              <p>La contraseña debe contener un carcater especial</p>
              <p>La contraseña debe contener una mayúscula</p>
            </div>
            </div>
          <div className='labelR label-register-pass2'>
          <div className='labelR label-register-pass'>
            <label className='passRegister2'>Confirmar contraseña <span className='span-required'>*</span></label>
            <div className='input-password'>
              <input 
              name="passRegister2" 
              type={showConfirmPassword ? 'text' : 'password'}
            //   value={data.passwordConfirm} onChange={((e)=>{
            //   if( e.target.value.trim().replace(/\s/g, "") === ""){
            //     setData({...data,passwordConfirm:null})
            //   }else{
            //     setData({...data,passwordConfirm:e.target.value})
            //   }
            // })} 
            onChange={handleConfirmPasswordChange}
            placeholder='Ingrese nuevamente su contraseña'
            />
            <label 
                htmlFor="toggle-password"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </label>
            </div>
            {correctPass && errors.passwordConfirm && <p className='errorInput'>{errors.passwordConfirm}</p>}
            </div>
          </div>
          {errors.passwordMismatch && <p className='errorInput'>{errors.passwordMismatch}</p>}
          </div>
         
          <button type='submit' className='btn-register-user login-button'>Registrar usuario</button>
        </form>
      </div>
    </div>
      
      {
        loading === true ?
        <Loader label={'Creando perfil'}/>
        :
        <></>
      }

      
    </>

  )
}

const FourthStep = ({setStep}) =>{
  return(
    <>
      <h1>Daashboard</h1>
    </>

  )
}

const SuscribeStep = ({setStep}) =>{
  console.log('suscribe step')
 return(
  <>
     <div className='suscribe-container'>
    <div className='login-isologo-container isologo-suscribe'>
      <img src={IsologoLogin} alt='isologoAppify' className='login-isologo' />
      <h1 className='login-title'>Suscríbete ahora</h1>
    </div>
    <div className=' plan-container'>
      <div className='gestion-container'>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="29" viewBox="0 0 25 29" fill="none">
          <path d="M2.21436 13.3473L22.7501 2.67383" stroke="#006F76" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.9106 1.02051L22.7499 2.67357L21.3214 7.06132" stroke="#006F76" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23.6606 27.5512H19.1963V13.2655C19.1963 12.9949 19.2904 12.7353 19.4577 12.544C19.6252 12.3526 19.8524 12.2451 20.0891 12.2451H22.7677C23.0045 12.2451 23.2316 12.3526 23.3991 12.544C23.5665 12.7353 23.6606 12.9949 23.6606 13.2655V27.5512Z" stroke="#006F76" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.7324 27.551H10.2681V16.3266C10.2681 16.0559 10.3621 15.7964 10.5296 15.605C10.697 15.4137 10.9241 15.3062 11.1609 15.3062H13.8395C14.0763 15.3062 14.3034 15.4137 14.4708 15.605C14.6383 15.7964 14.7324 16.0559 14.7324 16.3266V27.551Z" stroke="#006F76" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.80364 27.5513H1.33936V19.3881C1.33936 19.1175 1.43343 18.8579 1.60087 18.6666C1.76831 18.4752 1.99541 18.3677 2.23221 18.3677H4.91078C5.14759 18.3677 5.37469 18.4752 5.54212 18.6666C5.70957 18.8579 5.80364 19.1175 5.80364 19.3881V27.5513Z" stroke="#006F76" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      <p>Gestión de proyectos y clientes</p>
      </div>
      <div className='operaciones-container'>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="34" viewBox="0 0 25 34" fill="none">
            <path d="M18.7486 0.629654C19.3586 0.846039 19.776 1.39973 19.8466 2.07434L19.8915 2.46256H20.8611C22.2736 2.46256 22.9093 2.64712 23.699 3.27718C24.3925 3.83724 24.8355 4.65186 24.9511 5.6065C24.9896 5.93108 25.0089 10.6979 24.996 18.2459L24.9768 30.3698L24.8291 30.7453C24.4182 31.8272 23.6284 32.5973 22.5818 32.9601L22.1516 33.1064H12.4884H2.82514L2.40779 32.9601C1.297 32.5591 0.50082 31.7445 0.141256 30.6244L0 30.1789V17.7368V5.29465L0.147678 4.86825C0.513662 3.82451 1.30984 3.02898 2.3821 2.64712C2.70314 2.5262 2.94071 2.50074 3.92951 2.47529L5.10451 2.44983V2.11889C5.11093 1.54611 5.44481 1.00515 5.97131 0.725117L6.22814 0.585102L12.3921 0.572376C16.6619 0.56601 18.6138 0.585102 18.7486 0.629654ZM7.03074 3.4172V4.37184H12.4884H17.946V3.4172V2.46256H12.4884H7.03074V3.4172ZM19.853 4.75369C19.7824 5.37739 19.4485 5.8738 18.9156 6.13473C18.6973 6.24293 18.3056 6.24929 12.5975 6.26838C8.52036 6.27475 6.42076 6.26202 6.26025 6.21747C5.62459 6.04563 5.10451 5.37102 5.10451 4.70278V4.35911L4.05792 4.38456C3.04986 4.40366 3.00492 4.41002 2.70956 4.58186C2.36284 4.78551 2.05465 5.16737 1.95833 5.52377C1.91339 5.67651 1.90055 9.86419 1.90697 17.8768C1.92623 29.3834 1.93265 30.0007 2.0418 30.2425C2.20232 30.5926 2.51052 30.898 2.88935 31.0762L3.21038 31.229L12.4884 31.2226C20.0713 31.2226 21.8113 31.2099 22.0104 31.1399C22.3635 31.0126 22.6717 30.7517 22.8708 30.4144L23.0505 30.1152V17.8959C23.0505 7.70671 23.0377 5.63832 22.9607 5.4283C22.8387 5.08463 22.4663 4.69641 22.0874 4.52458C21.7985 4.38456 21.6765 4.37184 20.829 4.37184H19.8915L19.853 4.75369Z" fill="#006F76"/>
            <path d="M16.0517 9.57766C16.1545 9.64767 16.7323 10.195 17.3359 10.7932C17.933 11.3915 18.4595 11.8815 18.4916 11.8815C18.5301 11.8815 18.6907 11.7479 18.8448 11.5888C19.3135 11.1051 19.6345 11.0223 20.1097 11.2515C20.5719 11.4742 20.7582 11.9961 20.5527 12.4734C20.5077 12.588 20.1225 13.008 19.7051 13.4217C19.0823 14.0263 18.8961 14.1663 18.6971 14.2045C18.1898 14.2999 18.0935 14.2236 16.3278 12.4734C14.9024 11.0542 14.6777 10.7996 14.6392 10.5896C14.575 10.265 14.7483 9.82587 15.0051 9.6413C15.2877 9.44401 15.7949 9.41856 16.0517 9.57766Z" fill="#006F76"/>
            <path d="M12.636 11.5125C12.8864 11.6589 13.1304 12.0598 13.1304 12.3271C13.1304 12.6071 12.8864 12.9953 12.6231 13.1417L12.3663 13.2817L8.67436 13.269C5.05947 13.2499 4.98242 13.2499 4.80906 13.1163C4.48802 12.8808 4.37245 12.6708 4.37245 12.3271C4.37245 11.9834 4.48802 11.7734 4.80906 11.5379C4.98242 11.4043 5.05947 11.4043 8.6872 11.3916L12.392 11.3725L12.636 11.5125Z" fill="#006F76"/>
            <path d="M15.821 16.3368C15.9879 16.375 16.3218 16.6677 17.2464 17.5842L18.4535 18.7743L18.8388 18.4179C19.2561 18.036 19.5065 17.9469 19.8982 18.0169C20.5081 18.1315 20.8163 18.8061 20.521 19.3789C20.4568 19.5062 20.0844 19.9199 19.6991 20.2953C18.9094 21.0527 18.6911 21.1609 18.2352 21.04C18.0233 20.9827 17.6959 20.6963 16.3924 19.4043C15.5192 18.5452 14.7551 17.7369 14.6974 17.6224C14.3699 16.9414 15.0505 16.1649 15.821 16.3368Z" fill="#006F76"/>
            <path d="M12.636 17.8767C12.8864 18.0231 13.1304 18.4241 13.1304 18.6914C13.1304 18.9714 12.8864 19.3596 12.6231 19.506L12.3663 19.646L8.67436 19.6333C5.05947 19.6142 4.98242 19.6142 4.80906 19.4805C4.48802 19.245 4.37245 19.035 4.37245 18.6914C4.37245 18.3477 4.48802 18.1377 4.80906 17.9022C4.98242 17.7685 5.05947 17.7685 8.6872 17.7558L12.392 17.7367L12.636 17.8767Z" fill="#006F76"/>
            <path d="M15.821 22.701C15.9879 22.7392 16.3218 23.032 17.2464 23.9484L18.4535 25.1385L18.8388 24.7821C19.2561 24.4003 19.5065 24.3112 19.8982 24.3812C20.5081 24.4958 20.8163 25.1704 20.521 25.7432C20.4568 25.8704 20.0844 26.2841 19.6991 26.6596C18.9094 27.4169 18.6911 27.5251 18.2352 27.4042C18.0233 27.3469 17.6959 27.0606 16.3924 25.7686C15.5192 24.9094 14.7551 24.1012 14.6974 23.9866C14.3699 23.3056 15.0505 22.5292 15.821 22.701Z" fill="#006F76"/>
            <path d="M12.636 24.241C12.8864 24.3874 13.1304 24.7883 13.1304 25.0556C13.1304 25.3356 12.8864 25.7239 12.6231 25.8702C12.3727 26.0102 12.3599 26.0102 8.73215 26.0102C4.70633 26.0102 4.80906 26.0166 4.50728 25.6029C4.30824 25.3293 4.30824 24.7819 4.50728 24.5083C4.80906 24.0882 4.70633 24.101 8.74499 24.101C12.3727 24.101 12.392 24.1073 12.636 24.241Z" fill="#006F76"/>
          </svg>
          <p>Creación de ordenes  de trabajo y de compra</p>
      </div>
      <div className='finanzas-container'>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 1.93353C0 0.976234 0.776039 0.200195 1.73333 0.200195H24.2666C25.2239 0.200195 26 0.976234 26 1.93353V14.0668C26 15.0241 25.2239 15.8002 24.2666 15.8002H1.73333C0.776039 15.8002 0 15.0241 0 14.0668V1.93353ZM24.2666 1.93353H1.73333V14.0668H24.2666V1.93353Z" fill="#006F76"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.9998 5.40032C11.5639 5.40032 10.3998 6.56438 10.3998 8.00032C10.3998 9.43626 11.5639 10.6003 12.9998 10.6003C14.4358 10.6003 15.5998 9.43626 15.5998 8.00032C15.5998 6.56438 14.4358 5.40032 12.9998 5.40032ZM8.6665 8.00032C8.6665 5.60709 10.6066 3.66699 12.9998 3.66699C15.3931 3.66699 17.3332 5.60709 17.3332 8.00032C17.3332 10.3936 15.3931 12.3337 12.9998 12.3337C10.6066 12.3337 8.6665 10.3936 8.6665 8.00032Z" fill="#006F76"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M17.5479 0.49617C17.8631 0.135951 18.4107 0.0994497 18.7709 0.414641L25.7042 6.4813C26.0644 6.79649 26.1009 7.34402 25.7857 7.70424C25.4705 8.06446 24.923 8.10096 24.5628 7.78577L17.6295 1.71911C17.2693 1.40391 17.2328 0.856388 17.5479 0.49617Z" fill="#006F76"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M25.7857 8.29597C26.1009 8.65619 26.0644 9.20372 25.7042 9.51891L18.7709 15.5856C18.4107 15.9008 17.8631 15.8643 17.5479 15.504C17.2328 15.1438 17.2693 14.5963 17.6295 14.2811L24.5628 8.21445C24.923 7.89925 25.4705 7.93576 25.7857 8.29597Z" fill="#006F76"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.45224 0.49617C8.76743 0.856388 8.73093 1.40391 8.37071 1.71911L1.43738 7.78577C1.07716 8.10096 0.529636 8.06446 0.214445 7.70424C-0.100746 7.34402 -0.0642438 6.79649 0.295974 6.4813L7.2293 0.414641C7.58952 0.0994497 8.13705 0.135951 8.45224 0.49617Z" fill="#006F76"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0.214445 8.29597C0.529636 7.93576 1.07716 7.89925 1.43738 8.21445L8.37071 14.2811C8.73093 14.5963 8.76743 15.1438 8.45224 15.504C8.13705 15.8643 7.58952 15.9008 7.2293 15.5856L0.295974 9.51891C-0.0642438 9.20372 -0.100746 8.65619 0.214445 8.29597Z" fill="#006F76"/>
          </svg>
          <p>Administración de pagos, compras , cuentas y facturación</p>
      </div>
      <div className='empresa-container'>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 6.70652C0 5.60196 0.895419 4.70654 1.99997 4.70654H23.9997C25.1042 4.70654 25.9997 5.60196 25.9997 6.70652V22.7063C25.9997 23.8109 25.1042 24.7063 23.9997 24.7063H1.99997C0.895419 24.7063 0 23.8109 0 22.7063V6.70652ZM23.9997 6.70652H1.99997V22.7063H23.9997V6.70652Z" fill="#006F76"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.87867 1.58521C8.44127 1.02261 9.20432 0.706543 9.99996 0.706543H15.9999C16.7955 0.706543 17.5586 1.02261 18.1212 1.58521C18.6838 2.14781 18.9998 2.91087 18.9998 3.7065V5.70648C18.9998 6.25876 18.5521 6.70647 17.9999 6.70647C17.4476 6.70647 16.9999 6.25876 16.9999 5.70648V3.7065C16.9999 3.44129 16.8945 3.18694 16.707 2.99941C16.5194 2.81187 16.2651 2.70652 15.9999 2.70652H9.99996C9.73475 2.70652 9.4804 2.81187 9.29286 2.99941C9.10533 3.18694 8.99997 3.44129 8.99997 3.7065V5.70648C8.99997 6.25876 8.55227 6.70647 7.99999 6.70647C7.44771 6.70647 7 6.25876 7 5.70648V3.7065C7 2.91087 7.31607 2.14781 7.87867 1.58521Z" fill="#006F76"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M25.8655 11.9932C26.142 12.4713 25.9786 13.083 25.5005 13.3595C21.7014 15.5566 17.3893 16.7111 13.0007 16.7063C8.6103 16.7173 4.29575 15.5621 0.498295 13.3587C0.020604 13.0816 -0.141952 12.4696 0.135217 11.9919C0.412385 11.5143 1.02432 11.3517 1.50201 11.6289C4.99358 13.6548 8.96066 14.7168 12.9974 14.7063L13.0012 14.7063C17.0381 14.7111 21.0046 13.6492 24.4992 11.6282C24.9773 11.3517 25.589 11.5151 25.8655 11.9932Z" fill="#006F76"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.5 11.7065C10.5 11.1543 10.9477 10.7065 11.5 10.7065H14.4999C15.0522 10.7065 15.4999 11.1543 15.4999 11.7065C15.4999 12.2588 15.0522 12.7065 14.4999 12.7065H11.5C10.9477 12.7065 10.5 12.2588 10.5 11.7065Z" fill="#006F76"/>
      </svg>
      <p>Gestión de productos, servicios, lista de precios y proveedores</p>
      </div>
    </div>
    <div className='precio-container'>
      <span>$299 usd /mes</span>
    </div>
    <div className='mercado-pago-container'>
        <input type="radio" id="mercadoPago" name="paymentMethod" value="mercadoPago"/>
        
        <div className='logo-mp'>
        <svg width="155" height="40" viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M152.594 6.6762C151.577 5.41003 150.042 4.77694 147.97 4.77694C145.898 4.77694 144.363 5.41003 143.347 6.6762C142.33 7.94237 141.831 9.45794 141.831 11.1845C141.831 12.9495 142.33 14.4651 143.347 15.7121C144.363 16.9591 145.898 17.5921 147.97 17.5921C150.042 17.5921 151.577 16.9591 152.594 15.7121C153.61 14.4651 154.109 12.9495 154.109 11.1845C154.128 9.43876 153.61 7.94237 152.594 6.6762ZM150.08 13.9663C149.582 14.6186 148.891 14.9447 147.97 14.9447C147.049 14.9447 146.339 14.6186 145.841 13.9663C145.342 13.314 145.092 12.374 145.092 11.1845C145.092 9.97592 145.342 9.05507 145.841 8.4028C146.339 7.75053 147.049 7.42439 147.97 7.42439C148.891 7.42439 149.601 7.75053 150.08 8.4028C150.579 9.05507 150.829 9.97592 150.829 11.1845C150.829 12.3932 150.579 13.314 150.08 13.9663Z" fill="#141685"/>
            <path d="M126.656 5.60187C125.62 5.08389 124.45 4.81531 123.126 4.81531C121.093 4.81531 119.654 5.35247 118.81 6.40762C118.292 7.07907 117.985 7.96156 117.927 9.0167H120.978C121.054 8.55627 121.208 8.19177 121.419 7.904C121.726 7.5395 122.263 7.34765 123.03 7.34765C123.702 7.34765 124.22 7.44358 124.565 7.63542C124.91 7.82727 125.083 8.17259 125.083 8.6522C125.083 9.05507 124.853 9.36202 124.412 9.55386C124.162 9.66897 123.74 9.76489 123.145 9.82245L122.071 9.95674C120.843 10.1102 119.922 10.3788 119.289 10.7241C118.138 11.3956 117.563 12.4699 117.563 13.9471C117.563 15.0982 117.927 15.9807 118.637 16.5946C119.347 17.2085 120.268 17.477 121.361 17.5346C128.248 17.8415 128.172 13.9087 128.229 13.0838V8.57546C128.21 7.11744 127.692 6.13903 126.656 5.60187ZM125.064 12.4891C125.045 13.5442 124.738 14.2732 124.162 14.6761C123.587 15.079 122.954 15.2708 122.263 15.2708C121.822 15.2708 121.457 15.1557 121.15 14.9063C120.843 14.6761 120.69 14.2732 120.69 13.7361C120.69 13.1222 120.939 12.6809 121.438 12.3932C121.726 12.2205 122.225 12.0862 122.896 11.9711L123.606 11.8368C123.97 11.7601 124.239 11.7025 124.45 11.6258C124.661 11.549 124.853 11.4531 125.064 11.3188V12.4891Z" fill="#141685"/>
            <path d="M110.963 7.52031C111.75 7.52031 112.325 7.76971 112.709 8.24932C112.958 8.61383 113.131 9.0167 113.189 9.45794H116.584C116.392 7.75053 115.798 6.54191 114.781 5.87045C113.764 5.199 112.46 4.85368 110.867 4.85368C108.987 4.85368 107.529 5.42921 106.474 6.58028C105.419 7.73134 104.882 9.32365 104.882 11.3956C104.882 13.2181 105.361 14.7145 106.321 15.8655C107.28 17.0166 108.776 17.5921 110.829 17.5921C112.863 17.5921 114.416 16.9015 115.452 15.5202C116.105 14.6761 116.469 13.7553 116.546 12.8152H113.17C113.093 13.4483 112.901 13.9663 112.575 14.3692C112.249 14.772 111.692 14.9639 110.925 14.9639C109.831 14.9639 109.083 14.4651 108.68 13.4675C108.469 12.9303 108.354 12.2205 108.354 11.338C108.354 10.4172 108.469 9.66897 108.68 9.11262C109.083 8.05748 109.851 7.52031 110.963 7.52031Z" fill="#141685"/>
            <path d="M103.961 4.87286C96.9778 4.87286 97.3999 11.0503 97.3999 11.0503V17.3236H100.565V11.4339C100.565 10.4747 100.68 9.76489 100.93 9.28528C101.371 8.46035 102.215 8.05748 103.481 8.05748C103.577 8.05748 103.712 8.05748 103.865 8.07666C104.019 8.07666 104.191 8.09585 104.402 8.11503V4.89205C104.268 4.89205 104.172 4.87286 104.134 4.87286C104.076 4.87286 104.019 4.87286 103.961 4.87286Z" fill="#141685"/>
            <path d="M92.3352 14.043C92.2009 14.2349 92.0666 14.3883 91.894 14.5226C91.4527 14.8871 90.8388 15.0022 90.129 15.0022C89.4575 15.0022 88.9204 14.9063 88.4408 14.5994C87.6542 14.1198 87.213 13.2948 87.1554 12.0862H95.9227C95.9419 11.0503 95.9035 10.2445 95.8268 9.70734C95.6733 8.7673 95.3663 7.94237 94.8675 7.21336C94.3304 6.40762 93.6206 5.8129 92.7956 5.42921C91.9515 5.06471 91.0115 4.87286 89.9755 4.87286C88.2105 4.87286 86.7717 5.42921 85.6782 6.54191C84.5655 7.6546 84.0283 9.24691 84.0283 11.338C84.0283 13.5634 84.6422 15.1749 85.87 16.1533C87.0979 17.1317 88.4983 17.6305 90.1098 17.6305C92.0474 17.6305 93.563 17.055 94.6373 15.8847C95.2129 15.2708 95.5774 14.6569 95.7309 14.0622L92.3352 14.043ZM88.0763 8.13422C88.5175 7.67379 89.1506 7.44358 89.9563 7.44358C90.7045 7.44358 91.3184 7.65461 91.8172 8.09585C92.316 8.51791 92.6038 9.17018 92.6613 9.99511H87.2513C87.3664 9.22773 87.635 8.59464 88.0763 8.13422Z" fill="#141685"/>
            <path d="M82.7238 17.3044H79.8269V10.0143C79.8269 9.34284 79.6159 7.76972 77.6975 7.76972C76.4313 7.76972 75.5105 8.69057 75.5105 10.0143V17.3044H72.6136V10.0143C72.6136 9.34284 72.4218 7.76972 70.5033 7.76972C69.218 7.76972 68.3163 8.69057 68.3163 10.0143V17.3044H65.4194V10.1102C65.4194 7.09826 67.4146 4.8345 70.5033 4.8345C72.0381 4.8345 73.2851 5.48677 74.0908 6.50355C74.9541 5.46759 76.2203 4.8345 77.6783 4.8345C80.8437 4.8345 82.7046 7.02153 82.7046 10.1102L82.7238 17.3044Z" fill="#141685"/>
            <path d="M140.891 1.05516C140.891 1.05516 137.706 0.709839 137.706 3.28055V6.6762C137.361 6.10067 136.901 5.65942 136.325 5.35247C135.769 5.02634 135.117 4.87286 134.387 4.87286C132.814 4.87286 131.548 5.46758 130.608 6.63783C129.668 7.80808 129.189 9.5155 129.189 11.5682C129.189 13.3524 129.668 14.8104 130.627 15.9423C131.587 17.0742 133.467 17.573 135.136 17.573C140.968 17.573 140.891 12.5658 140.891 12.5658V1.05516ZM137.093 13.9855C136.632 14.6569 135.961 14.9831 135.059 14.9831C134.176 14.9831 133.505 14.6569 133.064 13.9855C132.623 13.314 132.411 12.3548 132.411 11.2421C132.411 10.2061 132.623 9.34284 133.064 8.6522C133.486 7.96156 134.176 7.61624 135.078 7.61624C135.673 7.61624 136.21 7.80808 136.67 8.19177C137.419 8.82486 137.783 9.95674 137.783 11.4339C137.783 12.4699 137.553 13.3332 137.093 13.9855Z" fill="#141685"/>
            <path d="M88.5559 37.4096C88.5559 37.8317 88.4024 38.1962 88.0955 38.5032C87.7885 38.8101 87.4049 38.9636 86.9828 38.9636H85.4097V27.9709C85.4097 25.8414 86.1387 24.4985 87.3089 23.5777C88.0955 22.9829 89.2657 22.4074 91.4528 22.4074C92.93 22.4074 94.6566 22.9829 95.5966 24.1148C96.6518 25.4002 97.0738 26.8198 97.0738 28.6999C97.0738 30.6375 96.6134 32.1915 95.6733 33.3809C94.7525 34.5512 93.5439 35.1267 92.0859 35.1267C91.3185 35.1267 90.6278 34.9924 90.0331 34.7238C89.4192 34.4169 88.9204 33.9373 88.5367 33.3042L88.5559 37.4096ZM93.8508 28.8342C93.8508 27.6448 93.6206 26.7239 93.1602 26.0716C92.6998 25.4385 92.0283 25.1124 91.165 25.1124C90.3209 25.1124 89.6686 25.4385 89.2082 26.0716C88.7669 26.6472 88.5559 27.568 88.5559 28.8342C88.5559 30.0044 88.7861 30.8677 89.2466 31.4433C89.707 32.0955 90.3784 32.4025 91.2417 32.4025C92.0475 32.4025 92.6806 32.0764 93.141 31.4433C93.6206 30.8102 93.8508 29.9469 93.8508 28.8342Z" fill="#05B0D9"/>
            <path d="M118.042 34.1099V33.3234C117.486 34.1867 116.757 34.7046 115.817 34.9348C114.896 35.1459 113.956 35.0691 113.054 34.7046C112.134 34.3401 111.347 33.6495 110.695 32.6711C110.042 31.6735 109.716 30.3689 109.716 28.7383C109.716 26.839 110.158 25.3043 111.021 24.134C111.884 22.9638 113.285 22.4266 115.203 22.369C117.102 22.3115 118.196 22.7527 119.27 23.5585C120.44 24.4601 121.15 25.8222 121.15 27.9709V34.4361C121.15 36.4888 119.711 40.3065 115.203 39.9804C112.402 39.7693 110.867 38.6374 109.985 36.0284H113.323C113.572 36.4504 113.937 36.7766 114.436 37.0068C114.935 37.237 115.433 37.2945 115.932 37.1986C116.431 37.0835 116.891 36.7957 117.313 36.2969C117.735 35.8365 117.985 35.0883 118.042 34.1099ZM112.824 28.8342C112.824 30.9445 113.438 32.1147 114.647 32.3449C115.855 32.5752 116.757 32.2874 117.352 31.5008C117.62 31.1747 117.831 30.6375 117.946 29.9277C118.062 29.2179 118.081 28.4889 117.966 27.7982C117.87 27.0884 117.601 26.4745 117.217 25.9182C116.815 25.3618 116.239 25.0932 115.472 25.0932C114.436 25.0932 113.745 25.4769 113.361 26.2443C113.016 26.9925 112.824 27.8558 112.824 28.8342Z" fill="#05B0D9"/>
            <path d="M107.011 23.2515C105.975 22.7335 104.805 22.465 103.481 22.465C101.448 22.465 100.009 23.0021 99.1649 24.0573C98.6469 24.7287 98.34 25.6112 98.2824 26.6664H101.333C101.409 26.2059 101.563 25.8222 101.774 25.5537C102.081 25.1892 102.618 24.9973 103.366 24.9973C104.038 24.9973 104.556 25.0932 104.901 25.2851C105.246 25.4769 105.419 25.8222 105.419 26.3018C105.419 26.7047 105.189 27.0117 104.748 27.2035C104.498 27.3186 104.076 27.4145 103.481 27.4721L102.407 27.6064C101.179 27.7599 100.258 28.0284 99.6253 28.3738C98.4743 29.0452 97.8987 30.1196 97.8987 31.5968C97.8987 32.7478 98.2632 33.6303 98.9731 34.2442C99.6829 34.8581 100.604 35.1267 101.697 35.1842C108.584 35.4912 108.508 31.5584 108.565 30.7335V26.2059C108.565 24.7479 108.047 23.7695 107.011 23.2515ZM105.419 30.1196C105.4 31.1747 105.093 31.9037 104.517 32.3066C103.942 32.7094 103.309 32.9013 102.618 32.9013C102.177 32.9013 101.812 32.7862 101.505 32.5368C101.198 32.3066 101.045 31.9037 101.045 31.3665C101.045 30.7718 101.294 30.3114 101.793 30.0236C102.081 29.851 102.561 29.7167 103.251 29.6016L103.961 29.4673C104.326 29.3905 104.594 29.333 104.805 29.2563C105.016 29.1795 105.208 29.0836 105.419 28.9493V30.1196Z" fill="#05B0D9"/>
            <path d="M133.121 24.2491C132.105 22.9829 130.57 22.3499 128.498 22.3499C126.426 22.3499 124.891 22.9829 123.874 24.2491C122.858 25.5153 122.359 27.0117 122.359 28.7575C122.359 30.5224 122.858 32.038 123.874 33.285C124.891 34.532 126.426 35.1651 128.498 35.1651C130.57 35.1651 132.105 34.532 133.121 33.285C134.138 32.038 134.637 30.5224 134.637 28.7575C134.637 27.0117 134.138 25.5153 133.121 24.2491ZM130.608 31.5392C130.109 32.1915 129.419 32.5176 128.498 32.5176C127.577 32.5176 126.867 32.1915 126.368 31.5392C125.87 30.8869 125.62 29.9661 125.62 28.7575C125.62 27.5488 125.87 26.628 126.368 25.9757C126.867 25.3234 127.577 24.9973 128.498 24.9973C129.419 24.9973 130.129 25.3234 130.608 25.9757C131.107 26.628 131.356 27.5488 131.356 28.7575C131.337 29.9469 131.107 30.8869 130.608 31.5392Z" fill="#05B0D9"/>
            <path d="M56.7865 18.3979C56.7865 8.26849 44.2015 0 28.6813 0C13.1419 0 0.556885 8.26849 0.556885 18.3979C0.556885 18.6665 0.556885 19.3763 0.556885 19.4722C0.556885 30.2155 11.5688 38.9252 28.6813 38.9252C45.9089 38.9252 56.8057 30.2155 56.8057 19.4722C56.7865 19.0885 56.7865 18.8775 56.7865 18.3979Z" fill="#141685"/>
            <path d="M55.7121 18.3787C55.7121 27.9325 43.6068 35.6831 28.6813 35.6831C13.7558 35.6831 1.65039 27.9325 1.65039 18.3787C1.65039 8.82484 13.7558 1.09351 28.6813 1.09351C43.6068 1.09351 55.7121 8.82484 55.7121 18.3787Z" fill="#05B0D9"/>
            <path d="M19.703 12.9303C19.6838 12.9495 19.4152 13.2372 19.5879 13.4675C20.0099 14.0046 21.3337 14.3308 22.6574 14.0238C23.444 13.8511 24.4607 13.0454 25.4583 12.2588C26.5327 11.4147 27.5878 10.5706 28.6429 10.2253C29.7748 9.86078 30.4847 10.0143 30.9643 10.1677C31.4822 10.3212 32.0961 10.6665 33.0937 11.4147C34.9354 12.796 42.379 19.2995 43.6644 20.4122C44.7003 19.9518 49.3046 17.9566 55.5587 16.5945C55.0216 13.2564 52.988 10.2061 49.9185 7.71213C45.6404 9.51546 40.403 10.4555 35.2808 7.94234C35.2616 7.92316 32.4798 6.61861 29.7556 6.67617C25.6885 6.77209 23.9236 8.53706 22.0627 10.3979L19.703 12.9303Z" fill="white"/>
            <path d="M43.3766 21.1029C43.2807 21.0261 34.6285 13.4483 32.6717 11.9711C31.5398 11.1269 30.9067 10.8967 30.2353 10.82C29.8899 10.7816 29.4103 10.8392 29.0842 10.9351C28.1633 11.1845 26.9739 11.9902 25.9188 12.8152C24.8252 13.6977 23.7893 14.5034 22.8301 14.7336C21.6023 15.0022 20.1059 14.6761 19.4152 14.2156C19.1467 14.0238 18.9356 13.8128 18.8589 13.6017C18.6095 13.0262 19.0699 12.5466 19.1467 12.4699L21.5447 9.87995C21.8133 9.61137 22.1011 9.32361 22.3888 9.05502C21.6214 9.15095 20.9116 9.34279 20.2018 9.55382C19.3385 9.80322 18.4944 10.0334 17.6694 10.0334C17.3241 10.0334 15.4249 9.72648 15.0795 9.63056C12.9117 9.01665 11.0124 8.44112 8.17315 7.11739C4.7775 9.64974 2.51374 12.8152 1.84229 16.2876C2.3219 16.4218 3.10846 16.6521 3.45378 16.7288C11.1467 18.4362 13.5448 20.2012 13.9669 20.5657C14.4465 20.0477 15.1179 19.7024 15.8661 19.7024C16.7102 19.7024 17.4776 20.1244 17.9572 20.7959C18.3985 20.4506 19.0124 20.1436 19.7989 20.1436C20.1634 20.1436 20.5279 20.2012 20.8924 20.3355C21.7557 20.6424 22.2162 21.218 22.4464 21.7359C22.7341 21.6016 23.0986 21.5057 23.5207 21.5057C23.9428 21.5057 24.3648 21.6016 24.8061 21.7935C26.2257 22.4074 26.4367 23.7887 26.3216 24.8438C26.4176 24.8246 26.5327 24.8246 26.6286 24.8246C28.3168 24.8246 29.6789 26.1867 29.6789 27.875C29.6789 28.3929 29.5446 28.8917 29.3144 29.3138C29.7748 29.5632 30.9451 30.1579 31.9619 30.0236C32.7868 29.9277 33.0937 29.6399 33.2088 29.4865C33.2856 29.3713 33.3623 29.2562 33.2856 29.1603L31.1177 26.7431C31.1177 26.7431 30.7532 26.3978 30.8875 26.2826C31.0026 26.1484 31.2328 26.3402 31.3863 26.4745C32.499 27.3953 33.8419 28.7958 33.8419 28.7958C33.8611 28.815 33.957 28.9877 34.4558 29.0836C34.8779 29.1603 35.6453 29.1219 36.1632 28.6807C36.2975 28.5656 36.4318 28.4313 36.5469 28.297L36.5278 28.3162C37.0841 27.6064 36.4702 26.8966 36.4702 26.8966L33.9379 24.0573C33.9379 24.0573 33.5734 23.7311 33.7076 23.5968C33.8227 23.4817 34.053 23.6544 34.2064 23.7887C35.0122 24.4601 36.1441 25.592 37.2184 26.6663C37.4294 26.8198 38.3886 27.4145 39.6548 26.5896C40.4222 26.0908 40.5757 25.4769 40.5565 24.9973C40.4989 24.3834 40.0193 23.9422 40.0193 23.9422L36.5661 20.4698C36.5661 20.4698 36.2016 20.1628 36.3359 20.0093C36.451 19.875 36.6812 20.0669 36.8347 20.2012C37.9282 21.122 40.921 23.8654 40.921 23.8654C40.9594 23.9038 41.9953 24.6328 43.2615 23.827C43.7219 23.5393 44.0097 23.098 44.0289 22.5801C44.0097 21.6208 43.3766 21.1029 43.3766 21.1029Z" fill="white"/>
            <path d="M26.6094 25.5153C26.0722 25.5153 25.4775 25.8222 25.4008 25.7839C25.3624 25.7647 25.4391 25.5345 25.4775 25.4194C25.5351 25.3043 26.2257 23.1748 24.5183 22.4266C23.1946 21.8511 22.3888 22.5033 22.1202 22.7911C22.0435 22.8678 22.0243 22.8678 22.0051 22.7719C21.9859 22.3882 21.8133 21.3523 20.6622 21.0069C19.0315 20.5081 17.9956 21.64 17.727 22.0621C17.6119 21.1412 16.8253 20.4122 15.8661 20.4122C14.8301 20.4122 13.986 21.2563 13.986 22.2923C13.986 23.3283 14.8301 24.1724 15.8661 24.1724C16.3649 24.1724 16.8253 23.9805 17.1707 23.6544C17.1898 23.6736 17.1898 23.6736 17.1707 23.7119C17.0939 24.1724 16.9404 25.8798 18.7246 26.5704C19.4344 26.839 20.0483 26.6472 20.5471 26.2827C20.7006 26.1676 20.7198 26.2251 20.7006 26.3594C20.643 26.8006 20.7198 27.7215 22.0243 28.2587C23.0219 28.6615 23.6166 28.2395 24.0003 27.8942C24.173 27.7407 24.2113 27.7599 24.2305 28.0093C24.2689 29.2754 25.324 30.273 26.5902 30.273C27.8948 30.273 28.9691 29.2179 28.9691 27.8942C28.9691 26.5704 27.9139 25.5153 26.6094 25.5153Z" fill="white"/>
            <path d="M43.7219 20.2012C41.0553 17.8799 34.8971 12.5083 33.228 11.2613C32.2688 10.5515 31.6166 10.1678 31.0602 9.99511C30.8108 9.91838 30.4463 9.82245 29.9859 9.82245C29.5638 9.82245 29.1034 9.89919 28.6238 10.0527C27.5494 10.398 26.4751 11.2421 25.4392 12.067L25.3816 12.1054C24.4032 12.8728 23.4056 13.6785 22.6574 13.832C22.3313 13.9087 21.986 13.9471 21.6406 13.9471C20.7965 13.9471 20.0291 13.6977 19.7414 13.3332C19.703 13.2757 19.7222 13.1797 19.8373 13.0263L19.8565 13.0071L22.197 10.4747C24.0387 8.63302 25.7653 6.90642 29.7748 6.8105C29.8324 6.8105 29.9091 6.8105 29.9667 6.8105C32.4607 6.8105 34.9355 7.92319 35.2232 8.05748C37.5637 9.18937 39.9618 9.7649 42.379 9.78408C44.8922 9.78408 47.5013 9.17018 50.2446 7.90401C49.9377 7.65461 49.6307 7.40521 49.2854 7.15582C46.8874 8.19178 44.5852 8.72894 42.379 8.72894C40.1153 8.72894 37.8707 8.19178 35.6837 7.11745C35.5685 7.05989 32.8252 5.77454 29.9667 5.77454C29.89 5.77454 29.8132 5.77454 29.7365 5.77454C26.3792 5.85127 24.4991 7.04071 23.2138 8.09585C21.986 8.13422 20.9116 8.42199 19.9524 8.69057C19.1083 8.92078 18.3793 9.13181 17.6695 9.13181C17.3817 9.13181 16.8445 9.11263 16.8062 9.11263C15.9812 9.09344 11.8566 8.07667 8.55685 6.82968C8.21153 7.05989 7.90458 7.30929 7.57845 7.55869C11.0125 8.95915 15.1947 10.0527 16.5184 10.1486C16.8829 10.1678 17.2858 10.2061 17.6695 10.2061C18.5328 10.2061 19.4152 9.95674 20.2594 9.72653C20.7582 9.59224 21.3145 9.43876 21.89 9.32366C21.7366 9.47713 21.5831 9.63061 21.4296 9.78408L19.0316 12.3356C18.8397 12.5275 18.4368 13.0263 18.7054 13.6593C18.8205 13.9087 19.0316 14.1581 19.3385 14.35C19.914 14.7337 20.9308 14.9831 21.8709 14.9831C22.2354 14.9831 22.5615 14.9447 22.8876 14.868C23.8852 14.6377 24.9404 13.8128 26.0531 12.9303C26.9355 12.2205 28.2017 11.338 29.1609 11.0694C29.4295 10.9927 29.7557 10.9543 30.0242 10.9543C30.101 10.9543 30.1777 10.9543 30.2545 10.9735C30.8875 11.0503 31.5014 11.2613 32.595 12.0862C34.5518 13.5634 43.204 21.1413 43.2999 21.1988C43.2999 21.1988 43.8562 21.6784 43.8179 22.465C43.7987 22.9062 43.5493 23.2899 43.1272 23.5777C42.7627 23.8079 42.379 23.923 41.9953 23.923C41.4198 23.923 41.0169 23.6544 40.9977 23.6353C40.9594 23.6161 38.005 20.8919 36.9115 19.971C36.7388 19.8175 36.5661 19.7024 36.3935 19.7024C36.2976 19.7024 36.2208 19.7408 36.1633 19.8175C35.9906 20.0286 36.1824 20.3163 36.4127 20.5082L39.885 23.9998C39.885 23.9998 40.3263 24.4026 40.3647 24.9398C40.3838 25.5153 40.1153 25.9949 39.5397 26.3786C39.1369 26.6472 38.7148 26.7815 38.3119 26.7815C37.7748 26.7815 37.4103 26.5321 37.3143 26.4745L36.8155 25.9758C35.9139 25.0741 34.9738 24.1532 34.2832 23.5777C34.1105 23.4434 33.9379 23.3091 33.7652 23.3091C33.6885 23.3091 33.6117 23.3475 33.5542 23.405C33.4774 23.501 33.4199 23.6544 33.6117 23.9038C33.6885 24.0189 33.7844 24.0957 33.7844 24.0957L36.3167 26.935C36.3359 26.9542 36.8347 27.5489 36.3743 28.1436L36.2784 28.2587C36.2016 28.3354 36.1249 28.4122 36.0482 28.4889C35.6261 28.8342 35.0314 28.8726 34.8204 28.8726C34.7052 28.8726 34.5901 28.8534 34.475 28.8342C34.2256 28.7959 34.053 28.7191 33.9762 28.6232L33.9379 28.5848C33.8036 28.4505 32.5182 27.146 31.4631 26.2635C31.3288 26.1484 31.1561 25.9949 30.9643 25.9949C30.8684 25.9949 30.7916 26.0333 30.7341 26.0909C30.523 26.3211 30.83 26.6664 30.9643 26.7815L33.1129 29.1604C33.1129 29.1796 33.0746 29.2371 33.0362 29.3138C32.9595 29.429 32.6909 29.6783 31.9235 29.7743C31.8276 29.7935 31.7317 29.7935 31.6357 29.7935C30.83 29.7935 29.9667 29.4098 29.5254 29.1604C29.7365 28.7383 29.8324 28.2587 29.8324 27.7983C29.8324 26.0141 28.3936 24.5753 26.6094 24.5753C26.571 24.5753 26.5327 24.5753 26.4943 24.5753C26.5519 23.7695 26.4368 22.2348 24.8636 21.5633C24.4032 21.3715 23.962 21.2756 23.5207 21.2756C23.1754 21.2756 22.8493 21.3331 22.5423 21.4482C22.2162 20.8151 21.679 20.3547 20.9692 20.1053C20.5855 19.971 20.1826 19.8943 19.8181 19.8943C19.1658 19.8943 18.5519 20.0861 18.0148 20.4698C17.4968 19.8367 16.7102 19.453 15.9045 19.453C15.1947 19.453 14.504 19.7408 13.986 20.2396C13.3146 19.7216 10.648 18.0334 3.53053 16.4219C3.18521 16.3452 2.39865 16.115 1.89985 15.9807C1.82311 16.3643 1.76556 16.748 1.70801 17.1509C1.70801 17.1509 3.03173 17.4579 3.28113 17.5154C10.5712 19.1269 12.9693 20.8151 13.3721 21.1413C13.2379 21.4674 13.1611 21.8319 13.1611 22.1964C13.1611 23.6928 14.3889 24.9206 15.8853 24.9206C16.058 24.9206 16.2306 24.9014 16.3841 24.8822C16.6143 25.9949 17.3433 26.8199 18.4368 27.2611C18.763 27.3762 19.0891 27.453 19.4152 27.453C19.6263 27.453 19.8373 27.4338 20.0291 27.3762C20.2402 27.8942 20.7006 28.5465 21.7174 28.9685C22.0819 29.122 22.4464 29.1987 22.7917 29.1987C23.0795 29.1987 23.3672 29.1412 23.6166 29.0453C24.1154 30.2539 25.2857 31.0404 26.5902 31.0404C27.4535 31.0404 28.2976 30.6951 28.8924 30.062C29.4103 30.3498 30.5039 30.8678 31.6165 30.8678C31.7508 30.8678 31.8851 30.8486 32.0386 30.8486C33.1321 30.7143 33.6501 30.2731 33.8803 29.9469C33.9187 29.8894 33.9571 29.8318 33.9954 29.7551C34.264 29.8318 34.5326 29.8894 34.8587 29.8894C35.4534 29.8894 36.029 29.6783 36.6237 29.2563C37.1992 28.8342 37.6021 28.2587 37.6596 27.7407V27.7215C37.8515 27.7599 38.0433 27.7791 38.2544 27.7791C38.8683 27.7791 39.4822 27.5872 40.0577 27.2036C41.1704 26.4745 41.3814 25.5153 41.3622 24.8822C41.5541 24.9206 41.7651 24.9398 41.957 24.9398C42.5325 24.9398 43.108 24.7671 43.6452 24.4218C44.3358 23.9806 44.7579 23.2899 44.8154 22.5034C44.8538 21.9662 44.7195 21.429 44.4509 20.9494C46.331 20.1437 50.6283 18.5706 55.693 17.4387C55.6547 17.055 55.5971 16.6521 55.5395 16.2684C49.4197 17.7073 44.8538 19.6833 43.7219 20.2012ZM26.6094 30.0812C25.42 30.0812 24.4608 29.1604 24.4032 27.9709C24.4032 27.875 24.384 27.6064 24.1538 27.6064C24.0579 27.6064 23.9811 27.664 23.8852 27.7407C23.6166 27.9901 23.2905 28.2203 22.8109 28.2203C22.5999 28.2203 22.3505 28.1628 22.1011 28.0669C20.8541 27.5681 20.8349 26.7048 20.8733 26.3594C20.8924 26.2635 20.8924 26.1676 20.8349 26.0909L20.7582 26.0141H20.6814C20.6239 26.0141 20.5471 26.0333 20.4704 26.11C20.1059 26.3594 19.7606 26.4937 19.3961 26.4937C19.2042 26.4937 18.9932 26.4554 18.8013 26.3786C17.1515 25.7264 17.2858 24.1724 17.3625 23.712C17.3817 23.6161 17.3433 23.5393 17.2858 23.501L17.1707 23.405L17.0556 23.501C16.7294 23.8079 16.3074 23.9806 15.8661 23.9806C14.9261 23.9806 14.1587 23.2132 14.1587 22.2732C14.1587 21.3331 14.9261 20.5657 15.8853 20.5657C16.7486 20.5657 17.4776 21.218 17.5735 22.0621L17.6311 22.5226L17.8805 22.1389C17.8997 22.1005 18.6095 21.0454 19.8757 21.0454C20.1251 21.0454 20.3745 21.0837 20.6239 21.1605C21.6406 21.4674 21.8133 22.3883 21.8325 22.7719C21.8517 23.0022 22.0051 23.0022 22.0435 23.0022C22.1394 23.0022 22.197 22.9446 22.2354 22.9062C22.4272 22.7144 22.8493 22.3691 23.5015 22.3691C23.8085 22.3691 24.1154 22.4458 24.4416 22.5801C26.0531 23.2707 25.3241 25.3235 25.3241 25.3427C25.1898 25.688 25.1706 25.8415 25.3049 25.9182L25.3624 25.9566H25.4008C25.4775 25.9566 25.5735 25.9182 25.7077 25.8798C25.9188 25.8031 26.2641 25.688 26.571 25.688C27.7797 25.7072 28.7773 26.6856 28.7773 27.8942C28.7964 29.1028 27.818 30.0812 26.6094 30.0812Z" fill="#141685"/>
            </svg>
            <label htmlFor="mercadoPago" className='mercadoPago'>Pagar con Mercado Pago</label>
        </div> 
    </div>
    <div className='continuar-pago'>
      <button type='button' className='login-button btn-mp' onClick={() => setStep(4)}>Continuar con el pago</button>
    </div>
  </div> 

  </>
 )
}
const SignUpScreen = () => {

  const [ loading,setLoading ] = useState(true)
  const [ step,setStep ] = useState(1)


  useEffect(() => {
    getStepData()
  }, [])
  

  function getStepData () {
    const codeScreen = localStorage.getItem('code_screen')
    if(codeScreen){
      console.log(typeof codeScreen)
      const nmr = parseInt(codeScreen)
      setStep(nmr)
    }else{
      setStep(1)
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

  function renderPrincipalComponent () {
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep}/>
      case 2:
        return <SecondStep setStep={setStep}/>
      case 3: 
      return <SuscribeStep setStep={setStep}/>
      case 5:
        return <ThirdStep setStep={setStep} />
      case 4 :
        return <TermsAndCondition setStep={setStep}/>
      case 6:
        return <FourthStep setStep={setStep}/>
   
    }
  }

  


  return (
    <>
      
        <div className="login-bg">
          {renderPrincipalComponent()}
        </div>
      
    </>
  )
}

export default SignUpScreen