import { createSlice } from '@reduxjs/toolkit';

export type PageInfoStateType = {
  title: string;
  desc: string;
  js: string;
  css: string;
  isPublished: boolean;
};

const initialState: PageInfoStateType = {
  title: '',
  desc: '',
  js: '',
  css: '',
  isPublished: false,
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState,
  reducers: {
    resetPageInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    // 修改问卷信息的标题
    updatePageTitle: (state, action) => {
      if (state.title !== action.payload) {
        state.title = action.payload;
      }
    },
  },
});

export const { resetPageInfo, updatePageTitle } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
