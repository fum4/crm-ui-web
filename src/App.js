import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { TodayScreen, ClientsScreen } from './screens';
import { Navigation } from './components';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <TodayScreen />
          </Route>
          <Route path="/clients">
            <ClientsScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
