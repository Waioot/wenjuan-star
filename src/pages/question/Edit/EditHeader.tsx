import { useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Space, Input, message } from 'antd';
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from 'antd';
import EditToolbar from './EditToolbar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { updatePageTitle } from '../../../store/pageInfoReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { updateQuestionService } from '../../../services/question';
import { useDebounceEffect, useRequest } from 'ahooks';
import { useKeyPress } from 'ahooks';

const { Title } = Typography;

// 显示和修改标题组件
function TitleComponent() {
  const pageInfo = useGetPageInfo();
  const { title } = pageInfo;

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    dispatch(updatePageTitle(newTitle));
  }

  if (isEdit) {
    return (
      <Input
        value={title}
        onChange={handleChangeTitle}
        onPressEnter={() => setIsEdit(false)}
        onBlur={() => setIsEdit(false)}
      />
    );
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        type='link'
        icon={<EditOutlined />}
        onClick={() => setIsEdit(true)}
      ></Button>
    </Space>
  );
}

// 保存按钮组件
function SaveButton() {
  // id + pageinfo + componentList

  const { id } = useParams();

  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();

  const { loading, run: saveQuestion } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
    }
  );

  // 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault();
    if (loading) return;
    saveQuestion();
  });

  // 自动保存: 通过监听修改， 1s 保存一次
  useDebounceEffect(
    () => {
      if (!loading) return;
      saveQuestion();
    },
    [pageInfo, componentList],
    {
      wait: 5000,
    }
  );

  return (
    <Button
      onClick={saveQuestion}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
}

// 发布按钮组件
function PublishButton() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();

  const { loading, run: publishQuestion } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 发布状态
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功');
        // 跳转到统计页面
        navigate(`/question/stat/${id}`);
      },
    }
  );
  return (
    <Button type='primary' disabled={loading} onClick={publishQuestion}>
      发布
    </Button>
  );
}

function EditHeader() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type='link' icon={<LeftOutlined />} onClick={handleBack}>
              返回
            </Button>
            <TitleComponent />
          </Space>
        </div>
        <div className={styles.center}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
}

export default EditHeader;
