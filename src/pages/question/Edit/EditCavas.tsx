import { MouseEvent } from 'react';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './EditCavas.module.scss';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import classNames from 'classnames';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { getComponentConfigByType } from '../../../components/Question';
import { changeSelectedId } from '../../../store/componentsReducer';
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress';
import { moveComponent } from '../../../store/componentsReducer';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../components/DragSortable/SortableItem';
type EditCavasPropsType = {
  loading: boolean;
};

function getComponent(c: ComponentInfoType) {
  const { type, props } = c;
  const componentConfig = getComponentConfigByType(type);
  if (!componentConfig) return null;
  const { Component } = componentConfig;
  return <Component {...props} />;
}

function EditCavas({ loading }: EditCavasPropsType) {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); // 阻止事件冒泡
    dispatch(changeSelectedId(id));
  }

  // 绑定快捷键
  useBindCanvasKeyPress();

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin />
      </div>
    );

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id };
  });
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.cavas}>
        {componentList
          .filter(c => !c.isHidden)
          .map((c: ComponentInfoType) => {
            const { fe_id, isLocked } = c;
            return (
              <SortableItem id={fe_id} key={fe_id}>
                <div
                  className={classNames(styles['component-wrapper'], {
                    [styles.selected]: fe_id === selectedId,
                    [styles.locked]: isLocked,
                  })}
                  key={fe_id}
                  onClick={e => handleClick(e, fe_id)}
                >
                  <div className={styles.components}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
}

export default EditCavas;
