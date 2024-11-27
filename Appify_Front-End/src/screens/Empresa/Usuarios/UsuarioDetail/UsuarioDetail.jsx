import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Back_URL } from '../../../../utils/BackUrl';
import { AppContext } from '../../../../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { CiEdit } from 'react-icons/ci';
import { MdImage, MdOutlineCheck } from 'react-icons/md';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Button, ConfigProvider } from 'antd';
import { RiShieldCheckFill } from "react-icons/ri";

const UsuarioDetail = () => {
  /*
  const { userLoggedData,menuOptions,setMenuOptions } = useContext(AppContext);
  const params = useParams();

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Mi Empresa','/users')
    setMenuOptions(updateData)
  }, [])

  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);
  const [ errorMessage,setErrorMessage ] = useState('')

  const [ userData,setUserData ] = useState(null)
  const [ permisos,setPermisos ] = useState([])

  useEffect(() => {
    console.log('pedir data')
    //console.log(params.id)
    getUserData()
  }, [])

  async function getUserData () {
    try{
      //
      const response = await axios.get(`${Back_URL}/subuser/detail/${userLoggedData.id}/${params.id}`)
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

  */
  const navigate = useNavigate();

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
  
  return (
    <>
    <div className='principal-container-column'>
      <div className='row' onClick={()=>{navigate('/users')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a usuarios</span>
      </div>
      <PrincipalCard>
           <div className='profile-container'>
            {/*ICONO ABSOLUTO*/}
            <CiEdit style={{position:"absolute",top:0,right:0,fontSize:26,cursor:"pointer"}}/>
            {/*Primera seccion*/}
            <div className='profile-header-container'>
              <div className='profile-img-container'>
                <MdImage/>
              </div>
              <h2>Juan Gonzalez</h2>
              <span>Gestor Comercial</span>
            </div>
            <div style={{width:"100%",padding:"10px 0px"}}>
              <h2>Datos del perfil</h2>
            </div>
            {/*Segunda seccion*/}
            <div className='profile-grid'>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>+54 261 5734889</span>
                <span>N de telefono</span>
              </div>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>06/02/1997</span>
                <span>Fecha de nacimiento</span>
              </div>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>appemail@gmail.com</span>
                <span>Email</span>
              </div>
            </div>
          </div>
      </PrincipalCard>
      <div className='row-space-btw'>
        <h1>Permisos</h1>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `#00B69B`,
                colorPrimaryHover: `#00B69B`,
                colorPrimaryActive: `#00B69B`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button onClick={()=>{setStep(value)}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
            <RiShieldCheckFill style={{color:"#fffff"}}/>
            <span>Editar permisos</span>
          </Button>
        </ConfigProvider>
      </div>


      {/*------------------*/}
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
                permisosInitialState.map((permiso,categoriaIndex)=>
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
                              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <div style={itemPermiso.select === 1 ? { borderRadius:3,height:20,width:20,backgroundColor:"#00b69b3f",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",border:"1px solid #00B69B"} : {borderRadius:3,height:20,width:20,boxSizing:"border-box",border:"1px solid #777777c0"} }>
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
                              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <div style={itemPermiso.select === 1 ? { borderRadius:3,height:20,width:20,backgroundColor:"#00b69b3f",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",border:"1px solid #00B69B"} : {borderRadius:3,height:20,width:20,boxSizing:"border-box",border:"1px solid #777777c0"} }>
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
    </div>
      {
        /*
        loading === true ?
        <div>Loading Screen</div>
        :
        <>
          {
            error === true ?
            <div>Error Screen {errorMessage}</div>
            :
            <>
            <div className='row-test' style={{alignItems:"flex-start"}}>
              <div style={{height:60,width:60,border:"2px solid black",borderRadius:"50%"}}></div>
              <div className='column-test'>
                <span>{userData.nombre} {userData.apellido}</span>
                <span>{userData.email}</span>
                <span>+ {userData.celular}</span>
                <span>Cargo: {userData.cargo}</span>
                <span>Fecha de nacimiento: {userData.fecha_de_nacimiento}</span>
                <span>Estado: Activo</span>
              </div>
              <button onClick={()=>{navigate(`/users/${userData.id}/edit`)}}>Editar</button>
            </div>
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
                                  <div style={itemPermiso.select === 0 ? {height:10,width:10,border:"1px solid black"} : {height:10,width:10,border:"1px solid green",backgroundColor:"green"}}></div>
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
                                  <div style={itemPermiso.select === 0 ? {height:10,width:10,border:"1px solid black"} : {height:10,width:10,border:"1px solid green",backgroundColor:"green"}}></div>

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

            <div style={{width:"100%"}}>
              <h3>Restriccion de descuentos</h3>
              <div className='row-space-btw-test'>
                <div className='column-test'>
                  <h4>Máximo dscto productos s/ inventario</h4>
                  <span>Sin restricción</span>
                </div>
                <div className='column-test'>
                  <h4>Máximo dscto productos c/ inventario</h4>
                  <span>Sin restricción</span>
                </div>
              </div>
            </div>
            <div style={{width:"100%"}}>
              <h3>Horario Usuario</h3>
              <div className='row-test'>
                <div>Lunes</div>
                <div>Martes</div>
                <div>Miercoles</div>
                <div>Jueves</div>
                <div>Viernes</div>
                <div>Sabado</div>
                <div>Domingo</div>
              </div>
            </div>
            </>
          }
        </>

        <table style={{width:"100%"}}>
            <thead>
              <tr>
                <th>Módulo</th>
                <th>Permisos</th>
                <th>Visualizaciones</th>
                
              </tr>
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
              <tr>
                <th></th>
                <th>Inactivo</th>
                <th>Solo ver</th>
                <th>Administrar</th>
                <th>Todo</th>
                <th>Propietario</th>
              </tr>
            </tbody>
        </table>
        */
      }
    </>
  )
}

export default UsuarioDetail