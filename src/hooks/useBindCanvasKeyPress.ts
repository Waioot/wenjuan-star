import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer';

function isActiveElement() {
  const activeElement = document.activeElement;
  if (activeElement === document.body) return true;
  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElement()) {
      dispatch(deleteSelectedComponent());
    }
  });
  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElement()) {
      dispatch(copySelectedComponent());
    }
  });
  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElement()) {
      dispatch(pasteCopiedComponent());
    }
  });
  // 选中上一个
  useKeyPress('uparrow', () => {
    if (isActiveElement()) {
      dispatch(selectPrevComponent());
    }
  });
  // 选中下一个
  useKeyPress('downarrow', () => {
    if (isActiveElement()) {
      dispatch(selectNextComponent());
    }
  });
}

export default useBindCanvasKeyPress;
