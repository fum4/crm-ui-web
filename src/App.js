import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authenticate, getAppStatus } from './services/network';
import { Auth, Today, Clients } from './screens';
import { Navigation } from './components';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAppStatus().then((res) => {
      if (res.status === 200) {
        setIsAuthenticated(true);
      } else {
        navigator.credentials.get({ password: true }).then((credentials) => {
          const { id, password } = credentials;

          setIsLoading(true);

          authenticate({ password, username: id })
            .then(() => setIsAuthenticated(true))
            .finally(() => setIsLoading(false));
        });
      }
    })
  }, [])

  const onAuthenticated = () => {
    setIsAuthenticated(true);
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
            <Route exact path='/auth'>
              <Auth
                isAuthenticated={isAuthenticated}
                onAuthenticated={() => onAuthenticated()}
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
