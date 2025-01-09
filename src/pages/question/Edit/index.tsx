import { useDispatch } from 'react-redux';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditCavas from './EditCavas';
import styles from './index.module.scss';
import { changeSelectedId } from '../../../store/componentsReducer';
import LeftPanel from './LeftPanel';
function Edit() {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();

  function clearSelected() {
    dispatch(changeSelectedId(''));
  }
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '60px' }}>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelected}>
            <div className={styles['canvas-wrapper']}>
              <EditCavas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
