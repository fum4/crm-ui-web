import { useState, useEffect } from 'react';
import { AccountCircle, Lock } from '@material-ui/icons';
import { Button, Grid, TextField } from '@material-ui/core';
import { authenticate } from '../../services/network';
import { Redirect } from 'react-router-dom';
import './styles.scss';

const Auth = ({ onAuthenticated, onAuthenticationStart, isAuthenticated }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleAuthentication = (payload) => {
    if (username && password) {
      onAuthenticationStart();

      authenticate(payload).then(() => {
        onAuthenticated();
      });
    }
  }

  useEffect(() => {
    console.log('#### ', isAuthenticated)
  }, [isAuthenticated])

  return !isAuthenticated ? (
    <div className='login'>
      <Grid alignItems='flex-end' className='username' container spacing={1}>
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField
            label='Utilizator'
            onChange={(ev) => setUsername(ev.target.value)} />
        </Grid>
      </Grid>
      <Grid alignItems='flex-end' className='password' container spacing={1}>
        <Grid item>
          <Lock />
        </Grid>
        <Grid item>
          <TextField
            label='Parolă'
            onChange={(ev) => setPassword(ev.target.value)}
            type='password' />
        </Grid>
      </Grid>
      <Button
        className='submit'
        color='primary'
        onClick={() => handleAuthentication({ password, username })}
        size='large'
        variant='contained'
      >
        Autentificare
      </Button>
    </div>
  ) : <Redirect to={{ pathname: '/today' }} />;
}

export default Auth;
