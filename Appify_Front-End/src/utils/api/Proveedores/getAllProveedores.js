import axios from "axios";

export const getAllProveedores = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/proveedores/${id}`);
      return response.data.data; 
    } catch (err) {
      return null
    }
};

  