import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  email: string;
  password: string;
};

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<{ id: number; email: string; password: string }>) {
      state.users.push({
        id: action.payload.id,
        email: action.payload.email,
        password: action.payload.password,
      });
    },
  },
});

const { actions, reducer } = usersSlice;

export const { addUser } = actions;
export default reducer;
