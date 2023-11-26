import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// post
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
const thirdAPI = { createThirdHolder };
export default thirdAPI;
