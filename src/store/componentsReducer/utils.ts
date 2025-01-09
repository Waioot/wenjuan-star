import { ComponentInfoType } from './index';

// 获取下一个组件的 selectedId
export function getNextSelectedComponentId(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  const currentIndex = componentList.findIndex(c => c.fe_id === fe_id);
  // 如果当前组件不存在，则返回空字符串
  if (currentIndex < 0) return '';
  let newSelectedId = '';
  const length = componentList.length;

  if (length <= 1) {
    // 如果组件列表长度小于等于 1，则返回空字符串
    newSelectedId = '';
  } else {
    // 如果组件列表长度大于 1
    if (currentIndex < length - 1) {
      // 如果当前组件不是最后一个组件，则返回下一个组件的 id
      newSelectedId = componentList[currentIndex + 1].fe_id;
    } else {
      // 如果当前组件是最后一个组件，则返回第一个组件的 id
      newSelectedId = componentList[0].fe_id;
    }
  }
  return newSelectedId;
}
