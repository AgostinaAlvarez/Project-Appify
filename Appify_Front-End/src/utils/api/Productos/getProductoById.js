import axios from "axios";

export const getProductById = async (userId,productId,setError,setLoading) => {
  setLoading(true)
  try {
    const response = await axios.get(`https://appify-black-side.vercel.app/products/product/${productId}`)
    console.log(response)
    setError(false)
    return response.data; // Devuelve los datos en caso de éxito
  } catch (err) {
    console.log(err)
    setError(true)
    return null
  }finally {
    setLoading(false)
  }
};
