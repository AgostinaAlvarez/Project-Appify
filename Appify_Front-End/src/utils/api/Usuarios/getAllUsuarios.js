import axios from "axios";

export const getAllUsuarios = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/subusers/${id}`);
      return response.data.data; 
    } catch (err) {
      return null
    }
  };

  
  