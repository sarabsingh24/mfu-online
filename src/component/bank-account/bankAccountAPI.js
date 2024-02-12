import axios from 'axios';

// bank proof
export const getBankProof = async (userId) => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = await response.data;
  let newData = [{ value: '', label: 'Select Bank Name' }];

  for (let k of data) {
    newData.push({ label: k.name, value: k.name });
  }

  if (data) {
    return newData;
  }
  return [];
};

const bankAccountAPI = {
  getBankProof,
};
export default bankAccountAPI;
