import React, { FC, useState } from 'react';

import classNames from 'classnames';
import { message, Input, Button, Space } from 'antd';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
// import SortableContainer from '../../../components/DragSortable/SortableContainer';
// import SortableItem from '../../../components/DragSortable/SortableItem';

import { useDispatch } from 'react-redux';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import {
  changeSelectedId,
  changeComponentTitle,
  toggleSelectedComponentLock,
  hideSelectedComponent,
  //   moveComponent,
} from '../../../store/componentsReducer';

import styles from './Layers.module.scss';

const Layers: FC = () => {
  // 获取组件列表和当前选中的组件
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  // 记录当前正在修改标题的组件(就会显示input框)
  const [changingTitleId, setChangingTitleId] = useState('');

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id);

    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件');
      return;
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId('');
      return;
    }
    // 点击修改标题id
    setChangingTitleId(fe_id);
  }

  // 修改标题
  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  }

  // 修改组件隐藏状态
  function changeHidden() {
    dispatch(hideSelectedComponent());
  }

  function changeLocked() {
    dispatch(toggleSelectedComponentLock());
  }

  //   // 拖拽排序结束
  //   function handleDragEnd(oldIndex: number, newIndex: number) {
  //     dispatch(moveComponent({ oldIndex, newIndex }));
  //   }
  //   // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  //   const componentListWithId = componentList.map(c => {
  //     return { ...c, id: c.fe_id };
  //   });

  return (
    <>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c;

        // 拼接 title className
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId, //与canvas中的组件选中状态关联
        });
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => handleTitleClick(fe_id)}
            >
              {fe_id === changingTitleId ? (
                <Input
                  value={title}
                  onChange={handleTitleChange}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => setChangingTitleId('')}
                />
              ) : (
                title
              )}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size='small'
                  shape='circle'
                  className={!isHidden ? styles.btn : ''}
                  type={isHidden ? 'primary' : 'text'}
                  icon={<EyeInvisibleOutlined />}
                  onClick={() => {
                    changeHidden();
                  }}
                />
                <Button
                  size='small'
                  shape='circle'
                  className={!isLocked ? styles.btn : ''}
                  type={isLocked ? 'primary' : 'text'}
                  icon={<LockOutlined />}
                  onClick={() => {
                    changeLocked();
                  }}
                />
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Layers;
