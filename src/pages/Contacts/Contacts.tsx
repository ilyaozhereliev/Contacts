import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AddContact, ContactItem, Modal, Search,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { deleteUser } from '../../redux/slices/usersSlice';
import styles from './Contacts.module.scss';

const ContactsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const contacts = useAppSelector((state) => state.contacts);
  const { users } = useAppSelector((state) => state.users);

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');

  const filteredContacts = contacts.contacts.filter((item) =>
    item.name.toLowerCase().includes(search));

  const currentUserId = users[0]?.id;

  const onExit = () => {
    dispatch(deleteUser(currentUserId));
    navigate('/auth');
  };

  return (
    <div>
      <button type="button" onClick={() => setShow(true)} className={styles.add}>
        <i className="fa-solid fa-user-plus" />
      </button>

      <button type="button" className={styles.exit} onClick={onExit}>
        <span className={styles.logout}>logout</span>
        <i className="fa-solid fa-arrow-right-from-bracket" />
      </button>

      <Search search={search} setSearch={setSearch} />

      {filteredContacts.map((contact) => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          phoneNumber={contact.phoneNumber}
          id={contact.id}
          color={contact.color}
        />
      ))}

      {show && (
        <Modal onClose={() => setShow(false)}>
          <AddContact onClose={() => setShow(false)} />
        </Modal>
      )}
    </div>
  );
};

export default React.memo(ContactsPage);
