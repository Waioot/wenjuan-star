import { useTitle } from 'ahooks';
import { Typography, Spin, Empty } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPagination from '../../components/ListPagination';
const { Title } = Typography;

function Star() {
  useTitle('小慕问卷 - 标星问卷');

  const { loading, data = {} } = useLoadQuestionListData({ isStar: true });
  const { list: questionList = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>标星问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Spin size='large' />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading && questionList.length === 0 && (
          <Empty description='暂无数据' />
        )}
        {!loading &&
          questionList.length > 0 &&
          questionList.map((q: any) => <QuestionCard key={q._id} {...q} />)}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </>
  );
}

export default Star;
