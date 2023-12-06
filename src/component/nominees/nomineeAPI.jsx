import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// create
export const createNominee = async (obj) => {
  const response = await axios.post(`${BASE_URL}/nomineeObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  
  return data;
};

// GET
export const getNominee = async (userId) => {
  const response = await axios.get(`${BASE_URL}/nomineeObj/?${userId}`);
  const data = await response.data[0];
  
  if (data) {
    return data;
  }
  return {};
};

//update
export const updateNominee = async (obj) => {
 
  const response = await axios.put(
    `${BASE_URL}/nomineeObj/${obj.userId}`,
    obj,
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const data = await response.data;
  return data;
};


// DELETE

export const deleteNominee = async (id) => {
 await axios.delete(
    `${BASE_URL}/nomineeObj/${id}`
  );
  // const data = await response.data;
  // return data;
};

const nomineeAPI = { createNominee, getNominee, updateNominee, deleteNominee };
export default nomineeAPI;
