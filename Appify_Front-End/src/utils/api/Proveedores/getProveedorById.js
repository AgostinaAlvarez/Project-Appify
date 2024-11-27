import axios from "axios";

export const getProveedorById = async (userId,proveedorId,setError,setLoading) => {
  setLoading(true)
  try {
    const response = await axios.get(`http://localhost:8080/proveedores/detail/${userId}/${proveedorId}`)
    console.log(response)
    setError(false)
    return response.data.data; // Devuelve los datos en caso de éxito
  } catch (err) {
    console.log(err)
    setError(true)
    return null
  }finally {
    setLoading(false)
  }
};
