import { useState } from 'react';
import { AccountCircle, Lock } from '@material-ui/icons';
import { Button, Grid, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { authenticate } from '../../services/network';
import './styles.scss';

const Auth = ({ onAuthenticated }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleAuthentication = (payload) => {
    authenticate(payload).then(() => {
      onAuthenticated();
      history.push('/today');
    });
  }

  return (
    <div className='auth'>
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
  );
}

export default Auth;
