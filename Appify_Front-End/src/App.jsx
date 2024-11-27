import { useContext, useEffect, useState } from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { AppContext } from './context/AppContext'
import { getAllProducts, getAllProviders, getAllUsers, getClientes, getOCs, getOTs, getProyectos, getVentas } from './utils/api/Login/LoginFunction'
function App() {
  //aca la logica deberia ser fijarme si estoy logeado o no 
  
  useEffect(() => {
    //const jwtValue = getTknData()
    //console.log(jwtValue)
    //jwtValue ? verifyTkn() : denyAcces ()
  }, [])
  
  
  /*
  useEffect(() => {
    const jwtValue = getTknData()
    jwtValue ? verifyTkn() : denyAcces ()
  }, [])
  */

  /*
  
  function authAcces (){
    setLogged(true)
    setLoading(false)
  }

  function denyAcces (){
    setLogged(false)
    setLoading(false)
  }
  
  const getTknData = () => {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('tkn='))
    return jwtCookie ? true : null
  }
  */
  /*
  async function verifyTkn () {
    try {
      console.log('enviando')
      const data = { "tkn": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTRhZDUyLWY2OTktNGViOC05YTA4LWVmOWU2MWVhYTQyYSIsImVtYWlsIjoibWFnZTJAZXhhbXBsZS5jb20iLCJ1c2VyVHlwZSI6InN1cGVydXN1YXJpbyIsInBlcm1pc29zIjoiYWxsIiwiZGF0YSI6eyJpZCI6IjExMTRhZDUyLWY2OTktNGViOC05YTA4LWVmOWU2MWVhYTQyYSIsInVzZXIiOiIxMTE0YWQ1Mi1mNjk5LTRlYjgtOWEwOC1lZjllNjFlYWE0MmEiLCJub21icmUiOiJtYWdlMiIsImFwZWxsaWRvIjoiYmFueXUiLCJlbWFpbCI6Im1hZ2UyQGV4YW1wbGUuY29tIiwiY2VsdWxhciI6IjEyMjM0NDIzIiwiZmVjaGFfZGVfbmFjaW1pZW50byI6IjE5OTktMDgtMDZUMDA6MDA6MDAuMDAwWiIsImNhcmdvIjpudWxsLCJyZWZfc3VwZXJ1c3VhcmlvIjoxLCJjaGVja2VhZG8iOjEsInBhc3N3b3JkIjoiJDJiJDEwJFVBdExETzFGRElLSXBKQzRZRXNlNE84eE5xMWdYeThuSVk3eTYuOENCb2loaXR3NDBzbGN5IiwiYWN0aXZvIjpmYWxzZX0sImlhdCI6MTcxNTE5NTg4MX0.lN28_Dn41yIzyZ2E0Dw0PpdMAb2wfLaXQJfnrp4CdV8" }
      const response = await axios.get(`https://appify-black-side.vercel.app/user/api/check-auth`, data)
      console.log(response)
      //response.data.ok === true ? authAcces() : denyAcces()
    } catch (err) {
      console.log('errpr')
      console.log(err)
      //denyAcces()
    }
  }  

  */


  /*
  async function getData() {
    try{
      const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTRhZDUyLWY2OTktNGViOC05YTA4LWVmOWU2MWVhYTQyYSIsImVtYWlsIjoibWFnZTJAZXhhbXBsZS5jb20iLCJ1c2VyVHlwZSI6InN1cGVydXN1YXJpbyIsInBlcm1pc29zIjoiYWxsIiwiZGF0YSI6eyJpZCI6IjExMTRhZDUyLWY2OTktNGViOC05YTA4LWVmOWU2MWVhYTQyYSIsInVzZXIiOiIxMTE0YWQ1Mi1mNjk5LTRlYjgtOWEwOC1lZjllNjFlYWE0MmEiLCJub21icmUiOiJtYWdlMiIsImFwZWxsaWRvIjoiYmFueXUiLCJlbWFpbCI6Im1hZ2UyQGV4YW1wbGUuY29tIiwiY2VsdWxhciI6IjEyMjM0NDIzIiwiZmVjaGFfZGVfbmFjaW1pZW50byI6IjE5OTktMDgtMDZUMDA6MDA6MDAuMDAwWiIsImNhcmdvIjpudWxsLCJyZWZfc3VwZXJ1c3VhcmlvIjoxLCJjaGVja2VhZG8iOjEsInBhc3N3b3JkIjoiJDJiJDEwJFVBdExETzFGRElLSXBKQzRZRXNlNE84eE5xMWdYeThuSVk3eTYuOENCb2loaXR3NDBzbGN5IiwiYWN0aXZvIjpmYWxzZX0sImlhdCI6MTcxNTIwMDExM30.ulmHRh-ZX1lAxPssLeVbfTg17wgw7xCVWhHoa3vZJjc"
      //const response = await axios.get('https://appify-black-side.vercel.app/user/api/check-auth',data)
      const response = await axios.post('https://appify-black-side.vercel.app/user/api/check-auth', { "tkn" :token})
      console.log(response)
      console.log('respuesta correcta del servidor')
      
    }catch (err){
      console.log('error')
      console.log(err)
    }
  }
  */

  //////

  const { setLoadingPrivateRoutes,setUserLoggedData,setLogged,setProyectos,setClientes,setOrdenesDeTrabajo,setSubusuarios,setProducts,setProveedores,setOrdenesDeCompra,setSignUpCode,setVentas } = useContext(AppContext)


  useEffect(() => {
    const tkn = getCookieData()
    tkn ? verifyToken(tkn) : console.log('no hay cookie')

  }, [])
  
  function getCookieData () {
    const cookie = Cookies.get('tkn')
    console.log(cookie)
    return cookie
  }



  async function verifyToken (tkn) {
    try{
      const response = await axios.post(`https://appify-black-side.vercel.app/user/api/check-auth`,{tkn:tkn})
      console.log(response)
      tokenDecode(tkn)
    }catch(err){
      console.log(err)
      console.log('le elimino todo y lo redirecciono al login')
    }
  }

  function tokenDecode (tkn) {
    const tokenDecode = jwtDecode(tkn)
    console.log('data del token:')
    console.log(tokenDecode)
    setUserLoggedData(tokenDecode)
    getData(tokenDecode.data.user)
    
  }

  function getData(userId){
    console.log(userId)
    getProyectos(userId,setProyectos)
    getClientes(userId,setClientes)
    getOTs(userId,setOrdenesDeTrabajo)
    getAllUsers(userId,setSubusuarios)
    getAllProviders(userId,setProveedores)
    getAllProducts(userId,setProducts)
    getOCs(userId,setOrdenesDeCompra)
    getVentas(userId,setVentas)
    setLogged(true)
    setTimeout(() => {
      setLoadingPrivateRoutes(false)
    }, 1000);
  }

  return (
    <>
      <>
        <AppRouter/>
      </>
    </>
  )
}

export default App
