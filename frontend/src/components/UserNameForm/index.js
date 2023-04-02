import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function UsernameForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [toPassword, setToPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, setErrors);
    setToPassword(true);
  };

  if (toPassword) return <Redirect to="/password" />;

  return (
    <div className="container">
      <div className="box">
        <h2>Sign In</h2>
        <h3>to continue to TubeYou</h3>
        <form onSubmit={handleSubmit}>
          <div className="errors">
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
          </div>
          <div className="inputBox">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            <label>
              Username or Email
            </label>
          </div>
          
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default UsernameForm;
