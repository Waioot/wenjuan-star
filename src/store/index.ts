import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import componentsReducer from './componentsReducer';
import { UserStateType } from './userReducer';
import { ComponentsStateType } from './componentsReducer';

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
});
