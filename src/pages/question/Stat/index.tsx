import { Button, Result, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';

import StatHeader from './StatHeader';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import styles from './index.module.scss';
function Stat() {
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();
  useTitle(`问卷统计 - ${title}`);
  const navigate = useNavigate();

  const LodingElement = (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <Spin spinning={loading} size='large'></Spin>
    </div>
  );

  function genContent() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
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
    return (
      <>
        <div className={styles.left}>left</div>
        <div className={styles.main}>main</div>
        <div className={styles.right}>right</div>
      </>
    );
  }
  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && LodingElement}
        {!loading && <div className={styles.content}>{genContent()}</div>}
      </div>
    </div>
  );
}

export default Stat;
