import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bankAccountAPI from './bankAccountAPI';

const initialState = {
  bankAccountsObj: [],
  bankProofList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  accountCountNum: 1,
};

export const getBankProofAsync = createAsyncThunk(
  'bankAccount/getproof',
  async (obj, thunkAPI) => {
    try {
      return await bankAccountAPI.getBankProof(obj);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const bankAccountSlice = createSlice({
  name: 'bankAccount',
  initialState,
  reducers: {
    reset: (state) => {
      state.bankAccountsObj = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    accountsFun: (state, action) => {
      state.accountCountNum = action.payload;
    },
    createBankAccountOBJ: (state, action) => {
      state.bankAccountsObj = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     
      //get bank proof
      .addCase(getBankProofAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBankProofAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bankProofList = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getBankProofAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = bankAccountSlice;

export const { reset, accountsFun, createBankAccountOBJ } = actions;
export default reducer;
