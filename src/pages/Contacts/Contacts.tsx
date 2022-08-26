import { useState } from 'react';
import styles from './Contacts.module.scss';
import Search from '../../components/Search/Search';
import ContactItem from '../../components/ContactItem/ContactItem';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import { deleteUser } from '../../redux/slices/usersSlice';
import { Modal, AddContact } from "../../components";

export const ContactsPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const contacts = useAppSelector(({ contacts }) => contacts);
    const { users } = useAppSelector(({ users }) => users);

    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');

    const filtredContacts = contacts.contacts.filter((item) =>
        item.name.toLowerCase().includes(search),
    );

    const currentUserId = users[0]?.id

  const onExit = () => {
      dispatch(deleteUser(currentUserId))
      navigate('/auth')
  }

  return (
    <div>
      <button onClick={() => setShow(true)} className={styles.add}>
        <i className="fa-solid fa-user-plus" />
      </button>

      <button className={styles.exit} onClick={onExit}>
        <span className={styles.logout}>logout</span>
        <i className="fa-solid fa-arrow-right-from-bracket" />
      </button>

      <Search search={search} setSearch={setSearch} />

      {filtredContacts.map((contact) => (
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
	            <AddContact onClose={() => setShow(false)}  />
            </Modal>
        )}
    </div>
  );
};