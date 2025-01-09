import { createSlice } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/Question';

// 单个组件类型
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden: boolean;
  props: ComponentPropsType;
};

// 组件列表类型
export type ComponentsStateType = {
  componentList: ComponentInfoType[];
  selectedId: string;
};

// 初始化组件列表
const initialState: ComponentsStateType = {
  componentList: [],
  selectedId: '',
};

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    // 重置组件列表
    resetComponents: (state, action) => {
      state.componentList = action.payload.componentList;
      state.selectedId = action.payload.selectedId;
    },
    // 设置选中的组件
    changeSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { resetComponents, changeSelectedId } = componentsSlice.actions;
export default componentsSlice.reducer;
