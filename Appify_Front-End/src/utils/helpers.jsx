import axios from "axios";
import { LuClipboardList, LuHome } from "react-icons/lu";
import { PiBriefcase, PiMoneyLight } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

//function para setear los proveedores

export const getDataProveedores = async (userLoggedData) => {
  try {
    const response = await axios.get(`http://localhost:8080/proveedores/${userLoggedData.id}`);
    return response.data.data; // Devuelve los datos en caso de éxito
  } catch (err) {
    throw new Error('Error al obtener los datos de proveedores'); // Lanza un error en caso de fallo
  }
};

export const setNavigationHelper = (name,index,menuOptions,setMenuOptions) => {
    let updatedMenuOptions = menuOptions;
    
    updatedMenuOptions[index].submenuOptions.forEach((option) => {
      if (option.name === name) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
    
    setMenuOptions(updatedMenuOptions);
}



export const renderComponentByPath = (path_name, componentsMap) => {
    const Component = componentsMap[path_name];
    return Component ? <Component /> : null;
};


export const updateSubMenuAsideOptions = (menuOptions,section,path_name) =>{
  const updateAsideOptions = menuOptions.map((item)=>{
    if(item.text === section){
      //object principal
      const updateSubmenuOptions = item.submenuOptions.map((suboption)=>{
        if(suboption.route === path_name){
          if(suboption.itemsOpen !== undefined){
            return {...suboption,selected:true,itemsOpen:true}
          }
          return {...suboption,selected:true}
        }
        return {...suboption,selected:false}
      })
      return {...item,submenuOptions:updateSubmenuOptions,submenuOpen:true}
    }
    return item
  })
  return updateAsideOptions
}

//este es para los sub items

export const updateDispachDash = () =>{
  return [
      { icon: <LuHome />, text: 'Inicio', route:'/', selected:true },
  
      { icon: <VscGraph />, route:'/quotes', text: 'Gestión', submenuOptions:[{name:'Proyectos',selected:true, route:'/quotes'},
      //{name:'Consultas',selected:false, route:'/quote_requests'}, 
      {name:'Clientes',selected:false, route:'/clients/dashboard'} ], submenuOpen: false },
  
      { icon: <LuClipboardList />, route:'/work_orders',text: 'Órdenes' , submenuOptions:[{name:'Orden de trabajo',selected:true, route: '/work_orders'},
      //{name:'Tablero',selected:false, route:'/work_orders/panel'}, 
      {name:'Orden de Compra',selected:false, route: '/purchases'} ], submenuOpen: false },
      
      //{ icon: <FaCalendarAlt />, route:'/delivery_orders/delivery_route',text: 'Calendario', submenuOptions:[{name:'Agendamiento',selected:true, route:'/delivery_orders/delivery_route'},{name:'Mis Tareas',selected:false, route:'/qtwist/delivery_orders'} ], submenuOpen: false  },
      
      { 
        icon: <PiMoneyLight />, 
        route:'/sale_invoices',
        text: 'Finanzas',
        submenuOpen: true, 
        submenuOptions:[
          {
            name:'Ventas',
            selected:true, 
            route:'/sale_invoices',
            itemsOpen:true,
            items:[
              {
                name:'Despachos',
                selected:true,
                route:'/dispach_documents'
              },
              {
                name:'Cobros',
                selected:false,
                route:'/sale_payment_groups'
              }
            ]
          },
          {
            name:'Compras',
            selected:false, 
            route: '/service_invoices',
            itemsOpen:false,
            items:[
              {
                name:'Documentos tributarios',
                selected:false,
                route:'/tax_documents'
              },
              {
                name:'Pagos',
                selected:false,
                route:'/payment_groups'
              }
            ]
          },
          {
            name:'Cuentas',
            selected:false, 
            route:'/banks',
            itemsOpen:false,
            items:[
              {
                name:'Resultados',
                selected:false,
                route:'/results'
              },
              {
                name:'Balance',
                selected:false,
                route:'/balance'
              },
              {
                name:'Administrar',
                selected:false,
                route:'/admin_acount'
              }
            ]
          } 
        ], 
         
      },
      
      { 
        icon: <PiBriefcase />, 
        route:'/users',
        text: 'Mi Empresa', 
        submenuOptions:[
          /*
          {
            name:'Mi Perfil',
            selected:true, 
            route:'/users/my_profile'
          },
          */
          {
            name:'Usuarios',
            selected:false, 
            route:'/users'
          },
          {
            name:'Productos/Servicios',
            selected:false, 
            route:'/products'
          },
          {
            name:'Lista de precios',
            selected:false, 
            route:'/price_lists'
          }, 
          {
            name:'Proveedores',
            selected:false, 
            route:'/providers'
          },
      ], 
      submenuOpen: false  
    }
  ]
}



export const updateCobrosDash = () =>{
  return [
      { icon: <LuHome />, text: 'Inicio', route:'/', selected:true },
  
      { icon: <VscGraph />, route:'/quotes', text: 'Gestión', submenuOptions:[{name:'Proyectos',selected:true, route:'/quotes'},
      //{name:'Consultas',selected:false, route:'/quote_requests'}, 
      {name:'Clientes',selected:false, route:'/clients/dashboard'} ], submenuOpen: false },
  
      { icon: <LuClipboardList />, route:'/work_orders',text: 'Órdenes' , submenuOptions:[{name:'Orden de trabajo',selected:true, route: '/work_orders'},
      //{name:'Tablero',selected:false, route:'/work_orders/panel'}, 
      {name:'Orden de Compra',selected:false, route: '/purchases'} ], submenuOpen: false },
      
      //{ icon: <FaCalendarAlt />, route:'/delivery_orders/delivery_route',text: 'Calendario', submenuOptions:[{name:'Agendamiento',selected:true, route:'/delivery_orders/delivery_route'},{name:'Mis Tareas',selected:false, route:'/qtwist/delivery_orders'} ], submenuOpen: false  },
      
      { 
        icon: <PiMoneyLight />, 
        route:'/sale_invoices',
        text: 'Finanzas',
        submenuOpen: true, 
        submenuOptions:[
          {
            name:'Ventas',
            selected:true, 
            route:'/sale_invoices',
            itemsOpen:true,
            items:[
              {
                name:'Despachos',
                selected:false,
                route:'/dispach_documents'
              },
              {
                name:'Cobros',
                selected:true,
                route:'/sale_payment_groups'
              }
            ]
          },
          {
            name:'Compras',
            selected:false, 
            route: '/service_invoices',
            itemsOpen:false,
            items:[
              {
                name:'Documentos tributarios',
                selected:false,
                route:'/tax_documents'
              },
              {
                name:'Pagos',
                selected:false,
                route:'/payment_groups'
              }
            ]
          },
          {
            name:'Cuentas',
            selected:false, 
            route:'/banks',
            itemsOpen:false,
            items:[
              {
                name:'Resultados',
                selected:false,
                route:'/results'
              },
              {
                name:'Balance',
                selected:false,
                route:'/balance'
              },
              {
                name:'Administrar',
                selected:false,
                route:'/admin_acount'
              }
            ]
          } 
        ], 
         
      },
      
      { 
        icon: <PiBriefcase />, 
        route:'/users',
        text: 'Mi Empresa', 
        submenuOptions:[
          /*
          {
            name:'Mi Perfil',
            selected:true, 
            route:'/users/my_profile'
          },
          */
          {
            name:'Usuarios',
            selected:false, 
            route:'/users'
          },
          {
            name:'Productos/Servicios',
            selected:false, 
            route:'/products'
          },
          {
            name:'Lista de precios',
            selected:false, 
            route:'/price_lists'
          }, 
          {
            name:'Proveedores',
            selected:false, 
            route:'/providers'
          },
      ], 
      submenuOpen: false  
    }
  ]
}


export const updateDocumentosTributariosDash = () =>{
  return [
      { icon: <LuHome />, text: 'Inicio', route:'/', selected:true },
  
      { icon: <VscGraph />, route:'/quotes', text: 'Gestión', submenuOptions:[{name:'Proyectos',selected:true, route:'/quotes'},
      //{name:'Consultas',selected:false, route:'/quote_requests'}, 
      {name:'Clientes',selected:false, route:'/clients/dashboard'} ], submenuOpen: false },
  
      { icon: <LuClipboardList />, route:'/work_orders',text: 'Órdenes' , submenuOptions:[{name:'Orden de trabajo',selected:true, route: '/work_orders'},
      //{name:'Tablero',selected:false, route:'/work_orders/panel'}, 
      {name:'Orden de Compra',selected:false, route: '/purchases'} ], submenuOpen: false },
      
      //{ icon: <FaCalendarAlt />, route:'/delivery_orders/delivery_route',text: 'Calendario', submenuOptions:[{name:'Agendamiento',selected:true, route:'/delivery_orders/delivery_route'},{name:'Mis Tareas',selected:false, route:'/qtwist/delivery_orders'} ], submenuOpen: false  },
      
      { 
        icon: <PiMoneyLight />, 
        route:'/sale_invoices',
        text: 'Finanzas',
        submenuOpen: true, 
        submenuOptions:[
          {
            name:'Ventas',
            selected:false, 
            route:'/sale_invoices',
            itemsOpen:false,
            items:[
              {
                name:'Despachos',
                selected:false,
                route:'/dispach_documents'
              },
              {
                name:'Cobros',
                selected:false,
                route:'/sale_payment_groups'
              }
            ]
          },
          {
            name:'Compras',
            selected:true, 
            route: '/service_invoices',
            itemsOpen:true,
            items:[
              {
                name:'Documentos tributarios',
                selected:true,
                route:'/tax_documents'
              },
              {
                name:'Pagos',
                selected:false,
                route:'/payment_groups'
              }
            ]
          },
          {
            name:'Cuentas',
            selected:false, 
            route:'/banks',
            itemsOpen:false,
            items:[
              {
                name:'Resultados',
                selected:false,
                route:'/results'
              },
              {
                name:'Balance',
                selected:false,
                route:'/balance'
              },
              {
                name:'Administrar',
                selected:false,
                route:'/admin_acount'
              }
            ]
          } 
        ], 
         
      },
      
      { 
        icon: <PiBriefcase />, 
        route:'/users',
        text: 'Mi Empresa', 
        submenuOptions:[
          /*
          {
            name:'Mi Perfil',
            selected:true, 
            route:'/users/my_profile'
          },
          */
          {
            name:'Usuarios',
            selected:false, 
            route:'/users'
          },
          {
            name:'Productos/Servicios',
            selected:false, 
            route:'/products'
          },
          {
            name:'Lista de precios',
            selected:false, 
            route:'/price_lists'
          }, 
          {
            name:'Proveedores',
            selected:false, 
            route:'/providers'
          },
      ], 
      submenuOpen: false  
    }
  ]
}



export const updatePagosDash = () =>{
  return [
      { icon: <LuHome />, text: 'Inicio', route:'/', selected:true },
  
      { icon: <VscGraph />, route:'/quotes', text: 'Gestión', submenuOptions:[{name:'Proyectos',selected:true, route:'/quotes'},
      //{name:'Consultas',selected:false, route:'/quote_requests'}, 
      {name:'Clientes',selected:false, route:'/clients/dashboard'} ], submenuOpen: false },
  
      { icon: <LuClipboardList />, route:'/work_orders',text: 'Órdenes' , submenuOptions:[{name:'Orden de trabajo',selected:true, route: '/work_orders'},
      //{name:'Tablero',selected:false, route:'/work_orders/panel'}, 
      {name:'Orden de Compra',selected:false, route: '/purchases'} ], submenuOpen: false },
      
      //{ icon: <FaCalendarAlt />, route:'/delivery_orders/delivery_route',text: 'Calendario', submenuOptions:[{name:'Agendamiento',selected:true, route:'/delivery_orders/delivery_route'},{name:'Mis Tareas',selected:false, route:'/qtwist/delivery_orders'} ], submenuOpen: false  },
      
      { 
        icon: <PiMoneyLight />, 
        route:'/sale_invoices',
        text: 'Finanzas',
        submenuOpen: true, 
        submenuOptions:[
          {
            name:'Ventas',
            selected:false, 
            route:'/sale_invoices',
            itemsOpen:false,
            items:[
              {
                name:'Despachos',
                selected:false,
                route:'/dispach_documents'
              },
              {
                name:'Cobros',
                selected:false,
                route:'/sale_payment_groups'
              }
            ]
          },
          {
            name:'Compras',
            selected:true, 
            route: '/service_invoices',
            itemsOpen:true,
            items:[
              {
                name:'Documentos tributarios',
                selected:false,
                route:'/tax_documents'
              },
              {
                name:'Pagos',
                selected:true,
                route:'/payment_groups'
              }
            ]
          },
          {
            name:'Cuentas',
            selected:false, 
            route:'/banks',
            itemsOpen:false,
            items:[
              {
                name:'Resultados',
                selected:false,
                route:'/results'
              },
              {
                name:'Balance',
                selected:false,
                route:'/balance'
              },
              {
                name:'Administrar',
                selected:false,
                route:'/admin_acount'
              }
            ]
          } 
        ], 
         
      },
      
      { 
        icon: <PiBriefcase />, 
        route:'/users',
        text: 'Mi Empresa', 
        submenuOptions:[
          /*
          {
            name:'Mi Perfil',
            selected:true, 
            route:'/users/my_profile'
          },
          */
          {
            name:'Usuarios',
            selected:false, 
            route:'/users'
          },
          {
            name:'Productos/Servicios',
            selected:false, 
            route:'/products'
          },
          {
            name:'Lista de precios',
            selected:false, 
            route:'/price_lists'
          }, 
          {
            name:'Proveedores',
            selected:false, 
            route:'/providers'
          },
      ], 
      submenuOpen: false  
    }
  ]
}


export const updateResultsDash = () =>{
  return [
      { icon: <LuHome />, text: 'Inicio', route:'/', selected:true },
  
      { icon: <VscGraph />, route:'/quotes', text: 'Gestión', submenuOptions:[{name:'Proyectos',selected:true, route:'/quotes'},
      //{name:'Consultas',selected:false, route:'/quote_requests'}, 
      {name:'Clientes',selected:false, route:'/clients/dashboard'} ], submenuOpen: false },
  
      { icon: <LuClipboardList />, route:'/work_orders',text: 'Órdenes' , submenuOptions:[{name:'Orden de trabajo',selected:true, route: '/work_orders'},
      //{name:'Tablero',selected:false, route:'/work_orders/panel'}, 
      {name:'Orden de Compra',selected:false, route: '/purchases'} ], submenuOpen: false },
      
      //{ icon: <FaCalendarAlt />, route:'/delivery_orders/delivery_route',text: 'Calendario', submenuOptions:[{name:'Agendamiento',selected:true, route:'/delivery_orders/delivery_route'},{name:'Mis Tareas',selected:false, route:'/qtwist/delivery_orders'} ], submenuOpen: false  },
      
      { 
        icon: <PiMoneyLight />, 
        route:'/sale_invoices',
        text: 'Finanzas',
        submenuOpen: true, 
        submenuOptions:[
          {
            name:'Ventas',
            selected:false, 
            route:'/sale_invoices',
            itemsOpen:false,
            items:[
              {
                name:'Despachos',
                selected:false,
                route:'/dispach_documents'
              },
              {
                name:'Cobros',
                selected:false,
                route:'/sale_payment_groups'
              }
            ]
          },
          {
            name:'Compras',
            selected:false, 
            route: '/service_invoices',
            itemsOpen:false,
            items:[
              {
                name:'Documentos tributarios',
                selected:false,
                route:'/tax_documents'
              },
              {
                name:'Pagos',
                selected:false,
                route:'/payment_groups'
              }
            ]
          },
          {
            name:'Cuentas',
            selected:true, 
            route:'/banks',
            itemsOpen:true,
            items:[
              {
                name:'Resultados',
                selected:true,
                route:'/results'
              },
              {
                name:'Balance',
                selected:false,
                route:'/balance'
              },
              {
                name:'Administrar',
                selected:false,
                route:'/admin_acount'
              }
            ]
          } 
        ], 
         
      },
      
      { 
        icon: <PiBriefcase />, 
        route:'/users',
        text: 'Mi Empresa', 
        submenuOptions:[
          /*
          {
            name:'Mi Perfil',
            selected:true, 
            route:'/users/my_profile'
          },
          */
          {
            name:'Usuarios',
            selected:false, 
            route:'/users'
          },
          {
            name:'Productos/Servicios',
            selected:false, 
            route:'/products'
          },
          {
            name:'Lista de precios',
            selected:false, 
            route:'/price_lists'
          }, 
          {
            name:'Proveedores',
            selected:false, 
            route:'/providers'
          },
      ], 
      submenuOpen: false  
    }
  ]
}


export const redirectToUserDetailRoute = (id) =>{
  const navigate = useNavigate();
  navigate(`/users/${record.id}`)
}