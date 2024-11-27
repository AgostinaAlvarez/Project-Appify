import { getProveedorById } from "../../api/Proveedores/getProveedorById"

export const getProveedorByIdFunction = async(userId,proveedorId,setError,setLoading) =>{
    const response = await getProveedorById(userId,proveedorId,setError,setLoading)
    return response
}
  
  