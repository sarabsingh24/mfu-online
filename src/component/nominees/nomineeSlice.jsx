import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  nomineeObj: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  nomineeCountNum:1
};





export const nomineeSlice = createSlice({
  name: 'nominee',
  initialState,
  reducers: {
    reset: (state) => {
      state.thirdHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    nomineeCountAction: (state, action) => {
      state.nomineeCountNum = action.payload;
    },
    createNomineeOBJ: (state, action) => {
      state.nomineeObj = action.payload;
    },
    deleteNomineeObj: (state, action) => {
      state.nomineeObj = [];
    },
  },
  
});

const { actions, reducer } = nomineeSlice;

export const { reset, nomineeCountAction, createNomineeOBJ, deleteNomineeObj } =
  actions;
export default reducer;
