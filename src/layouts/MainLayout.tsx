import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { Layout } from 'antd';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
const { Header, Footer, Content } = Layout;

function MainLayout() {
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
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>小慕问卷 &copy; 2024 - present</Footer>
    </Layout>
  );
}

export default MainLayout;
