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

export const createSecondHolderAsync = createAsyncThunk(
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


export const getSecondHolderAsync = createAsyncThunk(
  'second/get',
  async (userId, thunkAPI) => {
    console.log('slice', userId);
    try {
      return await secondAPI.getSecondHolder(userId);
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

export const updateSecondHolderAsync = createAsyncThunk(
  'second/update',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
    try {
      return await secondAPI.updateSecondHolder(obj);
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
      //POST secondary holder
      .addCase(createSecondHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSecondHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.secondHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(createSecondHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //GET secondary holder
      .addCase(getSecondHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSecondHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.secondHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getSecondHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //UPDATE secondary holder
      .addCase(updateSecondHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSecondHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.secondHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateSecondHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = secondSlice;

export const { reset } = actions;
export default reducer;
