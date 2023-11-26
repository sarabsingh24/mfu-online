import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// create
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


//update
export const updateBankAccount = async (obj) => {
  const response = await axios.put(`${BASE_URL}/bankAccountsObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  console.log('api', data);
  return data;
};

const bankAccountAPI = { createBankAccount, updateBankAccount };
export default bankAccountAPI;
