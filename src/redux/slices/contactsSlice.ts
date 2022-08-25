import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Contact = {
  id: number;
  name: string;
  phoneNumber: string;
  color: string;
};

type ContactsState = {
  contacts: Contact[];
};

const initialState: ContactsState = {
  contacts: [
    { id: 1, name: 'Pasha Tecnique', phoneNumber: '89233332473', color: '#6867AC' },
    { id: 2, name: 'Robert de Niro', phoneNumber: '893727381632', color: '#A267AC' },
    { id: 3, name: 'Emma Mackey', phoneNumber: '89234678263', color: '#CE7BB0' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<{ name: string; phoneNumber: string; color: string }>) {
      state.contacts.push({
        id: Date.now(),
        name: action.payload.name,
        phoneNumber: action.payload.phoneNumber,
        color: action.payload.color,
      });
    },
    removeContact(state, action: PayloadAction<number>) {
      state.contacts = state.contacts.filter(({ id }) => id !== action.payload);
    },
    editContact(state, action) {
      state.contacts = state.contacts.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
  },
});

const { actions, reducer } = contactsSlice;

export const { addContact, removeContact, editContact } = actions;
export default reducer;
