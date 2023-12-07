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
export const getUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  const data = await response.data;

  if (data) {
    return data;
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
