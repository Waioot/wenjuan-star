import { useTitle } from 'ahooks';
import {
  Button,
  Empty,
  Space,
  Table,
  Tag,
  Typography,
  Modal,
  message,
  Spin,
} from 'antd';
import { useState } from 'react';
import ListSearch from '../../components/ListSearch';
import ListPagination from '../../components/ListPagination';
import styles from './common.module.scss';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
const { Title } = Typography;

const { confirm } = Modal;

function Trash() {
  useTitle('小慕问卷 - 回收站');
  const { loading, data = {} } = useLoadQuestionListData({ isDeleted: true });
  const { list: rowQuestionList = [], total = 0 } = data;
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const handleRestore = () => {
    confirm({
      title: '确定要恢复吗？',
      icon: <CheckCircleOutlined />,
      content: '恢复后将恢复到问卷列表中',
      onOk: () => {
        message.success('恢复成功');
      },
    });
  };

  const handleDelete = () => {
    confirm({
      title: '确定要彻底删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复',
      onOk: () => {
        message.success('彻底删除成功');
      },
    });
  };

  const columns = [
    { title: '标题', dataIndex: 'title' },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? (
          <Tag color='success'>已发布</Tag>
        ) : (
          <Tag color='error'>未发布</Tag>
        ),
    },
    {
      title: '是否标星',
      dataIndex: 'isStar',
      render: (isStar: boolean) =>
        isStar ? (
          <Tag color='success'>已标星</Tag>
        ) : (
          <Tag color='error'>未标星</Tag>
        ),
    },
    { title: '回答数', dataIndex: 'answerCount' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {!loading && rowQuestionList.length === 0 && (
          <Empty description='暂无数据' />
        )}
        {!loading && rowQuestionList.length > 0 && (
          <>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button
                  type='primary'
                  disabled={selectedQuestionIds.length === 0}
                  onClick={handleRestore}
                >
                  恢复
                </Button>
                <Button
                  danger
                  disabled={selectedQuestionIds.length === 0}
                  onClick={handleDelete}
                >
                  彻底删除
                </Button>
              </Space>
            </div>
            <Table
              columns={columns}
              dataSource={rowQuestionList}
              pagination={false}
              rowKey={(q: any) => q._id}
              rowSelection={{
                type: 'checkbox',
                onChange: selectedRowKeys => {
                  setSelectedQuestionIds(selectedRowKeys as string[]);
                },
              }}
            />
          </>
        )}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </>
  );
}

export default Trash;
