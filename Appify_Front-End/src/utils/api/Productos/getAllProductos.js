import axios from "axios";

export const getAllProductos = async (id) => {
    try {
      const response = await axios.get(`https://appify-black-side.vercel.app/products/products/${id}`);
      return response.data.data; 
    } catch (err) {
      return null
    }
};



  