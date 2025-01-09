import styles from './EditCavas.module.scss';

// 临时展示组件
import QuestionInput from '../../../components/Question/QuestionInput';
import QuestionTitle from '../../../components/Question/QuestionTitle';

function EditCavas() {
  return (
    <div className={styles.cavas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.components}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.components}>
          <QuestionInput />
        </div>
      </div>
    </div>
  );
}

export default EditCavas;
