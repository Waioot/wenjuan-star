import { Space, Tooltip, Button } from 'antd';
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  deleteSelectedComponent,
  hideSelectedComponent,
} from '../../../store/componentsReducer';

const EditToolbar = () => {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteSelectedComponent());
  }
  function handleHide() {
    dispatch(hideSelectedComponent());
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
    </Space>
  );
};

export default EditToolbar;
