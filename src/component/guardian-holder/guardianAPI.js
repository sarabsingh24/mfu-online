import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// POST
export const createGuardianHolder = async (obj) => {
  const response = await axios.post(`${BASE_URL}/guardianHolderObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;

  return data;
};

// GET
export const getGuardianHolder = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/guardianHolderObj/?userId=${userId}`
  );
  const data = await response.data[0];
console.log('guardianAPI', data)
  if (data) {
    return data;
  }
  return {};
};

// PUT
export const updateGuardianHolderAsync = async (obj) => {
  const response = await axios.put(
    `${BASE_URL}/guardianHolderObj/${obj.userId}`,
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


// DELETE
export const deleteGuardianHolder = async (id) => {
  const response = await axios.delete(`${BASE_URL}/guardianHolderObj/${id}`);
  const data = await response.data;
  return data;
};

const guardianAPI = {
  createGuardianHolder,
  getGuardianHolder,
  updateGuardianHolderAsync,
  deleteGuardianHolder,
};
export default guardianAPI;
