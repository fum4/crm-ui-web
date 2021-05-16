import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, InputAdornment, OutlinedInput } from '@material-ui/core';
import { login, register } from 'services/network';
import { authenticate, setLoading } from 'store';
import { labels } from 'utils/constants';
import './styles.scss';

const Auth = ({ action }) => {
  const isAuthenticated = useSelector((state) => state.general.isAuthenticated);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (user) => {
    login(user)
      .then(() => dispatch(authenticate()))
      .finally(() => dispatch(setLoading(false)));
  };

  const handleRegister = (user) => register(user).then(() => handleLogin(user));

  const handleAuthentication = () => {
    if (username && password) {
      const payload = { username, password };

      dispatch(setLoading(true));

      if (action === 'login') {
        handleLogin(payload);
      }

      if (action === 'register') {
        handleRegister(payload);
      }
    }
  };

  return (
    <div className='auth'>
      <h1>e-Programare</h1>
      <h2>{action === 'login' ? labels.LOGIN : labels.REGISTER}</h2>
      <OutlinedInput
        className='username'
        placeholder={labels.USER}
        variant='outlined'
        onChange={handleUsernameChange}
        startAdornment={
          <InputAdornment position='start'>
            <AccountCircle/>
          </InputAdornment>
        }
      />
      <OutlinedInput
        className='password'
        placeholder={labels.PASSWORD}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        startAdornment={
          <InputAdornment position='start'>
            <Lock/>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {
              showPassword
                ? <Visibility className='visibility-icon' onClick={toggleShowPassword}/>
                : <VisibilityOff className='visibility-icon' onClick={toggleShowPassword}/>
            }
          </InputAdornment>
        }
      />
      <Button
        className='submit'
        color='primary'
        onClick={handleAuthentication}
        size='large'
        variant='contained'
      >
        {action === 'login' ? labels.LOGIN : labels.REGISTER}
      </Button>
    </div>
  );
};

export default Auth;
