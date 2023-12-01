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


// GET
export const getBankAccount = async (userId) => {
  const response = await axios.get(`${BASE_URL}/bankAccountsObj/?${userId}`);
  const data = await response.data[0];
  console.log('api', data);
  if (data) {
    return data;
  }
  return {};
};


//update
export const updateBankAccount = async (obj) => {
  const response = await axios.put(
    `${BASE_URL}/bankAccountsObj/${obj.userId}`,
    obj,
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const data = await response.data;
  console.log('api', data);
  return data;
};

const bankAccountAPI = { createBankAccount,getBankAccount, updateBankAccount };
export default bankAccountAPI;
