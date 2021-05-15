import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth, Today, Clients } from './screens';
import { DesktopNavigation, MobileNavigation, Notifications, LoadingIndicator } from './components';
import { login } from './services/network';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, setLoading, fetchClients } from './store';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.general.isAuthenticated);
  const isLoading = useSelector((state) => state.general.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const { username, password } = user;

      if (username && password) {
        dispatch(setLoading(true));

        login({ username, password })
          .then(() => dispatch(authenticate()))
          .finally(() => dispatch(setLoading(false)));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchClients());
    }
  }, [dispatch, isAuthenticated])

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
              <Auth action='login'/>
            </Route>
          }
          {
            <Route exact path='/register'>
              <Auth action='register'/>
            </Route>
          }
          {
            <Route exact path='/'>
              <Today/>
            </Route>
          }
          {
            <Route path='/clients'>
              <Clients/>
            </Route>
          }
        </Switch>
        {
          isAuthenticated && <MobileNavigation/>
        }
      </div>
      </Notifications>
    </Router>
  );
}

export default App;