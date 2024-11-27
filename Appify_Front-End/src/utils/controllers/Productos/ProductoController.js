import { getProductById } from "../../api/Productos/getProductoById"

export const getProductoByIdFunction = async(userId,productId,setError,setLoading) =>{
    const response = await getProductById(userId,productId,setError,setLoading)
    return response
}
  
  