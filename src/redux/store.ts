import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './slices/contactsSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    contacts: contactsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
