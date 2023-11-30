import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// POST
export const createPrimaryHolder = async (obj) => {
  const response = await axios.post(`${BASE_URL}/primeHolderObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  console.log('api', data);
  return data;
};

// GET
export const getPrimaryHolder = async (userId) => {
  
  const response = await axios.get(
    `${BASE_URL}/primeHolderObj/?userId=${userId}`,
  );
  const data = await response.data[0];
  console.log('api', data);
  if (data) {return data};
};

// PUT
export const updatePrimaryHolder = async (obj) => {
 
  const response = await axios.put(
    `${BASE_URL}/primeHolderObj/${obj.userId}`, obj, {
      headers:{
        'content-type':'application/json'
      }
    }
  );
  const data = await response.data;
  console.log('api', data);
  return data;
};


const primaryAPI = {
  createPrimaryHolder,
  getPrimaryHolder,
  updatePrimaryHolder,
};
export default primaryAPI;
