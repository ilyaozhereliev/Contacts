import axios, { AxiosResponse } from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch} from '../../redux/hook';
import { addUser } from '../../redux/slices/usersSlice';
import styles from './Authorization.module.scss';

interface User {
  id: number;
  email: string;
  password: string;
}

export const AuthorizationPage = () => {
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

      dispatch(addUser(response.data));
      setError(false);
      navigate('/contacts');
    } catch (e) {
      setError(true);
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  };

  const inputClassName = error ? styles.text_field_warn : styles.text_field;

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Sign In</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={inputClassName}>
              <input
                type="email"
                value={email}
                placeholder="Login"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span/>
            </div>

            <div className={inputClassName}>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span/>
            </div>

          <button className={styles.button} type="submit">
            Submit
          </button>

          {error && <div className={styles.alert}>Incorrect email or password</div>}
        </form>
      </div>
    </div>
  );
};

