import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bankAccountAPI from './bankAccountAPI';

const initialState = {
  bankAccountsObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  accountCountNum: 1,
};

export const bankAccountFormAsync = createAsyncThunk(
  'bankAccount/create',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
    try {
      return await bankAccountAPI.createBankAccount(obj);
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
export const updateBankAccountAsync = createAsyncThunk(
  'bankAccount/update',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
    try {
      return await bankAccountAPI.updateBankAccount(obj);
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
      state.bankAccountsObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    accountsFun: (state, action) => {
      console.log('slice', action.payload);
      state.accountCountNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //create bank account
      .addCase(bankAccountFormAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bankAccountFormAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bankAccountsObj = action.payload;
      })
      .addCase(bankAccountFormAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //update bank account
      .addCase(updateBankAccountAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBankAccountAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bankAccountsObj = action.payload;
      })
      .addCase(updateBankAccountAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = bankAccountSlice;

export const { reset, accountsFun } = actions;
export default reducer;
