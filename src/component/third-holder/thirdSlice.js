import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import thirdAPI from './thirdAPI';

const initialState = {
  thirdHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
};

export const createThirdHolderAsync = createAsyncThunk(
  'third/create',
  async (obj, thunkAPI) => {
    
    try {
      return await thirdAPI.createThirdHolder(obj);
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

export const getThirdHolderAsync = createAsyncThunk(
  'third/get',
  async (userId, thunkAPI) => {
    try {
      return await thirdAPI.getThirdHolder(userId);
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

export const updateThirdHolderAsync = createAsyncThunk(
  'third/update',
  async (obj, thunkAPI) => {
    try {
      return await thirdAPI.updateThirdHolder(obj);
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

export const thirdSlice = createSlice({
  name: 'third',
  initialState,
  reducers: {
    reset: (state) => {
      state.thirdHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      //POST can creteria form
      .addCase(createThirdHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createThirdHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.thirdHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(createThirdHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //GET can creteria form
      .addCase(getThirdHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getThirdHolderAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.thirdHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getThirdHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //UPDATE can creteria form
      .addCase(updateThirdHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateThirdHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.thirdHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateThirdHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = thirdSlice;

export const { reset } = actions;
export default reducer;
