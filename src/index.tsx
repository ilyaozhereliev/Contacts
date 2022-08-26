import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import { AuthorizationPage, ContactsPage } from './pages';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
