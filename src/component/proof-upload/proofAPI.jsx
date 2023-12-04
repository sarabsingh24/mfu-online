import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// POST
export const createProofData = async (obj) => {
    console.log('before post',obj)
  
  const response = await axios.post(`${BASE_URL}/proofUploadObj`, obj, {
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
  });
  const data = await response.data;
  console.log('api', data);
  return data;
};

// GET
export const getProofData = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/proofUploadObj/?userId=${userId}`
  );
  const data = await response.data[0];
  console.log('api', data);
  if (data) {
    return data;
  }
  return {};
};

// PUT
export const updateProofData = async (obj) => {
    console.log(obj)
  const response = await axios.put(
    `${BASE_URL}/proofUploadObj/${obj.userId}`,
    obj.proofs,
    {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    }
  );
  const data = await response.data;
  console.log('api', data);
  return data;
};

const proofAPI = {
  createProofData,
  getProofData,
  updateProofData,
};
export default proofAPI;
