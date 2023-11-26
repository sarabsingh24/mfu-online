import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import primaryAPI from './primaryAPI';

const initialState = {
  primeHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
};

export const primaryHolderCreateAsync = createAsyncThunk(
  'primary/create',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
    try {
      return await primaryAPI.createPrimaryHolder(obj);
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

export const primarySlice = createSlice({
  name: 'primary',
  initialState,
  reducers: {
    reset: (state) => {
      state.primeHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      //push can creteria form
      .addCase(primaryHolderCreateAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(primaryHolderCreateAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.primeHolderObj = action.payload;
      })
      .addCase(primaryHolderCreateAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = primarySlice;

export const { reset } = actions;
export default reducer;
