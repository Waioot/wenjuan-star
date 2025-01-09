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
    // 添加组件
    addComponent: (state, action) => {
      const newComponent = {
        ...action.payload,
      };

      // 当前组件列表中寻找被选中的 id
      const index = state.componentList.findIndex(
        c => c.fe_id === state.selectedId
      );
      if (index < 0) {
        // 如果未选中，则添加到组件列表中
        state.componentList.push(newComponent);
      } else {
        // 如果选中，则插入到 index 后面
        state.componentList.splice(index + 1, 0, newComponent);
      }
      // 更新选中 id
      state.selectedId = newComponent.fe_id;
    },

    // 修改组件属性
    changeComponentProps: (state, action) => {
      const { fe_id, newProps } = action.payload;
      const targetComponent = state.componentList.find(c => c.fe_id === fe_id);
      if (targetComponent) {
        targetComponent.props = {
          ...targetComponent.props,
          ...newProps,
        };
      }
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
} = componentsSlice.actions;
export default componentsSlice.reducer;
