import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../store/userReducer';
import useGetUserInfo from './useGetUserInfo';
export default function useLoadUserData() {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // 从 redux 中获取用户信息 判断是否已经有用户数据了
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, [username]);

  return { waitingUserData };
}
