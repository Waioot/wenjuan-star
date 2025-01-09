import { MouseEvent } from 'react';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './EditCavas.module.scss';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import classNames from 'classnames';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { getComponentConfigByType } from '../../../components/Question';
import { changeSelectedId } from '../../../store/componentsReducer';

type EditCavasPropsType = {
  loading: boolean;
};

function getComponent(c: ComponentInfoType) {
  const { type, props } = c;
  const componentConfig = getComponentConfigByType(type);
  if (!componentConfig) return null;
  const { Component } = componentConfig;
  return <Component {...props} />;
}

function EditCavas({ loading }: EditCavasPropsType) {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); // 阻止事件冒泡
    dispatch(changeSelectedId(id));
  }

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.cavas}>
      {componentList
        .filter(c => !c.isHidden)
        .map((c: ComponentInfoType) => {
          const { fe_id } = c;
          return (
            <div
              className={classNames(styles['component-wrapper'], {
                [styles.selected]: fe_id === selectedId,
              })}
              key={fe_id}
              onClick={e => handleClick(e, fe_id)}
            >
              <div className={styles.components}>{getComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
}

export default EditCavas;
