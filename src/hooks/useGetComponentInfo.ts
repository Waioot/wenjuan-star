import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentsStateType } from '../store/componentsReducer';

function useGetComponentInfo() {
  const components = useSelector<StateType, ComponentsStateType>(
    state => state.components.present
  );

  const { componentList = [], selectedId, copiedComponent } = components;
  const selectedComponent = componentList.find(c => c.fe_id === selectedId);

  return { componentList, selectedId, selectedComponent, copiedComponent };
}

export default useGetComponentInfo;
