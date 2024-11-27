import { DatePicker } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';

const EditProfile = () => {


  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    set_path_name(location.pathname)
  }, [location]);



  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Mi Empresa','/users/my_profile')
    //console.log(updateData)
    setMenuOptions(updateData)
  }, [])
  


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
      <div className='card'>
        <h3>Datos del usuario</h3>
        <form>
          <div>
            <label>Nombre</label>
            <input placeholder='nombre'/>
          </div>
          <div>
            <label>Apellido</label>
            <input placeholder='apellido'/>
          </div>
          <div>
            <label>Email</label>
            <input placeholder='app@wecom.global'/>
          </div>
          <div>
            <label>Celular (select)</label>
            <input placeholder='nombre'/>
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <DatePicker/>
          </div>
          <div>
            <label>Cargo</label>
            <input placeholder='cargo'/>
          </div>
        </form>
      </div>
      <div className='card'>
        <h3>Permisos</h3>
        <table style={{width:"100%"}}>
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
                permisosInitialState.map((permiso,categoriaIndex)=>
                  <>
                    <tr>
                      <td style={{color:"white",backgroundColor:"blue",padding:7}} colspan="6">{permiso.categoria}</td>
                    </tr>
                    {
                      
                      permiso.subcategorias.map((subcategoria, subcategoriaIndex)=>
                      <tr>
                        <td>{subcategoria.nombre}</td>
                        {
                          
                          subcategoria.permiso.map((itemPermiso,optionIndex)=>
                            <td>
                              <div style={itemPermiso.select === 1 ? {height:10,width:10,borderRadius:"50%",backgroundColor:"green",boxSizing:"border-box",border:"1px solid black"} : {height:10,width:10,borderRadius:"50%",boxSizing:"border-box",border:"1px solid black"} }></div>
                              
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
                              <div style={itemPermiso.select === 1 ? {height:10,width:10,borderRadius:"50%",backgroundColor:"green",boxSizing:"border-box",border:"1px solid black"} : {height:10,width:10,borderRadius:"50%",boxSizing:"border-box",border:"1px solid black"} }></div>

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
      <div className='card'>
        <h3>Restricción de descuentos</h3>
        <span>Máximo dscto productos s/ inventario</span>
        <span>Máximo dscto productos c/ inventario</span>
      </div>
      <div className='card'>
        <h3>Horario Usuario</h3>
      </div>
    </>
  )
}

export default EditProfile