import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentInfoType } from '../store/componentsReducer';
function useGetComponentInfo() {
  const components = useSelector<StateType>(
    state => state.components.componentList as ComponentInfoType[]
  );
  const { componentList = [] } = components;

  return { componentList };
}

export default useGetComponentInfo;
