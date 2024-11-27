import { getAllClientes } from "./api/Clientes/getAllClientes.js";
import { createProducto } from "./api/Productos/createProducto.js";
import { getAllProductos } from "./api/Productos/getAllProductos.js";
import { getAllProveedores } from "./api/Proveedores/getAllProveedores.js";
import { getProveedorById } from "./api/Proveedores/getProveedorById.js";
import { getAllUsuarios } from "./api/Usuarios/getAllUsuarios.js";

export const fetchDataAfterLogin = async (userId) => {
    try {
      const [ 
        proveedoresData,
        usuariosData,
        productosData,
        clientesData
      ] = await Promise.all([
        getAllProveedores(userId),
        getAllUsuarios(userId),
        getAllProductos(userId),
        getAllClientes(userId)
      ]);
      
      return { proveedoresData, usuariosData, productosData, clientesData }

    } catch (error) {
      console.error('Error:', error.message);
    }
};


export const createProductFunction = async (setLoading,setError,data) => {
  const response = await createProducto(data,setLoading,setError)
  return response
}


export const getProveedorByIdFunction = async(userId,proveedorId) =>{
  const response = await getProveedorById(userId,proveedorId)
  return response
}

