import { FC } from 'react';
import { Space, Button, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {
  StarOutlined,
  DeleteOutlined,
  EditOutlined,
  BarChartOutlined,
  CopyOutlined,
} from '@ant-design/icons';
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
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color='processing'>已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷: {answerCount}</span>
            <span>创建时间: {createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type='text'
              size='small'
              icon={<EditOutlined />}
              disabled={isPublished}
            >
              <Link to={`/question/edit/${_id}`}> 编辑问卷</Link>
            </Button>
            <Button
              type='text'
              size='small'
              icon={<BarChartOutlined />}
              disabled={!isPublished}
            >
              <Link to={`/question/stat/${_id}`}>数据统计</Link>
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type='text' size='small' icon={<StarOutlined />}>
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Button type='text' size='small' icon={<CopyOutlined />}>
              复制
            </Button>
            <Button type='text' size='small' icon={<DeleteOutlined />}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
