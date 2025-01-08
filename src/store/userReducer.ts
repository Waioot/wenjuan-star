import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserStateType = {
  username: string;
  nickname: string;
};

const initialState: UserStateType = {
  username: '',
  nickname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
    },
    logoutReducer: () => {
      return initialState;
    },
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
