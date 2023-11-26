import axios from 'axios';
const BASE_URL = 'http://localhost:8084';


// post
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
const criteriaAPI = { createCriteria };
export default criteriaAPI;
