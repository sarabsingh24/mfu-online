import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// post
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
const secondAPI = { createSecondHolder };
export default secondAPI;
