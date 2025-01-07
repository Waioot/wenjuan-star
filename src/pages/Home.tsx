import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { MANAGE_LIST_PATHNAME } from '../router';
import styles from './Home.module.scss';
const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100000+，发布问卷 10000+，收到答卷 10000000+
        </Paragraph>
        <div>
          <Link to={MANAGE_LIST_PATHNAME}>
            <Button type='primary'>开始使用</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
