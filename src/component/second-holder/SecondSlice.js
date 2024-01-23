import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import secondAPI from './SecondAPI';

const initialState = {
  secondHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  taxResidency: 'N',
};

export const createSecondHolderAsync = createAsyncThunk(
  'second/create',
  async (obj, thunkAPI) => {
   
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

export const deleteSecondHolderAsync = createAsyncThunk(
  'second/delete',
  async (id, thunkAPI) => {
    try {
      return await secondAPI.deleteSecondHolder(id);
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
    changeTaxResidency: (state, action) => {
      state.taxResidency = action.payload;
    },
    createSecondHolderOBJ: (state, action) => {
      state.secondHolderObj = {
        holderType: 'PR',
        residencePhoneNo: '',
        relationship: '01',
        relationshipProof: '01',
        panExemptFlag: action.payload.panExemptFlag,
        panPekrnNo: action.payload.panPekrnNo,
        name: action.payload.name,
        dateOfBirth: action.payload.dateOfBirth,
        contactDetail: {
          primaryEmail: action.payload.contactDetail.primaryEmail,
          mobileIsdCode: action.payload.contactDetail.mobileIsdCode,
          primaryMobileNo: action.payload.contactDetail.primaryMobileNo,
        },
        otherDetail: {
          otherInfo: 'string',
          grossIncome: action.payload.otherDetail.grossIncome
            ? action.payload.otherDetail.grossIncome
            : '',
          netWorth: action.payload.otherDetail.netWorth
            ? action.payload.otherDetail.netWorth
            : '',
          netWorthDate: action.payload.otherDetail.netWorthDate
            ? action.payload.otherDetail.netWorthDate
            : '',
          sourceOfWealth: action.payload.otherDetail.sourceOfWealth,
          sourceOfWealthOthers: action.payload.otherDetail.sourceOfWealthOthers,
          occupation: action.payload.otherDetail.occupation,
          occupationOthers: action.payload.otherDetail.occupationOthers,
          kraAddressType: action.payload.otherDetail.kraAddressType,
          pep: action.payload.otherDetail.pep,
        },
        fatcaDetail: {
          taxResidencyFlag: action.payload.fatcaDetail.taxResidencyFlag,
          birthCity: action.payload.fatcaDetail.birthCity,
          birthCountry: action.payload.fatcaDetail.birthCountry,
          citizenshipCountry: action.payload.fatcaDetail.citizenshipCountry,
          nationalityCountry: action.payload.fatcaDetail.nationalityCountry,
          taxRecords: {
            taxCountry: action.payload.fatcaDetail.taxRecords.taxCountry,
            taxReferenceNo:
              action.payload.fatcaDetail.taxRecords.taxReferenceNo,
            identityType: action.payload.fatcaDetail.taxRecords.identityType,
          },
        },
      };
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
    //DELETE secondary holder
    // .addCase(deleteSecondHolderAsync.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(deleteSecondHolderAsync.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.message = action.payload;
    // })
    // .addCase(deleteSecondHolderAsync.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

const { actions, reducer } = secondSlice;

export const { reset, createSecondHolderOBJ, changeTaxResidency } = actions;
export default reducer;
