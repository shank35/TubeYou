import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function PasswordForm({ onSubmit }) {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password, setErrors);
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Sign In</h2>
        <h3>to continue to TubeYou</h3>
        <form onSubmit={handleSubmit}>
          <div classname="errors">
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
          </div>
          <div className="inputBox">
            <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              <label>
                Password
              </label>
          </div>
          
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordForm;
