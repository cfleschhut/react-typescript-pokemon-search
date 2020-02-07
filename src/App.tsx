import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import { PokemonSearch, Recharts } from './components/';
import './App.css';

const App = () => (
  <Router>
    <div className="container">
      <nav>
        <ul>
          <li>
            <NavLink exact to="/">
              API Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/recharts">Recharts</NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <PokemonSearch />
        </Route>
        <Route path="/recharts">
          <Recharts />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
