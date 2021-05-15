import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle, Lock } from '@material-ui/icons';
import { Button, Grid, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { login, register } from '../../services/network';
import { authenticate, setLoading } from '../../store';
import { labels } from '../../constants';
import './styles.scss';

const Auth = ({ action }) => {
  const isAuthenticated = useSelector((state) => state.general.isAuthenticated);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

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
      <Grid alignItems='flex-end' className='username' container>
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid className='usernameInput' item>
          <TextField
            label={labels.USER}
            onChange={handleUsernameChange}
          />
        </Grid>
      </Grid>
      <Grid alignItems='flex-end' className='password' container>
        <Grid item>
          <Lock />
        </Grid>
        <Grid className='passwordInput' item>
          <TextField
            label={labels.PASSWORD}
            onChange={handlePasswordChange}
            type='password'
          />
        </Grid>
      </Grid>
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
