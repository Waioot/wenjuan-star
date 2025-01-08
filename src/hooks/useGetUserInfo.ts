import { useSelector } from 'react-redux';
import { StateType } from '../store';

function useGetUserInfo() {
  const { username, nickname } = useSelector((state: StateType) => state.user);
  return { username, nickname };
}

export default useGetUserInfo;
