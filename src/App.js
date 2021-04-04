import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth, Today, Clients } from './screens';
import { Navigation } from './components';
import { login } from './services/network';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClients } from './store';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const { username, password } = user;

      if (username && password) {
        setIsLoading(true);

        login({ username, password })
          .then(() => onAuthenticationEnd(false))
          .catch(() => onAuthenticationEnd(true));
      }
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchClients());
    }
  }, [dispatch, isAuthenticated])

  const onAuthenticationEnd = (hasError) => {
    setIsAuthenticated(!hasError);
    setIsLoading(false);
  }

  return isLoading ? <CircularProgress /> : (
    <Router>
      <div>
        {
          isAuthenticated && <Navigation />
        }
        <Switch>
          {
            <Route exact path='/login'>
              <Auth
                action='login'
                isAuthenticated={isAuthenticated}
                onAuthenticationEnd={onAuthenticationEnd}
                onAuthenticationStart={() => setIsLoading(true)} />
            </Route>
          }
          {
            <Route exact path='/register'>
              <Auth
                action='register'
                isAuthenticated={isAuthenticated}
                onAuthenticationEnd={onAuthenticationEnd}
                onAuthenticationStart={() => setIsLoading(true)} />
            </Route>
          }
          {
            isAuthenticated && (
              <Route exact path='/today'>
                <Today />
              </Route>
            )
          }
          {
            isAuthenticated && (
              <Route path='/clients'>
                <Clients />
              </Route>
            )
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;
