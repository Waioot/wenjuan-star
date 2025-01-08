import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '../router';
import { useState, useEffect } from 'react';
import useGetUserInfo from '../hooks/useGetUserInfo';
const { Title } = Typography;
function Logo() {
  const { username } = useGetUserInfo();

  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_PATHNAME);
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  );
}

export default Logo;
