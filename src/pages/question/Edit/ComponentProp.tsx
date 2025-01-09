import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { getComponentConfigByType } from '../../../components/Question/index';
import { ComponentPropsType } from '../../../components/Question';
import { useDispatch } from 'react-redux';
import { changeComponentProps } from '../../../store/componentsReducer';
function NoComponent() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>未选中组件</div>
  );
}
function ComponentProp() {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) return <NoComponent />;

  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConfig = getComponentConfigByType(type);
  if (!componentConfig) return <NoComponent />;

  const changeProps = (newProps: ComponentPropsType) => {
    if (selectedComponent === null) return;
    // 获取选中的组件 id
    const { fe_id } = selectedComponent;
    // 修改组件属性
    dispatch(changeComponentProps({ fe_id, newProps }));
  };

  const { PropComponent } = componentConfig;
  return (
    <PropComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden}
    />
  );
}

export default ComponentProp;
