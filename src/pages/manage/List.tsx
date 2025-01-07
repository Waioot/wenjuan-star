import { FC } from 'react';
import { useTitle } from 'ahooks';

import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';
import { Typography, Spin } from 'antd';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
const { Title } = Typography;

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');

  const { loading, data = {} } = useLoadQuestionListData();
  const { list: questionList = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {!loading &&
          questionList.length > 0 &&
          questionList.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore 上滑加载更多</div>
    </>
  );
};

export default List;
