import { useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Space, Input } from 'antd';
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from 'antd';
import EditToolbar from './EditToolbar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { updatePageTitle } from '../../../store/pageInfoReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { updateQuestionService } from '../../../services/question';
import { useRequest } from 'ahooks';
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
            <Button type='primary'>发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default EditHeader;
