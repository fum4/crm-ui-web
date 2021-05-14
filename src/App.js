import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth, Today, Clients } from './screens';
import { DesktopNavigation, MobileNavigation, Notifications, LoadingIndicator } from './components';
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

  return isLoading ? <LoadingIndicator /> : (
    <Router>
      <Notifications>
        <div>
        {
          isAuthenticated && <DesktopNavigation />
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
            <Route exact path='/'>
              <Today isAuthenticated={isAuthenticated} />
            </Route>
          }
          {
            <Route path='/clients'>
              <Clients isAuthenticated={isAuthenticated} />
            </Route>
          }
        </Switch>
        {
          isAuthenticated && <MobileNavigation />
        }
      </div>
      </Notifications>
    </Router>
  );
}

export default App;
