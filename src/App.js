import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth, Today, Clients } from './screens';
import { Navigation } from './components';
import { useState } from 'react';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        {
          isAuthenticated && <Navigation />
        }
        <Switch>
          <Route exact path='/auth'>
            <Auth onAuthenticated={() => setIsAuthenticated(true)}/>
          </Route>
          {
            isAuthenticated &&  (
              <Route exact path='/today'>
                <Today />
              </Route>
            )
          }
          {
            isAuthenticated &&  (
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
