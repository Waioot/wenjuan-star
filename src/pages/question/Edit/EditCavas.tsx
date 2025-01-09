import styles from './EditCavas.module.scss';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

// 临时展示组件
import QuestionTitle from '../../../components/Question/QuestionTitle/Component';
import QuestionInput from '../../../components/Question/QuestionInput/Component';
import { Spin } from 'antd';
type EditCavasPropsType = {
  loading: boolean;
};

function EditCavas({ loading }: EditCavasPropsType) {
  const { componentList } = useGetComponentInfo();

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin />;
      </div>
    );
  return (
    <div className={styles.cavas}>
      {componentList.map(c => {
        const { fe_id, type } = c;
        const component = componentListMap[type];
        return <div key={fe_id}>{component}</div>;
      })}
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
