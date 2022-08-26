import { useState } from 'react';
import { useAppDispatch } from '../../redux/hook';

import { removeContact } from '../../redux/slices/contactsSlice';
import { getInitial } from '../../utils';
import styles from './ContactItem.module.scss';
import {Modal} from "../Modal";
import { EditContact } from '../EditContact';

interface ContactItemProps {
  id: number;
  name: string;
  phoneNumber: string;
  color: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ id, name, phoneNumber, color }) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const deleteContact = () => dispatch(removeContact(id));
  const initials = getInitial(name)

  return (
    <div>
      <div className={styles.wrapper}>
        <div key={id} className={styles.contact_entry}>
          <div style={{ backgroundColor: color }} className={styles.name_initial}>
            {initials}
          </div>

          <div className={styles.first_name}>{name}</div>

          <button type='button' className={styles.edit} onClick={() => setShow(true)}>
            <i className="fa-solid fa-address-card"/>
          </button>

          <button type='button' onClick={deleteContact} className={styles.delete}>
            <i className="fa-regular fa-trash-can"/>
          </button>
        </div>
      </div>


      {show && (
          <Modal onClose={() => setShow(false)}>
            <EditContact id={id} name={name} phoneNumber={phoneNumber} color={color} setShow={setShow}  />
          </Modal>
      )}


    </div>
  );
};

export default ContactItem;
