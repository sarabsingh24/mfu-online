import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// POST
export const createThirdHolder = async (obj) => {
  const response = await axios.post(`${BASE_URL}/thirdHolderObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  console.log('api', data);
  return data;
};

// GET
export const getThirdHolder = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/thirdHolderObj/?userId=${userId}`
  );
  const data = await response.data[0];
  console.log('api', data);
  if (data) {
    return data;
  }
    return {};
  
};


// UPDATE
export const updateThirdHolder = async (obj) => {
  const response = await axios.put(
    `${BASE_URL}/thirdHolderObj/${obj.userId}`, obj, {
      headers:{
        'content-type':'application/json'
      }
    }
  );
  const data = await response.data[0];
  console.log('api', data);
  return data;
};
const thirdAPI = { createThirdHolder, getThirdHolder, updateThirdHolder };
export default thirdAPI;
