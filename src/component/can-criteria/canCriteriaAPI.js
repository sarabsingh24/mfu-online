import axios from 'axios';
const BASE_URL = 'http://localhost:8084';

// create
export const createCriteria = async (obj) => {
  const response = await axios.post(`${BASE_URL}/canCriteriaObj`, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  console.log('api', data);
  return data;
};

// get
export const getCriteria = async (userId) => {
  
  const response = await axios.get(
    `${BASE_URL}/canCriteriaObj/?userId=${userId}`
  );
  const data = await response.data[0];

  return data;
};

//updateCriteria
export const updateCriteria = async (obj) => {
  const response = await axios.patch(
    `${BASE_URL}/canCriteriaObj/${obj.userId}`,
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

const criteriaAPI = { createCriteria, getCriteria, updateCriteria };
export default criteriaAPI;
