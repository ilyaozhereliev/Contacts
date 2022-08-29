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
    {
      id: 1,
      name: 'Natasha Ivanova',
      phoneNumber: '89233332473',
      color: '#6867AC',
    },
    {
      id: 2,
      name: 'Luke Skywalker',
      phoneNumber: '893727381632',
      color: '#A267AC',
    },
    {
      id: 3,
      name: 'Tati Lanaia',
      phoneNumber: '89234678263',
      color: '#CE7BB0',
    },
    // eslint-disable-next-line object-curly-newline
    { id: 4, name: 'Ben Black', phoneNumber: '89236573587', color: '#D77FA1' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(
      state,
      action: PayloadAction<{
        name: string;
        phoneNumber: string;
        color: string;
      }>,
    ) {
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
      // eslint-disable-next-line no-confusing-arrow
      state.contacts = state.contacts.map(
        (item) => (item.id === action.payload.id ? action.payload : item),
        // eslint-disable-next-line function-paren-newline
      );
    },
  },
});

const { actions, reducer } = contactsSlice;

export const { addContact, removeContact, editContact } = actions;
export default reducer;
