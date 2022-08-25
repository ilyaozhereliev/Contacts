import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import contactssReducer from './slices/contactsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    contacts: contactssReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
