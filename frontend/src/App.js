import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={LoginFormPage} />
        <Route exact path="/password" component={LoginFormPage} />
      </Switch>
    </Router>
  );
}

export default App;
