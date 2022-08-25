import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../Models/User';
import { useAppDispatch } from '../../redux/hook';
import { addUser } from '../../redux/slices/usersSlice';
import styles from './Authorization.module.scss';

const Authorization = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<User['password']>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response: AxiosResponse<User> = await axios.post(
        `/auth`,
        { email, password },
        { baseURL: 'http://localhost:3001' },
      );
      setUsers([...users, response.data]);

      dispatch(addUser(response.data));
      setError(false);
      navigate('/contacts');
    } catch (e) {
      setError(true);
    }
  };

  const handleClick = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Sign In</h1>
        <form className={styles.form} method="post" onSubmit={handleClick}>
          {error ? (
            <div className={styles.text_field_warn}>
              <input
                type="email"
                value={email}
                placeholder="Login"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
            </div>
          ) : (
            <div className={styles.text_field}>
              <input
                type="email"
                value={email}
                placeholder="Login"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
            </div>
          )}
          {error ? (
            <div className={styles.text_field_warn}>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span></span>
            </div>
          ) : (
            <div className={styles.text_field}>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span></span>
            </div>
          )}
          <button className={styles.button} type="submit">
            Submit
          </button>
          {error ? <div className={styles.alert}>Incorrect email or password</div> : <div></div>}
        </form>
      </div>
    </div>
  );
};

export default Authorization;
