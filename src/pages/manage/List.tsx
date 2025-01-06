import { FC, useState } from 'react';
import QuestionCard from '../../components/QuestionCard';
import styles from './List.module.scss';

const rowQuestionList = [
  {
    _id: 'q1',
    title: 'Question 1',
    isPublished: false,
    isStar: false,
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
  const [questionList, setQuestionList] = useState(rowQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => {
          const { _id } = q;
          return <QuestionCard key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  );
};

export default List;
