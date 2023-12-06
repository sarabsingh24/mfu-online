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

  return data;
};

// GET
export const getSecondHolder = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/secondHolderObj/?userId=${userId}`
  );
  const data = await response.data[0];

  if (data) {
    return data;
  }
  return {};
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
  return data;
};

// DELETE
export const deleteSecondHolder = async (id) => {
    await axios.delete(
    `${BASE_URL}/secondHolderObj/${id}`
  );

  //  if (response.statusText === 'OK') {
  //    console.log(response);
  //    return { message: 'The item got successfully deleted', error: false };
  //  }
};

const secondAPI = {
  createSecondHolder,
  getSecondHolder,
  updateSecondHolder,
  deleteSecondHolder,
};
export default secondAPI;
