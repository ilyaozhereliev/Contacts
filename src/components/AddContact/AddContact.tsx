import React, { FC, useState } from 'react';

import { useAppDispatch } from '../../redux/hook';
import { addContact } from '../../redux/slices/contactsSlice';
import { getRandomColor } from '../../utils';
import styles from '../EditContact/EditContact.module.scss';

interface AddContactProps {
  onClose: () => void;
}

const AddContact: FC<AddContactProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhoneNumber(e.target.value.replace(/\D/g, ''));

  const addNewContact = () => {
    if (name.length < 1 || phoneNumber.length < 1) return;

    dispatch(addContact({ name, phoneNumber, color: getRandomColor() }));
    onClose();
  };

  return (
    <div>
      <div className={styles.initial_wrapper}>
        <div className={styles.name_initial} />
      </div>

      <div className={styles.info}>
        <i className="fa-solid fa-user" />
        <input
          className={styles.full_name}
          placeholder="Name"
          onChange={changeName}
          value={name}
        />

        <br />
        <i className="fa-solid fa-phone" />
        <input
          type="tel"
          className={styles.number}
          placeholder="Phone number"
          maxLength={11}
          onChange={changePhone}
          value={phoneNumber}
        />
      </div>

      <div className={styles.button_wrapper}>
        <button
          type="button"
          className={styles.confirm}
          onClick={addNewContact}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default React.memo(AddContact);
