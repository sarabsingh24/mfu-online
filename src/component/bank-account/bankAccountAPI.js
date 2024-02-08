import axios from 'axios';
const BASE_URL = 'http://localhost:8084';



// bank proof
export const getBankProof = async (userId) => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = await response.data;
  let newData = [{ value: '', label: 'Select Bank Name' }];

  for (let k of data){
    newData.push({ label: k.name, value: k.name });
  }
  

  if (data) {
    return newData;
  }
  return [];
};


// create
export const createBankAccount = async (obj) => {
  const response = await axios.post(`${BASE_URL}/bankAccountsObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  return data;
};


// GET
export const getBankAccount = async (userId) => {
  const response = await axios.get(`${BASE_URL}/bankAccountsObj/${userId}`);
  const data = await response.data;
  
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

const bankAccountAPI = {
  createBankAccount,
  getBankAccount,
  updateBankAccount,
  getBankProof,
};
export default bankAccountAPI;
