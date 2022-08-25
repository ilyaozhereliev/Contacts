import { useState } from 'react';
import styles from './ContactList.module.scss';
import Search from '../../Search/Search';
import Contact from '../Contact/Contact';
import ContactCard from '../ContactCard/ContactCard';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hook';

const ContactList = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const contacts = useAppSelector((state) => state.contacts);
  const navigate = useNavigate();
  const filtredContacts = contacts.contacts.filter((item) =>
    item.name.toLowerCase().includes(search),
  );

  return (
    <div>
      <button onClick={() => setShow(true)} className={styles.add}>
        <i className="fa-solid fa-user-plus"></i>
      </button>
      <button className={styles.exit} onClick={() => navigate('/auth')}>
        <span className={styles.logout}>logout</span>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
      <Search search={search} setSearch={setSearch} />
      {filtredContacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          phoneNumber={contact.phoneNumber}
          id={contact.id}
          color={contact.color}
        />
      ))}

      <ContactCard
        show={show}
        setShow={setShow}
        isEdit={true}
        onClose={() => setShow(false)}
        getInitial={function (value: string): string {
          throw new Error('Function not implemented.');
        }}
        name={''}
        phoneNumber={''}
        id={0}
        color={''}
      />
    </div>
  );
};

export default ContactList;
