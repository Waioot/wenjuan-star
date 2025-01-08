import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import { UserStateType } from './userReducer';
export type StateType = {
  user: UserStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
