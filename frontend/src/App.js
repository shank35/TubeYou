// App.js
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import VideoFormPage from "./components/VideoForm";
import VideoShowPage from "./components/VideoShow";

function App() {
  const location = useLocation();
  const user = useSelector(state => state.session);
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/password' && location.pathname !== '/signup' && <Navigation />}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginFormPage} />
        <Route exact path="/password" component={LoginFormPage} />
        <Route path="/signup" component={SignupFormPage} />
        <Route exact path="/videos/upload" component={VideoFormPage} />
        <Route path="/videos/:videoId" render={(props) => (
          <VideoShowPage {...props} user={user.user} />
        )} />
      </Switch>
    </>
  );
}

export default App;
