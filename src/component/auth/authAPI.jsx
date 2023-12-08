import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// create
export const registerUser = async (obj) => {
  const response = await axios.post(`${BASE_URL}/users`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;

  return data;
};

// GET
export const getUser = async (obj) => {
  const response = await axios.get(`${BASE_URL}/users`);
  const data = await response.data;

const filterUser = data.find(user => user.email === obj.email)

  if (data) {
    return filterUser;
  }
  return {};
};

//update
export const updateUser = async (obj) => {
  const response = await axios.put(`${BASE_URL}/users/${obj.userId}`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  
  return data;
};

const bankAccountAPI = { registerUser, getUser, updateUser };
export default bankAccountAPI;
