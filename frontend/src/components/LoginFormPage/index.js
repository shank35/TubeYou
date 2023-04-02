import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './LoginForm.css';
import UsernameForm from '../UserNameForm/index.js';
import PasswordForm from '../PasswordForm/index.js';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [credential, setCredential] = useState('');

  if (sessionUser) return <Redirect to="/" />;

  const handleUsernameSubmit = (username) => {
    setCredential(username);
    history.push('/password');
  };

  const handlePasswordSubmit = (password, setErrors) => {
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  return (
    <Switch>
      <Route exact path="/signin">
        <UsernameForm onSubmit={handleUsernameSubmit} />
      </Route>
      <Route path="/password">
        <PasswordForm onSubmit={handlePasswordSubmit} />
      </Route>
    </Switch>
  );
}

export default LoginFormPage;
