import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hook';

import { removeContact } from '../../../redux/slices/contactsSlice';
import ContactCard from '../ContactCard/ContactCard';
import styles from './Contact.module.scss';

interface ContactProps {
  id: number;
  name: string;
  phoneNumber: string;
  color: string;
}

const Contact: React.FC<ContactProps> = ({ id, name, phoneNumber, color }) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const getInitial = (name: string) => {
    if (name.split(' ')[1]) {
      return name.charAt(0) + name.split(' ')[1].charAt(0);
    } else {
      return name.charAt(0);
    }
  };

  const deleteContact = () => {
    dispatch(removeContact(id));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div key={id} className={styles.contact_entry}>
          <div style={{ backgroundColor: color }} className={styles.name_initial}>
            {getInitial(name)}
          </div>
          <div className={styles.first_name}>{name}</div>
          <button className={styles.edit} onClick={() => setShow(true)}>
            <i className="fa-solid fa-address-card"></i>
          </button>
          <button onClick={deleteContact} className={styles.delete}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
      <ContactCard
        show={show}
        onClose={() => setShow(false)}
        getInitial={getInitial}
        name={name}
        phoneNumber={phoneNumber}
        setShow={setShow}
        id={id}
        color={color}
      />
    </div>
  );
};

export default Contact;
