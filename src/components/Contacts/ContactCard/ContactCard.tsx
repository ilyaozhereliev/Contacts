import React, { useState } from 'react';
import { useAppDispatch } from '../../../redux/hook';
import { addContact, editContact } from '../../../redux/slices/contactsSlice';
import styles from './ContactCard.module.scss';

interface ContactCardProps {
  onClose: () => void;
  show: boolean;
  setShow: (value: boolean) => void;
  getInitial: (value: string) => string;
  name: string;
  phoneNumber: string;
  id: number;
  color: string;
  isEdit?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  onClose,
  show,
  setShow,
  getInitial,
  isEdit,
  name,
  phoneNumber,
  id,
  color,
}) => {
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);

  const dispatch = useAppDispatch();

  const randomColor = () => {
    const colors = [
      '#6867AC',
      '#A267AC',
      '#CE7BB0',
      '#D77FA1',
      '#99A799',
      '#87AAAA',
      '#716F81',
      '#6D8299',
      '#8E7F7F',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value.replace(/\D/g, ''));
  };

  const addNewContact = () => {
    if (nameValue.length < 1 || phoneValue.length < 1) return;
    dispatch(
      addContact({
        name: nameValue,
        phoneNumber: phoneValue,
        color: randomColor(),
      }),
    );

    setNameValue('');
    setPhoneValue('');
    setShow(false);
  };

  const changeContact = () => {
    if (nameValue.length < 1 && phoneValue.length < 1) return;
    dispatch(
      editContact({
        id: id,
        name: nameValue,
        phoneNumber: phoneValue,
        color: color,
      }),
    );

    setNameValue('');
    setPhoneValue('');
    setShow(false);
    setIsNameChanged(false);
    setIsPhoneChanged(false);
  };

  const nameEditing = () => {
    setIsNameChanged(!isNameChanged);
    setNameValue(name);
    setPhoneValue(phoneNumber);
  };
  const phoneEditing = () => {
    setIsPhoneChanged(!isPhoneChanged);
    setPhoneValue(phoneNumber);
    setNameValue(name);
  };

  if (!show) {
    return null;
  }
  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.overlay_inner}>
          <button className={styles.close} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <div className={styles.inner_box}>
            {isEdit ? (
              <div className={styles.name_initial}></div>
            ) : (
              <div className={styles.name_initial}>{getInitial(name)}</div>
            )}

            <div className={styles.info}>
              <i className="fa-solid fa-user"></i>
              {isEdit ? (
                <input
                  className={styles.full_name}
                  placeholder="Name"
                  onChange={changeName}
                  value={nameValue}
                />
              ) : (
                <>
                  <input
                    className={isNameChanged ? styles.full_name_change : styles.full_name}
                    placeholder="Change name"
                    onChange={changeName}
                    value={isNameChanged ? nameValue : name}
                  />
                  <button className={styles.edit} onClick={nameEditing}>
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </>
              )}

              <br />
              <i className="fa-solid fa-phone"></i>
              {isEdit ? (
                <input
                  type="tel"
                  className={styles.number}
                  placeholder="Phone number"
                  maxLength={11}
                  onChange={changePhone}
                  value={phoneValue}
                />
              ) : (
                <>
                  <input
                    type="tel"
                    className={isPhoneChanged ? styles.number_change : styles.number}
                    placeholder="Change phone number"
                    maxLength={11}
                    onChange={changePhone}
                    value={isPhoneChanged ? phoneValue : phoneNumber}
                  />
                  <button className={styles.edit} onClick={phoneEditing}>
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </>
              )}
            </div>
            {isEdit ? (
              <button className={styles.confirm} onClick={addNewContact}>
                Add
              </button>
            ) : (
              <button className={styles.confirm} onClick={changeContact}>
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
