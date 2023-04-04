import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Video from "./components/Video";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/password' && location.pathname !== '/signup' && <Navigation />}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginFormPage} />
        <Route exact path="/password" component={LoginFormPage} />
        <Route path="/signup" component={SignupFormPage} />
        <Route exact path="/video" component={Video} />
      </Switch>
    </>
  );
}

export default App;
