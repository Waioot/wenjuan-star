import { FC } from 'react';
import styles from './QuestionCard.module.scss';

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const QuestionCard: FC<PropsType> = ({
  _id,
  title,
  isPublished,
  isStar,
  answerCount,
  createdAt,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <a href='#'>{title}</a>
        </div>
        <div className={styles.right}>
          {isPublished ? (
            <span style={{ color: 'green' }}>已发布</span>
          ) : (
            <span style={{ color: 'red' }}>未发布</span>
          )}
          <span>答卷: {answerCount}</span>
          <span>创建时间: {createdAt}</span>
        </div>
      </div>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <button>编辑问卷</button>
          <button>数据统计 </button>
        </div>
        <div className={styles.right}>
          <button>标星</button>
          <button>复制</button>
          <button>删除</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
