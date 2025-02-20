import { useDispatch } from 'react-redux';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditCavas from './EditCavas';
import styles from './index.module.scss';
import { changeSelectedId } from '../../../store/componentsReducer';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';

function Edit() {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  const { title } = useGetPageInfo();
  useTitle(`问卷编辑 - ${title}`);

  function clearSelected() {
    dispatch(changeSelectedId(''));
  }
  return (
    <div className={styles.container}>
      <EditHeader />
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
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
