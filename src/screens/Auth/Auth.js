import { useState, useEffect } from 'react';
import { AccountCircle, Lock } from '@material-ui/icons';
import { Button, Grid, TextField, Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { login, register } from '../../services/network';
import { labels } from '../../constants';
import './styles.scss';

const Auth = ({ action, onAuthenticationEnd, onAuthenticationStart, isAuthenticated }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  const handleLogin = (user) => {
    login(user)
      .then(() => {
        // const CredentialsContainer = navigator.credentials;
        // const options = {
        //   id: username,
        //   password,
        //   type: 'password'
        // };
        //
        // CredentialsContainer.create(options)
        //   .then((credentials) => CredentialsContainer.store(credentials))
        //   .then(() => setError(false))
        //   .catch((err) => console.log('fkin error : ', err));
        setError(false);
        onAuthenticationEnd(false);
      })
      .catch(() => {
        setError(true);
        onAuthenticationEnd(true);
      });
  };

  const handleRegister = (user) => {
    register(user)
      .then(() => handleLogin(user))
      .catch(() => setError(true));
  };

  const handleAuthentication = (payload) => {
    if (username && password) {
      onAuthenticationStart();

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
          <TextField label='Utilizator' onChange={(ev) => setUsername(ev.target.value)} />
        </Grid>
      </Grid>
      <Grid alignItems='flex-end' className='password' container>
        <Grid item>
          <Lock />
        </Grid>
        <Grid className='passwordInput' item>
          <TextField label='Parolă' onChange={(ev) => setPassword(ev.target.value)} type='password' />
        </Grid>
      </Grid>
      <Button
        className='submit'
        color='primary'
        onClick={() => handleAuthentication({ password, username })}
        size='large'
        variant='contained'
      >
        {action === 'login' ? labels.LOGIN : labels.REGISTER}
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        autoHideDuration={6000}
        message={action === 'login' ? labels.LOGIN_ERROR : labels.REGISTER_ERROR}
        open={error}
      />
    </div>
  );
};

export default Auth;
