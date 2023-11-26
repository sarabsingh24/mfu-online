import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// post
export const createBankAccount = async (obj) => {
  const response = await axios.post(`${BASE_URL}/bankAccountsObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  console.log('api', data);
  return data;
};
const bankAccountAPI = { createBankAccount };
export default bankAccountAPI;
