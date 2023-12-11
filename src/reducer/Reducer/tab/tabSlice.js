import { createSlice } from "@reduxjs/toolkit";
import { stepsList } from "../../../common/tabs/Data";

const initialState = {
  tabsCreater: stepsList,
  stepsCount: 0,
  openForm: "CRI",
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    reset: (state) => {
      state.tabsCreater = stepsList;
      state.stepsCount = 0;
      state.stateopenForm = 'CRI';
    },
    tabUpdate: (state, action) => {
      state.tabsCreater = action.payload;
    },
    pageCount: (state, action) => {
      console.log(action.payload);
      state.stepsCount = action.payload;
    },
    nextSection: (state, action) => {
      state.openForm = action.payload;
    },
    switchPanel: (state, action) => {
      state.openForm = action.payload;
    },
  },
});


export const { reset, tabUpdate, pageCount, nextSection, switchPanel } =
  tabSlice.actions;
export default tabSlice.reducer;