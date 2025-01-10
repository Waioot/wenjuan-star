import { createSlice } from '@reduxjs/toolkit';

export type PageInfoStateType = {
  title: string;
  desc: string;
  js: string;
  css: string;
};

const initialState: PageInfoStateType = {
  title: '',
  desc: '',
  js: '',
  css: '',
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState,
  reducers: {
    resetPageInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { resetPageInfo } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
