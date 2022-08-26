import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import contactsReducer from './slices/contactsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    contacts: contactsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
