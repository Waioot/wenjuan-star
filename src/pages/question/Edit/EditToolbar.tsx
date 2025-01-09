import { Space, Tooltip, Button } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  deleteSelectedComponent,
  hideSelectedComponent,
  toggleSelectedComponentLock,
} from '../../../store/componentsReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

const EditToolbar = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
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
  return (
    <Space>
      <Tooltip title='删除'>
        <Button type='link' icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title='隐藏'>
        <Button
          type='link'
          icon={<EyeInvisibleOutlined />}
          onClick={handleHide}
        />
      </Tooltip>
      <Tooltip title='锁定'>
        <Button
          icon={<LockOutlined />}
          type={isLocked ? 'primary' : 'default'}
          onClick={handleLock}
        />
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
