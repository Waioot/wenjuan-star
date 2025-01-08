import { Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import styles from './QuestionLayout.module.scss';
import useLoadUserData from '../hooks/useLoadUserData';
const QuestionLayout = () => {
  const { waitingUserData } = useLoadUserData();
  return (
    <div className={styles.container}>
      <p>QuestionLayout</p>
      {waitingUserData ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuestionLayout;
