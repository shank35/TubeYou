import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import './reset.css';
import './UserNameForm.css';

function UsernameForm({ onSubmit }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [toPassword, setToPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setErrors([]); // clear the errors state
    if (!emailRegex.test(username)) {
      setErrors(['Invalid email address']);
      return;
    }
    onSubmit(username, setErrors);
    setToPassword(true);
  };

  // login demo user with button
  function demoUser() {
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }));
    // sessionActions.login({ credential: 'Demo-lition', password: 'password' });
  }
  

  if (toPassword) return <Redirect to="/password" />;

  return (
    <div className="container">
      <div className="box">
        <h2>Sign In</h2>
        <h3>to continue to TubeYou</h3>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            <label>
              Email
            </label>
          </div>
          <div className="errors">
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
          </div>
          <div className="demo">
            <button type="submit" onClick={demoUser}>Demo User</button>
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default UsernameForm;
