import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Space, Divider } from 'antd';

function Mainlayout() {
  const { pathname } = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction='vertical'>
          <Button type='primary' size='large' icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Link to='/manage/list'>
            <Button
              type={pathname === '/manage/list' ? 'default' : 'text'}
              size='large'
              icon={<BarsOutlined />}
            >
              我的问卷
            </Button>
          </Link>
          <Link to='/manage/star'>
            <Button
              type={pathname === '/manage/star' ? 'default' : 'text'}
              size='large'
              icon={<StarOutlined />}
            >
              标星问卷
            </Button>
          </Link>
          <Link to='/manage/trash'>
            <Button
              type={pathname === '/manage/trash' ? 'default' : 'text'}
              size='large'
              icon={<DeleteOutlined />}
            >
              回收站
            </Button>
          </Link>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}

export default Mainlayout;
