/* eslint-disable @typescript-eslint/comma-dangle */
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
    addUser(
      state,
      action: PayloadAction<{ id: number; email: string; password: string }>
    ) {
      state.users.push({
        id: action.payload.id,
        email: action.payload.email,
        password: action.payload.password,
      });
    },

    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter(({ id }) => id !== action.payload);
    },
  },
});

const { actions, reducer } = usersSlice;

export const { addUser, deleteUser } = actions;
export default reducer;
