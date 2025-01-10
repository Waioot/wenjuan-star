import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { ComponentPropsType } from '../../components/Question';
import { getNextSelectedComponentId, insertNewComponent } from './utils';
import cloneDeep from 'lodash.clonedeep';
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
  copiedComponent: ComponentInfoType | null;
};

// 初始化组件列表
const initialState: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
};

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    // 重置组件列表
    resetComponents: (state, action) => {
      state.componentList = action.payload.componentList;
      state.selectedId = action.payload.selectedId;
      state.copiedComponent = null;
    },
    // 设置选中的组件id
    changeSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    // 添加组件
    addComponent: (state, action) => {
      const newComponent = {
        ...action.payload,
      };
      insertNewComponent(state, newComponent);
      // // 当前组件列表中寻找被选中的 id
      // const index = state.componentList.findIndex(
      //   c => c.fe_id === state.selectedId
      // );
      // if (index < 0) {
      //   // 如果未选中，则添加到组件列表中
      //   state.componentList.push(newComponent);
      // } else {
      //   // 如果选中，则插入到 index 后面
      //   state.componentList.splice(index + 1, 0, newComponent);
      // }
      // // 更新选中 id
      // state.selectedId = newComponent.fe_id;
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
      if (!state.selectedId) return;
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
      if (!state.selectedId) return;
      const targetComponent = state.componentList.find(
        c => c.fe_id === state.selectedId
      );
      if (!targetComponent) return;
      targetComponent.isLocked = !targetComponent.isLocked;
    },
    // 复制选中的组件存储到 redux
    copySelectedComponent: state => {
      const targetComponent = state.componentList.find(
        c => c.fe_id === state.selectedId
      );
      if (!targetComponent) return;
      state.copiedComponent = cloneDeep(targetComponent);
    },
    // 粘贴选中的组件
    pasteCopiedComponent: state => {
      if (!state.copiedComponent) return;
      // 修改 copiedComponent 的 fe_id
      state.copiedComponent.fe_id = nanoid();
      // 插入组件
      insertNewComponent(state, state.copiedComponent);
    },
    // 选中上一个组件
    selectPrevComponent: state => {
      const selectedIndex = state.componentList.findIndex(
        c => c.fe_id === state.selectedId
      );

      if (selectedIndex < 0) return; // 如果没选中组件，则不进行任何操作
      if (selectedIndex <= 0) return; // 如果当前组件是第一个组件，则不进行任何操作

      state.selectedId = state.componentList[selectedIndex - 1].fe_id;
    },
    // 选中下一个组件
    selectNextComponent: state => {
      const selectedIndex = state.componentList.findIndex(
        c => c.fe_id === state.selectedId
      );
      if (selectedIndex < 0) return; // 如果没选中组件，则不进行任何操作
      if (selectedIndex + 1 === state.componentList.length) return; // 如果当前组件是最后一个组件，则不进行任何操作
      state.selectedId = state.componentList[selectedIndex + 1].fe_id;
    },

    // 修改组件标题
    changeComponentTitle: (state, action) => {
      const { fe_id, title } = action.payload;
      const targetComponent = state.componentList.find(c => c.fe_id === fe_id);
      if (!targetComponent) return;
      targetComponent.title = title;
    },

    // TODO 上移、下移、撤销、重做
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
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = componentsSlice.actions;
export default componentsSlice.reducer;
