import { Space, Tooltip, Button } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  deleteSelectedComponent,
  hideSelectedComponent,
  toggleSelectedComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
} from '../../../store/componentsReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

const EditToolbar = () => {
  const dispatch = useDispatch();
  const { selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

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
    </Space>
  );
};

export default EditToolbar;
