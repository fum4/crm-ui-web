import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Today, Clients } from './screens';
import { Navigation } from './components';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Today />
          </Route>
          <Route path="/clients">
            <Clients />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
