import styles from './EditCavas.module.scss';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { Spin } from 'antd';
import { getComponentConfig } from '../../../components/Question';

type EditCavasPropsType = {
  loading: boolean;
};

function getComponent(c: ComponentInfoType) {
  const { type, props } = c;
  const componentConfig = getComponentConfig(type);
  if (!componentConfig) return null;
  const { Component } = componentConfig;
  return <Component {...props} />;
}

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
      {componentList.map((c: ComponentInfoType) => {
        const { fe_id } = c;
        return (
          <div className={styles['component-wrapper']} key={fe_id}>
            <div className={styles.components}>{getComponent(c)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default EditCavas;
