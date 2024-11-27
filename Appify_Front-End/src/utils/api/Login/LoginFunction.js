import axios from "axios"

export async function getProyectos (userId,setProyectos){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/projects/alldata/${userId}`)
      //console.log(response)
      setProyectos(response.data.payload)
    }catch (err) {
      console.log(err)
    }
}

export async function getClientes (userId,setClientes){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/clientes/alldata/${userId}`)
      //console.log(response)
      setClientes(response.data.payload)
    }catch (err) {
      console.log(err)
    }
}


  //Obtener ordenes de trabajp
  export async function getOTs (userId,setOrdenesDeTrabajo){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/ordenTrabajo/alldata/${userId}`)
      //console.log(response)
      setOrdenesDeTrabajo(response.data.payload)
    }catch (err) {
      console.log(err)
    }
  }


  //Obtener usuarios
  export async function getAllUsers (userId,setSubusuarios){
    try{
      
      const activeUsers = await getAllUsersActive(userId)
      
      const inactiveUsers = await getAllUsersInactive(userId)

      let array = [...activeUsers,...inactiveUsers]
      array.sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
      });


      console.log('usuarios!')
      console.log(array)
      setSubusuarios(array)
      
    }catch (err) {
      console.log(err)
    }
  }

  export async function getAllUsersActive (userId){
    try{
      const responseUsersAct = await axios.get(`https://appify-black-side.vercel.app/user/allUsersAct/${userId}`)
      console.log('usuarios activos')
      const activeUsers = responseUsersAct.data.payload.map((item)=>{
        return {...item, estado: "Activo"}
      })
      console.log(activeUsers)
      return activeUsers
    }catch (err) {
      return []
    }
  }


  export async function getAllUsersInactive (userId){
    try{
      const responseUsersInac = await axios.get(`https://appify-black-side.vercel.app/user/allUsersInact/${userId}`)
      console.log('usuarios inactivos')
      const inactiveUsers = responseUsersInac.data.payload.map((item)=>{
        return {...item, estado: "Inactivo"}
      })
      console.log(inactiveUsers)
      return inactiveUsers
    }catch (err) {
      return []
    }
  }




  ///Obtener proveedores

  export async function getAllProviders (userId,setProveedores){
    try{
      
      const activeProv = await getAllProvidersActive(userId)

      const inactiveProv = await getAllProvidersInactive(userId)

      
      let array = [...activeProv,...inactiveProv]
      
      array.sort((a, b) => {
        return a.razon_social.localeCompare(b.razon_social);
      });
      console.log('Proveedores todos:')
      console.log(array)
      setProveedores(array)
      
    }catch (err) {
      console.log(err)
    }
  }


  export async function getAllProvidersActive (userId){
    try{
      const responseProvAct = await axios.get(`https://appify-black-side.vercel.app/proveedor/allProvAct/${userId}`)
      const activeProv = responseProvAct.data.payload.map((item)=>{
        return {...item, estado: "Activo"}
      })
      return activeProv
    }catch(err){
      return []
    }
  }


  export async function getAllProvidersInactive (userId){
    try{
      const responseProvInac = await axios.get(`https://appify-black-side.vercel.app/proveedor/allProvInact/${userId}`)
      const inactiveProv = responseProvInac.data.payload.map((item)=>{
        return {...item, estado: "Inactivo"}
      })
      return inactiveProv
    }catch(err){
      return []
    }
  }


  
  //Obtener productos:

  export async function getAllProducts (userId,setProducts){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/products/products/${userId}`)
      console.log('productos:')
      console.log(response.data.payload)
      setProducts(response.data.payload)
    }catch (err) {
      console.log(err)
    }
  }

  //Obtener ordenes de compra
  export async function getOCs (userId,setOrdenesDeTrabajo) {
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/ordenCompra/alldata/${userId}`)
      setOrdenesDeTrabajo(response.data.payload)
    }catch (err){
      console.log(err)
    }
  }

  //Obtener ordenes de compra
  export async function getVentas (userId,setVentas) {
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/administracion/ventas/alldata/${userId}`)
      console.log('respuesta de ventas')
      console.log(response.data.payload)
      setVentas(response.data.payload)
    }catch (err){
      console.log(err)
    }
  }

