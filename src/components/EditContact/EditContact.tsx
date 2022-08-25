import React, { FC, useState } from 'react';

import { useAppDispatch } from '../../redux/hook';
import { editContact } from '../../redux/slices/contactsSlice';
import { getInitial } from '../../utils';
import styles from './EditContact.module.scss';

interface EditContactProps {
  id: number;
  name: string;
  color: string;
  phoneNumber: string;

  setShow: (value: boolean) => void;
}

const EditContact: FC<EditContactProps> = ({
  id, name, color, phoneNumber, setShow,
}) => {
  const dispatch = useAppDispatch();

  const [nameValue, setNameValue] = useState(name);
  const [phoneValue, setPhoneValue] = useState(phoneNumber);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => setNameValue(e.target.value);
  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => setPhoneValue(e.target.value.replace(/\D/g, ''));

  const changeContact = () => {
    if (nameValue.length < 1 || phoneValue.length < 1) return;

    dispatch(editContact({
      id,
      name: nameValue,
      phoneNumber: phoneValue,
      color,
    }));
    setShow(false);
  };

  const nameEditing = () => setIsNameChanged(!isNameChanged);
  const phoneEditing = () => setIsPhoneChanged(!isPhoneChanged);

  const initials = getInitial(nameValue);

  return (
    <div>
      <div className={styles.name_initial}>{initials}</div>

      <div className={styles.info}>
        <i className="fa-solid fa-user" />

        <input
          className={isNameChanged ? styles.full_name_change : styles.full_name}
          placeholder="Change name"
          onChange={(e) => isNameChanged && changeName(e)}
          value={nameValue}
        />

        <button type="button" className={styles.edit} onClick={nameEditing}>
          <i className="fa-solid fa-pen" />
        </button>

        <br />
        <i className="fa-solid fa-phone" />
        <input
          type="tel"
          className={isPhoneChanged ? styles.number_change : styles.number}
          placeholder="Change phone number"
          maxLength={11}
          onChange={(e) => isPhoneChanged && changePhone(e)}
          value={phoneValue}
        />
        <button type="button" className={styles.edit} onClick={phoneEditing}>
          <i className="fa-solid fa-pen" />
        </button>
      </div>

      <button type="button" className={styles.confirm} onClick={changeContact}>
        Done
      </button>
    </div>
  );
};

export default React.memo(EditContact);
