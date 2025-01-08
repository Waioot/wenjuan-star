import { Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import styles from './MainLayout.module.scss';
import { Layout } from 'antd';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';
const { Header, Footer, Content } = Layout;

function MainLayout() {
  const { waitingUserData } = useLoadUserData();
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingUserData ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>小慕问卷 &copy; 2024 - present</Footer>
    </Layout>
  );
}

export default MainLayout;
