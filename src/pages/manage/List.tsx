import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTitle } from 'ahooks';
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';
import { Typography } from 'antd';
import ListSearch from '../../components/ListSearch';
const { Title } = Typography;

const rowQuestionList = [
  {
    _id: 'q1',
    title: 'Question 1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '2021-01-01',
  },
  {
    _id: 'q2',
    title: 'Question 2',
    isPublished: true,
    isStar: false,
    answerCount: 0,
    createdAt: '2021-01-09',
  },
  {
    _id: 'q3',
    title: 'Question 3',
    isPublished: false,
    isStar: false,
    answerCount: 0,
    createdAt: '2021-01-04',
  },
];

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');

  const [questionList, setQuestionList] = useState(rowQuestionList);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  console.log(keyword);
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
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore 上滑加载更多</div>
    </>
  );
};

export default List;
