import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
// import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      {/* <Navigation /> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginFormPage} />
          <Route exact path="/password" component={LoginFormPage} />
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
