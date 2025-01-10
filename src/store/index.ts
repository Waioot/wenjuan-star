import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import componentsReducer from './componentsReducer';
import { UserStateType } from './userReducer';
import { ComponentsStateType } from './componentsReducer';
import { PageInfoStateType } from './pageInfoReducer';
import pageInfoReducer from './pageInfoReducer';

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
  pageInfo: PageInfoStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageInfoReducer,
  },
});
