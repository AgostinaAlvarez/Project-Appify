import axios from "axios"

export const createProducto = async (data,setLoading,setError) =>{
    setLoading(true)
    try{
        const response = await axios.post(`https://appify-black-side.vercel.app/products/product`,data)
        console.log(response)
        setError(false)
        return response.data.product
    }catch(err){
        console.log(err)
        setError(true)
        return null
    }finally{
        setLoading(false)
    }
}