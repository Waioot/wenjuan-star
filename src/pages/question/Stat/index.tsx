import { Button, Result, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';

function Stat() {
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();
  useTitle(`问卷统计 - ${title}`);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '200px' }}>
        <Spin spinning={loading} size='large'></Spin>
      </div>
    );
  }

  if (!isPublished) {
    return (
      <div style={{ textAlign: 'center', marginTop: '200px' }}>
        <Result
          status='warning'
          title='该页面未发布'
          extra={
            <Button type='primary' onClick={() => navigate(-1)}>
              返回
            </Button>
          }
        />
      </div>
    );
  }
  return <div>Stat page</div>;
}

export default Stat;
