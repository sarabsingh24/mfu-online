import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// POST
export const createThirdHolder = async (obj) => {
  const response = await axios.post(`${BASE_URL}/thirdHolderObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;

  return data;
};

// GET
export const getThirdHolder = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/thirdHolderObj/?userId=${userId}`
  );
  const data = await response.data[0];

  if (data) {
    return data;
  }
  return {};
};

// UPDATE
export const updateThirdHolder = async (obj) => {
  const response = await axios.put(
    `${BASE_URL}/thirdHolderObj/${obj.userId}`,
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
export const deleteThirdHolder = async (id) => {
  await axios.delete(
    `${BASE_URL}/thirdHolderObj/${id}`
  );
  // if(response.statusText === 'OK'){
  //   console.log(response);
  //   return { message: 'The item got successfully deleted', error: false };
  // }
  
};


const thirdAPI = {
  createThirdHolder,
  getThirdHolder,
  updateThirdHolder,
  deleteThirdHolder,
};
export default thirdAPI;
