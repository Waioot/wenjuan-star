import styles from './EditHeader.module.scss';
import { Button, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import EditToolbar from './EditToolBar';
const { Title } = Typography;

function EditHeader() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type='link' icon={<LeftOutlined />} onClick={handleBack}>
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.center}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type='primary'>发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default EditHeader;
