import { createSlice } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/Question';
import { getNextSelectedComponentId } from './utils';
// 单个组件类型
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
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
    // 删除画布中选中的组件
    deleteSelectedComponent: state => {
      const selectedIndex = state.componentList.findIndex(
        c => c.fe_id === state.selectedId
      );

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedComponentId(
        state.selectedId,
        state.componentList
      );

      if (selectedIndex < 0) return;
      state.componentList.splice(selectedIndex, 1);
      // 更新选中 id
      state.selectedId = newSelectedId;
    },
    // 隐藏/显示 选中的组件
    hideSelectedComponent: state => {
      const targetComponent = state.componentList.find(
        c => c.fe_id === state.selectedId
      );
      if (!targetComponent) return;

      // 重新计算 selectedId

      let newSelectedId = '';
      // 如果是隐藏当前组件，则选中下一个组件的 id
      if (targetComponent?.isHidden) {
        newSelectedId = getNextSelectedComponentId(
          state.selectedId,
          state.componentList
        );
      } else {
        // 如果是显示当前组件，选中当前组件的 id
        newSelectedId = targetComponent.fe_id;
      }
      // 更新选中 id
      state.selectedId = newSelectedId;

      if (targetComponent) targetComponent.isHidden = !targetComponent.isHidden;
    },
    // 锁定/解锁 选中的组件
    toggleSelectedComponentLock: state => {
      const targetComponent = state.componentList.find(
        c => c.fe_id === state.selectedId
      );
      if (!targetComponent) return;
      targetComponent.isLocked = !targetComponent.isLocked;
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent,
  hideSelectedComponent,
  toggleSelectedComponentLock,
} = componentsSlice.actions;
export default componentsSlice.reducer;
