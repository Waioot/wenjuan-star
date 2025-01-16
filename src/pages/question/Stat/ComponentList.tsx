import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import styles from './ComponentList.module.scss';
import { getComponentConfigByType } from '../../../components/Question/index';
import { ComponentInfoType } from '../../../store/componentsReducer';
import classNames from 'classnames';
type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

function ComponentList({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType,
}: PropsType) {
  const { componentList } = useGetComponentInfo();
  return (
    <div className={styles.container}>
      {componentList
        .filter((c: ComponentInfoType) => !c.isHidden)
        .map((c: ComponentInfoType) => {
          const { fe_id, props, type } = c;

          const componentConf = getComponentConfigByType(type);
          if (!componentConf) return null;

          const { Component } = componentConf;

          // 拼接样式
          const wrapperClassName = classNames(styles['component-wrapper'], {
            [styles.selected]: fe_id === selectedComponentId,
          });

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ComponentList;
