import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { useParams } from 'react-router-dom';
import { Back_URL } from '../../../../utils/BackUrl';
import axios from 'axios';

const UsuarioEdit = () => {
  const { userLoggedData,menuOptions,setMenuOptions } = useContext(AppContext);
  const params = useParams()
  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Mi Empresa','/users')
    setMenuOptions(updateData)
  }, [])

  const [ errorMessage,setErrorMessage ] = useState('');

  const [ userData,setUserData ] = useState(null);
  const [ permisos,setPermisos ] = useState([]);

  useEffect(() => {
    console.log('pedir data')
    //console.log(params.id)
    getUserData()
  }, [])

  async function getUserData () {
    try{
      //
      const response = await axios.get(`${Back_URL}/subuser/detail/${userLoggedData.id}/${params.id}`)
      console.log('respuesta')
      console.log(response)
      //setError(false)
      if(response.data.data){
        //console.log('si se encontro el usuario')
        //console.log(response.data.data)
        console.log(response.data.data.permisos)
        setPermisos(response.data.data.permisos)
        setUserData(response.data.data)
        
        setError(false)
      }else{
        //console.log('no se encontro el usuario buscado')
        setErrorMessage('No se encontro el usuario buscado!')
        setError(true)
        setUserData(null)
      }
    }catch (err){
      //console.log(err)
      setErrorMessage('Algo salio mal!')
      setError(true)
    }finally{
      console.log('peticion finalizada')
      setLoading(false)
    }
  }


  //CAMBIOS

  const [ cambios,setCambios ] = useState([]);
  const [ cambiosVisualizacion,setCambiosVisualizacion ] = useState([]);

  const handleOptionChange = (categoriaIndex, subcategoriaIndex, optionIndex, idPermiso, columna) => {
    const updatedPermisos = [...permisos];
    updatedPermisos[categoriaIndex].subcategorias[subcategoriaIndex].permiso.forEach((option, i) => {
      if (i !== optionIndex) {
        option.select = 0;
      }
    });
    console.log('cambio')
    // idPermiso, columna, valor
    console.log({idPermiso,columna,valor:1})
    const findCambio = cambios.find((item)=>item.idPermiso === idPermiso)
    if(findCambio){
      console.log('ya esta dentro, voy a actualizarlo')
      const updateCambios = cambios.map((item)=>{
        if(item.idPermiso === idPermiso){
          return {...item, columna:columna}
        }
        return item
      })
      setCambios(updateCambios)
    }else{
      console.log('no esta, lo voy a ingresar por primera vez')
      setCambios([...cambios,{idPermiso,columna,valor:1}])
    }
    updatedPermisos[categoriaIndex].subcategorias[subcategoriaIndex].permiso[optionIndex].select = 1;
    setPermisos(updatedPermisos);
  };


  const handleVisualizacionChange = (categoriaIndex, subcategoriaIndex, optionIndex, idPermiso,columna) => {
    const updatedPermisos = [...permisos];
    updatedPermisos[categoriaIndex].subcategorias[subcategoriaIndex].visualizacion.forEach((option, i) => {
      if (i !== optionIndex) {
        option.select = 0;
      }
    });

    console.log('cambio')
    // idPermiso, columna, valor
    console.log({idPermiso,columna,valor:1})

    const findCambio = cambiosVisualizacion.find((item)=>item.idPermiso === idPermiso)
    if(findCambio){
      console.log('ya esta dentro, voy a actualizarlo')
      const updateCambios = cambiosVisualizacion.map((item)=>{
        if(item.idPermiso === idPermiso){
          return {...item, columna:columna}
        }
        return item
      })
      setCambiosVisualizacion(updateCambios)
    }else{
      console.log('no esta, lo voy a ingresar por primera vez')
      setCambiosVisualizacion([...cambiosVisualizacion,{idPermiso,columna,valor:1}])
    }


    updatedPermisos[categoriaIndex].subcategorias[subcategoriaIndex].visualizacion[optionIndex].select = 1;
    setPermisos(updatedPermisos);
  };


  const HandleSubmit = (e) =>{
    e.preventDefault()
    const permisosCombinados = {};

    // Función auxiliar para añadir columnas al objeto de permisos combinados
    function agregarColumna(idPermiso, columna) {
        if (!permisosCombinados[idPermiso]) {
            permisosCombinados[idPermiso] = { idPermiso, columnas: [] };
        }
        permisosCombinados[idPermiso].columnas.push(columna);
    }

    // Procesar el primer array de permisos
    cambios.forEach(permiso => {
        agregarColumna(permiso.idPermiso, permiso.columna);
    });

    // Procesar el segundo array de permisos
    cambiosVisualizacion.forEach(permiso => {
        agregarColumna(permiso.idPermiso, permiso.columna);
    });

    // Convertir el objeto de permisos combinados en un array
    const resultado = Object.values(permisosCombinados);
    let data = userData
    delete data.permisos
    //console.log('data para mandar')
    //console.log(data)
    enviarCambios(resultado,data)
  }


  async function enviarCambios (permisos, data){
    setLoading(true)
    try{
      console.log('enviando')
      const response = await axios.put('http://localhost:8080/editar-subusuario',{permisos:permisos,user:userData.id,data:data})
      //console.log(response)
      setError(false)
    }catch(err){
      //console.log(err)
      setErrorMessage('error al insertar la data')
      setError(true)
    }finally{
      setLoading(false)
    }
  }
  
  return (
    <>
      {
        loading === true ?
        <div>Loading Screen</div>
        :
        <>
          {
            error === true ?
            <div>Error! {errorMessage}</div>
            :
            <>
            <form onSubmit={HandleSubmit}>
              <div>
                <div className='row-space-btw-test'>
                  <h3>Datos del usuario</h3>
                  <div className='column-test'>
                    <span>Activo (checkbox/boton)</span>
                    <input type='checkbox'/>
                  </div>
                </div>
                <div className='grid-test' style={{gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                  <div className='column-test'>
                    <label>Nombre</label>
                    <input value={userData.nombre} onChange={(e)=>{setUserData({...userData,nombre:e.target.value})}}/>
                  </div>
                  <div className='column-test'>
                    <label>Apellido</label>
                    <input value={userData.apellido} onChange={(e)=>{setUserData({...userData,apellido: e.target.value})}}/>
                  </div>
                  <div className='column-test'>
                    <label>Email</label>
                    <input value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}/>
                  </div>
                  <div className='column-test'>
                    <label>Celular</label>
                    <input value={`+ ${userData.celular}`} onChange={(e)=>{setUserData({...userData,celular:e.target.value})}}/>
                  </div>
                  <div className='column-test'>
                    <label>Fecha de nacimiento</label>
                    <input value={userData.fecha_de_nacimiento}/>
                  </div>
                  <div className='column-test'>
                    <label>Email</label>
                    <input value={userData.cargo} onChange={(e)=>{setUserData({...userData,cargo:e.target.value})}}/>
                  </div>
                </div>
              </div>
              <h3>Permisos</h3>
              <div className='column-test' style={{width:"300px"}}>
                <span>Tipo de usuario</span>
                <SelectComponent/>
              </div>
              {/*---------------*/}
              <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Inactivo</th>
                      <th>Solo ver</th>
                      <th>Administrar</th>
                      <th>Todo</th>
                      <th>Propietario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      permisos.map((permiso,categoriaIndex)=>
                        <>
                          <tr>
                            <td style={{color:"red"}}>{permiso.categoria}</td>
                          </tr>
                          {
                                  
                            permiso.subcategorias.map((subcategoria, subcategoriaIndex)=>
                            <tr>
                              <td>{subcategoria.nombre}</td>
                              {
                                
                                subcategoria.permiso.map((itemPermiso,optionIndex)=>
                                  <td>
                                    <input 
                                      type='checkbox'
                                      checked={itemPermiso.select === 1}
                                      onChange={() => handleOptionChange(categoriaIndex, subcategoriaIndex, optionIndex, subcategoria.id,itemPermiso.nombre)}
                                    />
                                  </td>
                                )
                                      
                              }
                              {
                                      
                                subcategoria.visualizacion.map((itemPermiso,optionIndex)=>
                                <td>
                                  {
                                    subcategoria.id !== 1  && subcategoria.id !== 2  &&  subcategoria.id !== 9?
                                    <></>
                                    :
                                    <input 
                                      type='checkbox'
                                      checked={itemPermiso.select === 1}
                                      onChange={() => handleVisualizacionChange(categoriaIndex, subcategoriaIndex, optionIndex, subcategoria.id,itemPermiso.nombre)}
                                    />
                                  }
                                </td>
                              )  
                              }
                            </tr>
                            )                        
                          }
                        </>
                      )
                    }
                  </tbody>
              </table>
              {/*---------------*/}
              <button type='submit'>Enviar</button>
            </form>
            </>
          }
        </>
      }
    </>
  )
}

export default UsuarioEdit