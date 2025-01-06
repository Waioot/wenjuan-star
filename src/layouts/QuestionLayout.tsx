import styles from './QuestionLayout.module.scss';
import { Outlet } from 'react-router-dom';
const QuestionLayout = () => {
  return (
    <div className={styles.container}>
      <p>QuestionLayout</p>
      <Outlet />
    </div>
  );
};

export default QuestionLayout;
