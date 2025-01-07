import { useTitle } from 'ahooks';
import { useState } from 'react';
import { Empty, Typography, Divider } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';

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
    isStar: true,
    answerCount: 0,
    createdAt: '2021-01-09',
  },
  {
    _id: 'q3',
    title: 'Question 3',
    isPublished: false,
    isStar: true,
    answerCount: 0,
    createdAt: '2021-01-04',
  },
];
function Star() {
  useTitle('小慕问卷 - 标星问卷');

  const [questionList, setQuestionList] = useState(rowQuestionList);

  return (
    <>
      <div className={styles.header}>
        <Title level={3}>标星问卷</Title>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty description='暂无数据' />}
        {questionList.length > 0 &&
          questionList.map(q => <QuestionCard key={q._id} {...q} />)}
      </div>
      <div className={styles.footer}>分页 </div>
    </>
  );
}

export default Star;
