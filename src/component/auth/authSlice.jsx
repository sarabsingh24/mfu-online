import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from './authAPI';

const initialState = {
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  IslogedIn:'false'
};

export const registerUserAsync = createAsyncThunk(
  'user/create',
  async (obj, thunkAPI) => {
    try {
      return await authAPI.registerUser(obj);
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

export const getUserAsync = createAsyncThunk(
  'user/get',
  async (obj, thunkAPI) => {
    try {
      return await authAPI.getUser(obj);
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

export const updateUserAsync = createAsyncThunk(
  'user/update',
  async (obj, thunkAPI) => {
    try {
      return await authAPI.updateUser(obj);
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

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
   
  },
  extraReducers: (builder) => {
    builder
      //create bank account
      .addCase(registerUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get bank account
      .addCase(getUserAsync.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.IslogedIn=true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.IslogedIn = false;
        state.message = action.payload;
      })
      //update bank account
      .addCase(updateUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = authSlice;

export const { logout } = actions;
export default reducer;
