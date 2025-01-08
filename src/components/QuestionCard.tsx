import { FC, useState } from 'react';
import { Space, Button, Divider, Tag, Popconfirm, message, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  StarOutlined,
  DeleteOutlined,
  EditOutlined,
  BarChartOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import styles from './QuestionCard.module.scss';
import {
  updateQuestionService,
  duplicateQuestionService,
} from '../services/question';
import { useRequest } from 'ahooks';

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const { confirm } = Modal;

const QuestionCard: FC<PropsType> = ({
  _id,
  title,
  isPublished,
  isStar,
  answerCount,
  createdAt,
}) => {
  const [isStarState, setIsStarState] = useState(isStar);

  const { loading: changeStarLoading, run: ChangeStar } = useRequest(
    async () => {
      const res = await updateQuestionService(_id, { isStar: !isStarState });
      return res;
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState);
        message.success('更新成功');
      },
    }
  );

  // function handleCopy() {
  //   message.success('复制成功');
  // }

  const navigate = useNavigate();
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const res = await duplicateQuestionService(_id);
      return res;
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        message.success('复制成功');
        navigate(`/question/edit/${res._id}`); // 跳转到编辑页面
      },
    }
  );

  function handleDelete() {
    confirm({
      title: '确定要删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功');
      },
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
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
            <Button
              type='text'
              size='small'
              icon={<StarOutlined />}
              onClick={ChangeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title='确定要复制吗？'
              okText='确定'
              cancelText='取消'
              onConfirm={duplicate}
              disabled={duplicateLoading}
            >
              <Button type='text' size='small' icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type='text'
              size='small'
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
