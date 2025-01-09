import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentsStateType } from '../store/componentsReducer';

function useGetComponentInfo() {
  const components = useSelector<StateType, ComponentsStateType>(
    state => state.components
  );

  const { componentList = [], selectedId = '' } = components;

  return { componentList, selectedId };
}

export default useGetComponentInfo;
