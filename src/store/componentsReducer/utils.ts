import { ComponentInfoType, ComponentsStateType } from './index';

// 获取下一个组件的 selectedId
export function getNextSelectedComponentId(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  const filteredComponentList = componentList.filter(c => !c.isHidden);
  const currentIndex = filteredComponentList.findIndex(c => c.fe_id === fe_id);
  // 如果当前组件不存在，则返回空字符串
  if (currentIndex < 0) return '';
  let newSelectedId = '';
  const length = filteredComponentList.length;

  if (length <= 1) {
    // 如果组件列表长度小于等于 1，则返回空字符串
    newSelectedId = '';
  } else {
    // 如果组件列表长度大于 1
    if (currentIndex < length - 1) {
      // 如果当前组件不是最后一个组件，则返回下一个组件的 id
      newSelectedId = filteredComponentList[currentIndex + 1].fe_id;
    } else {
      // 如果当前组件是最后一个组件，则返回第一个组件的 id
      newSelectedId = filteredComponentList[0].fe_id;
    }
  }
  return newSelectedId;
}

export function insertNewComponent(
  state: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const index = state.componentList.findIndex(
    c => c.fe_id === state.selectedId
  );
  if (index < 0) {
    // 未选中任何组件，则添加到组件列表中
    state.componentList.push(newComponent);
  } else {
    // 选中组件，则插入到选中组件后面
    state.componentList.splice(index + 1, 0, newComponent);
  }
  // 更新选中 id
  state.selectedId = newComponent.fe_id;
}
