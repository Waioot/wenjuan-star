import { Space, Tooltip, Button } from 'antd';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  deleteSelectedComponent,
  hideSelectedComponent,
  toggleSelectedComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '../../../store/componentsReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

const EditToolbar = () => {
  const dispatch = useDispatch();
  const { componentList, selectedId, copiedComponent } = useGetComponentInfo();

  // 添加获取选中组件的逻辑
  const selectedComponent = componentList.find(c => c.fe_id === selectedId);
  const { isLocked } = selectedComponent || {};

  const len = componentList.length;
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === len - 1;
  // 删除画布中选中的组件
  function handleDelete() {
    dispatch(deleteSelectedComponent());
  }
  // 隐藏/显示 画布中选中的组件
  function handleHide() {
    dispatch(hideSelectedComponent());
  }
  // 锁定/解锁 选中的组件
  function handleLock() {
    dispatch(toggleSelectedComponentLock());
  }
  // 复制选中的组件
  function handleCopy() {
    dispatch(copySelectedComponent());
  }
  // 粘贴选中的组件
  function handlePaste() {
    // 如果选中的组件是空，则不粘贴
    if (!copiedComponent) return;
    dispatch(pasteCopiedComponent());
  }

  // 上移、下移
  function handleMove(type: 'up' | 'down') {
    if (isFirst && type === 'up') return;
    if (isLast && type === 'down') return;

    if (type === 'up') {
      dispatch(
        moveComponent({
          oldIndex: selectedIndex,
          newIndex: selectedIndex - 1,
        })
      );
    } else {
      dispatch(
        moveComponent({
          oldIndex: selectedIndex,
          newIndex: selectedIndex + 1,
        })
      );
    }
  }

  // 撤销
  function handleUndo() {
    dispatch(UndoActionCreators.undo());
  }
  // 重做
  function handleRedo() {
    dispatch(UndoActionCreators.redo());
  }

  return (
    <Space>
      <Tooltip title='删除'>
        <Button
          shape='circle'
          type='link'
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title='隐藏'>
        <Button
          shape='circle'
          type='link'
          icon={<EyeInvisibleOutlined />}
          onClick={handleHide}
        />
      </Tooltip>
      <Tooltip title='锁定'>
        <Button
          shape='circle'
          icon={<LockOutlined />}
          type={isLocked ? 'primary' : 'default'}
          onClick={handleLock}
        />
      </Tooltip>
      <Tooltip title='复制'>
        <Button
          shape='circle'
          type='link'
          icon={<CopyOutlined />}
          onClick={handleCopy}
        />
      </Tooltip>
      <Tooltip title='粘贴'>
        <Button
          shape='circle'
          type='link'
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent === null}
        />
      </Tooltip>

      <Tooltip title='上移'>
        <Button
          shape='circle'
          type='link'
          icon={<UpOutlined />}
          onClick={() => handleMove('up')}
          disabled={isFirst}
        />
      </Tooltip>
      <Tooltip title='下移'>
        <Button
          shape='circle'
          type='link'
          icon={<DownOutlined />}
          onClick={() => handleMove('down')}
          disabled={isLast}
        />
      </Tooltip>

      <Tooltip title='撤销'>
        <Button
          shape='circle'
          type='link'
          icon={<UndoOutlined />}
          onClick={handleUndo}
        />
      </Tooltip>
      <Tooltip title='重做'>
        <Button
          shape='circle'
          type='link'
          icon={<RedoOutlined />}
          onClick={handleRedo}
        />
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
