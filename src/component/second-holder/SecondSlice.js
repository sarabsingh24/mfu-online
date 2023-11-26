import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import secondAPI from './SecondAPI';

const initialState = {
  secondHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
};

export const secondHolderCreateAsync = createAsyncThunk(
  'second/create',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
    try {
      return await secondAPI.createSecondHolder(obj);
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

export const secondSlice = createSlice({
  name: 'second',
  initialState,
  reducers: {
    reset: (state) => {
      state.secondHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      //push can creteria form
      .addCase(secondHolderCreateAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(secondHolderCreateAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.secondHolderObj = action.payload;
      })
      .addCase(secondHolderCreateAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = secondSlice;

export const { reset } = actions;
export default reducer;
