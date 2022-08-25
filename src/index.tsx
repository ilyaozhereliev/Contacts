import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import store from './redux/store';
import Authorization from './components/Authorization/Authorization';
import ContactList from './components/Contacts/ContactList/ContactList';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/auth" element={<Authorization />} />
          <Route path="/contacts" element={<ContactList />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
