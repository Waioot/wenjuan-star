import { Space, Tooltip, Button } from 'antd';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteSelectedComponent } from '../../../store/componentsReducer';
const EditToolbar = () => {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteSelectedComponent());
  }
  return (
    <Space>
      <Tooltip title='删除'>
        <Button type='link' icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title='保存'>
        <Button type='link' icon={<SaveOutlined />} />
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
