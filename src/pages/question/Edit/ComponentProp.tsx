import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { getComponentConfigByType } from '../../../components/Question/index';
function NoComponent() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>未选中组件</div>
  );
}
function ComponentProp() {
  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) return <NoComponent />;

  const { type, props } = selectedComponent;
  const componentConfig = getComponentConfigByType(type);
  if (!componentConfig) return <NoComponent />;

  const { PropComponent } = componentConfig;
  return <PropComponent {...props} />;
}

export default ComponentProp;
