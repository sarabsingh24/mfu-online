import axios from "axios";
// import {BASE_URL } from '../../../../utilis/constants'
const BASE_URL = 'http://localhost:8084';

// post request
export const createAccount = async (data) => {
    const response = await axios.post(
      "http://api.finnsysonline.com:81/mfu/v1/cans",
      data
    );
   return response.data;
 
};





const accountService = { createAccount };
export default accountService;
