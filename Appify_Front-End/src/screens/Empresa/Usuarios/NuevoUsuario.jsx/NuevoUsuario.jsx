import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { MdImage, MdOutlineCheck } from 'react-icons/md';
import { DatePicker } from 'antd';
import CreateBtn from '../../../../components/Buttons/CreateBtn';

const NuevoUsuario = () => {
  const navigate = useNavigate();

  const [ userData,setUserData ] = useState({nombre:'',apellido:'',email:'',celular:'',fecha_de_nacimiento:null,cargo:''});

  const [ loadingScreen,setLoadingScreen ] = useState(false);

  const [ errorScreen,setErrorScreen ] = useState(false);
  
  const [ step,setStep ] = useState(1);


 
  const permisosInitialState = [
    {
      "categoria": "Comercial",
      "subcategorias": [
        {
          "nombre": "Proyecto",
          "id": 1,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": 1
            },
            {
              "nombre": "propietario",
              "select": 0
            }
          ]
        },
        {
          "nombre": "Clientes",
          "id": 2,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": 1
            },
            {
              "nombre": "propietario",
              "select": 0
            }
          ]
        },
        {
          "nombre": "Satisfaccion del Cliente",
          "id": 3,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    },
    {
      "categoria": "Operaciones",
      "subcategorias": [
        {
          "nombre": "Ordenes de Trabajo",
          "id": 4,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Tablero de Produccion",
          "id": 5,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Ordenes de Compra",
          "id": 6,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Inventario",
          "id": 7,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    },
    {
      "categoria": "Calendario",
      "subcategorias": [
        {
          "nombre": "Agendamiento",
          "id": 8,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    },
    {
      "categoria": "Administracion",
      "subcategorias": [
        {
          "nombre": "Ventas",
          "id": 9,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": 1
            },
            {
              "nombre": "propietario",
              "select": 0
            }
          ]
        },
        {
          "nombre": "Compras",
          "id": 10,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Registro de Cobros o Pagos",
          "id": 11,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Cuentas",
          "id": 12,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Resultados y Balance",
          "id": 13,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    },
    {
      "categoria": "Otros",
      "subcategorias": [
        {
          "nombre": "Usuarios",
          "id": 14,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Productos",
          "id": 15,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Servicios",
          "id": 16,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Proveedores",
          "id": 17,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Configuraciones",
          "id": 18,
          "permiso": [
            {
              "nombre": "inactivo",
              "select": 0
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 1
            }
          ],
          "visualizacion": [
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    }
  ];

  const [ permisos,setPermisos ] = useState(permisosInitialState);



  const [ cambios,setCambios ] = useState([])
  const [ cambiosVisualizacion,setCambiosVisualizacion ] = useState([])
  
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



  function goBack () {
    navigate('/users')
  }

  return (
    <>
      <div className='row' onClick={()=>{goBack()}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a usuarios</span>
      </div>
      <h1>Crear usuario</h1>
      {
        loadingScreen === true ?
        <>
          <div style={{height:"80%",width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:85}}>
            <h2>Registrando proveedor...</h2>
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
                <h2>¡Error al registrar el proveedor!</h2>
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
                step === 2 ?
                <Success message={'Usuario creado!'}/>
                :
                <div className='principal-container-column' style={{padding:"0px 40px",gap:30}}>
                  <PrincipalCard>
                    <form className='step-form'>
                      <div className='principal-container-column'>

                        {/**/}
                        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}>
                          <div className='column' style={{width:"fit-content",boxSizing:"border-box",alignItems:"center",padding:20,gap:20}}>
                              <div className='profile-header-container'>              
                                <div className='profile-img-container'>
                                  <MdImage/>
                                </div>
                              </div>
                          </div>
                        </div>
                        {/**/}

                        <div className='principal-grid grid-3-columns'>
                          <div className='column' style={{gap:5}}>
                            <span className='form-label'>Nombre <span style={{color:"red"}}>*</span></span>
                            <input style={{padding:8}} type='text' placeholder='Ingrese el nombre' />
                          </div>
                          <div className='column' style={{gap:5}}>
                            <span className='form-label'>Apellido <span style={{color:"red"}}>*</span></span>
                            <input style={{padding:8}} type='text' placeholder='Ingrese el apellido' />
                          </div>
                          <div className='column' style={{gap:5}}>
                            <span className='form-label'>Email <span style={{color:"red"}}>*</span></span>
                            <input style={{padding:8}} type='text' placeholder='Ingrese el email' />
                          </div>
                        </div>

                        <div className='principal-grid grid-3-columns'>
                          <div className='column' style={{gap:5}}>
                            <span className='form-label'>Celular <span style={{color:"red"}}>*</span></span>
                            <input style={{padding:8}} type='text' placeholder='Ingrese el celular' />
                          </div>
                          <div className='column' style={{gap:5}}>
                            <span className='form-label'>Fecha de nacimiento <span style={{color:"red"}}>*</span></span>
                            <DatePicker picker='date'/>
                          </div>
                          <div className='column' style={{gap:5}}>
                            <span className='form-label'>Cargo <span style={{color:"red"}}>*</span></span>
                            <input style={{padding:8}} type='text' placeholder='Ingresa el cargo' />
                          </div>
                        </div>

                      </div>
                    </form>
                  </PrincipalCard>
                  {/**/}
                  <h2 style={{fontSize:20}}>Permisos</h2>
                  <table style={{width:"100%",borderCollapse:"collapse",backgroundColor:"#FFFFFF"}}>
                    <thead>
                      <tr>
                        <th className='private-col-header' colSpan={1}>Módulo</th>
                        <th className='private-col-header' colSpan={2}>Permisos</th>
                        <th className='private-col-header' colSpan={3}>Visualizaciones</th>
                        
                      </tr>
                      <tr>
                        <th className='private-col-subheader'></th>
                        <th className='private-col-subheader'>Inactivo</th>
                        <th className='private-col-subheader'>Solo ver</th>
                        <th className='private-col-subheader'>Administrar</th>
                        <th className='private-col-subheader'>Todo</th>
                        <th className='private-col-subheader'>Propietario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        permisos.map((permiso,categoriaIndex)=>
                          <>
                            <tr>
                              <td className='private-col-table private-col-section-table' colspan="6">{permiso.categoria}</td>
                            </tr>
                            {
                              
                              permiso.subcategorias.map((subcategoria, subcategoriaIndex)=>
                              <tr>
                                <td className='private-col-table'>{subcategoria.nombre}</td>
                                {
                                  
                                  subcategoria.permiso.map((itemPermiso,optionIndex)=>
                                    <td>
                                      <div 
                                      onClick={() => handleOptionChange(categoriaIndex, subcategoriaIndex, optionIndex, subcategoria.id,itemPermiso.nombre)}
                                      style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                        <div 
                                        className={itemPermiso.select === 1 ? 'permisos-box permisos-edit-box permisos-box-select' : 'permisos-box permisos-edit-box permisos-box-unselect' }
                                        //style={itemPermiso.select === 1 ? { cursor:"pointer",borderRadius:3,height:20,width:20,backgroundColor:"#00b69b3f",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",border:"1px solid #00B69B"} : {cursor:"pointer",borderRadius:3,height:20,width:20,boxSizing:"border-box",border:"1px solid #777777c0"} }
                                        >
                                          
                                          {
                                            
                                            itemPermiso.select === 1 ?
                                            <MdOutlineCheck color='#00B69B'/>
                                            :
                                            <></>
                                            
                                          }
                                        </div>
                                      </div>
                                      
                                    </td>
                                  )
                                  
                                }
                                {
                                  
                                  subcategoria.visualizacion.map((itemPermiso,optionIndex)=>
                                  <td>
                                    {
                                      itemPermiso.select == null ?
                                      <></>
                                      :
                                      <div 
                                      onClick={() => handleVisualizacionChange(categoriaIndex, subcategoriaIndex, optionIndex, subcategoria.id,itemPermiso.nombre)}
                                      style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                        <div 
                                        className={itemPermiso.select === 1 ? 'permisos-box permisos-edit-box permisos-box-select' : 'permisos-box permisos-edit-box permisos-box-unselect' }
                                        //style={itemPermiso.select === 1 ? { cursor:"pointer",borderRadius:3,height:20,width:20,backgroundColor:"#00b69b3f",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",border:"1px solid #00B69B"} : {cursor:"pointer",borderRadius:3,height:20,width:20,boxSizing:"border-box",border:"1px solid #777777c0",display:"flex",alignItems:"center",justifyContent:"center"} }
                                        >
                                          {
                                            
                                            itemPermiso.select === 1 ?
                                            <MdOutlineCheck color='#00B69B'/>
                                            :
                                            <></>
                                            
                                          }
                                        </div>
                                      </div>

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
                  {/**/}
                  <div className='container-item-flex-end' style={{marginTop:30}}>
                    <CreateBtn label={'Crear usuario'} HanldeClick={()=>{console.log('crear subusuario')}}/>
                  </div>
                </div>
              }
            </>
          }
        </>
      }
    {
      /*
      
      <form>
        <input value={userData.nombre} onChange={(e)=>{setUserData({...userData,nombre:e.target.value})}} type='text' placeholder='nombre'/>

        <input value={userData.apellido} onChange={(e)=>{setUserData({...userData,apellido:e.target.value})}} type='text' placeholder='apellido'/>
        
        <input value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}} type='text' placeholder='email'/>
        
        <input value={userData.celular} onChange={(e)=>{setUserData({...userData,celular:e.target.value})}} type='text' placeholder='celular'/>
        
        <input value={userData.fecha_de_nacimiento} onChange={(e)=>{setUserData({...userData,fecha_de_nacimiento:e.target.value})}} type='date' placeholder='fecha de nacimiento'/>

        <input type='text' value={userData.cargo} onChange={(e)=>{setUserData({...userData,cargo:e.target.value})}} placeholder='cargo'/>
      </form>
      <h3>Permisos</h3>
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
                            onChange={() => handleOptionChange(categoriaIndex, subcategoriaIndex, optionIndex)}
                          />
                        </td>
                      )
                          
                    }
                    {
                          
                      subcategoria.visualizacion.map((itemPermiso,optionIndex)=>
                      <td>
                        {
                          itemPermiso.select == null ?
                          <></>
                          :
                          <input 
                            type='checkbox'
                            checked={itemPermiso.select === 1}
                            onChange={() => handleVisualizacionChange(categoriaIndex, subcategoriaIndex, optionIndex)}
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
      
      */
    }
    </>
  )
}

export default NuevoUsuario