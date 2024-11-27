import axios from "axios";

export const getAllClientes = async (userId) => {
    try {
      const response = await axios.get(`https://appify-black-side.vercel.app/clientes/clientes/${userId}`);
      console.log(response.data)
      return response.data.data; 
    } catch (err) {
        console.log(err)
      return null
    }
};

  