import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// POST
export const createSecondHolder = async (obj) => {
  const response = await axios.post(`${BASE_URL}/secondHolderObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  console.log('api', data);
  return data;
};

// GET
export const getSecondHolder = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/secondHolderObj/?userId=${userId}`
  );
  const data = await response.data[0];
  console.log('api', data);
  if (data) {
    return data;
  }
  return {}
  
};

// GET
export const updateSecondHolder = async (obj) => {
  const response = await axios.put(
    `${BASE_URL}/secondHolderObj/${obj.userId}`,
    obj,
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const data = await response.data[0];
  console.log('api', data);
  return data;
};



const secondAPI = { createSecondHolder, getSecondHolder, updateSecondHolder };
export default secondAPI;
