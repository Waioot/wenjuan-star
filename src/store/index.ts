import { configureStore } from '@reduxjs/toolkit';
import undoable, { StateWithHistory, excludeAction } from 'redux-undo';
import userReducer from './userReducer';
import componentsReducer from './componentsReducer';
import { UserStateType } from './userReducer';
import { ComponentsStateType } from './componentsReducer';
import { PageInfoStateType } from './pageInfoReducer';
import pageInfoReducer from './pageInfoReducer';

export type StateType = {
  user: UserStateType;
  // components: ComponentsStateType;
  components: StateWithHistory<ComponentsStateType>; // 使用 undo 功能
  pageInfo: PageInfoStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,

    // 没有使用 undo 功能
    // components: componentsReducer,

    // 使用 undo 功能
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    pageInfo: pageInfoReducer,
  },
});
