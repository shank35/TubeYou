import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import '../../index.css';
import './SignupForm.css';

function SignupFormPage() {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [usernameValidationMessage, setUsernameValidationMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
  const [confirmPasswordValidationMessage, setConfirmPasswordValidationMessage] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const validateEmail = (email) => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailPattern.test(email)) {
      setEmailValidationMessage("Please enter a valid email address.");
      setEmailValid(false);
    } else {
      setEmailValidationMessage("Email looks good!");
      setEmailValid(true);
    }
  };
  
  const validateUsername = (username) => {
    if (username.length < 3) {
      setUsernameValidationMessage("Username must be at least 3 characters long.");
      setUsernameValid(false);
    } else {
      setUsernameValidationMessage("Username looks good!");
      setUsernameValid(true);
    }
  };
  
  const validatePassword = (password) => {
    if (password.length < 5) {
      setPasswordValidationMessage("Password must be at least 6 characters long.");
      setPasswordValid(false);
    } else {
      setPasswordValidationMessage("Password looks good!");
      setPasswordValid(true);
    }
  };
  
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password || confirmPassword.length === 0) {
      setConfirmPasswordValidationMessage("Confirm Password field must be the same as the Password field and must not be empty.");
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordValidationMessage("Passwords match!");
      setConfirmPasswordValid(true);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(email);
    validateUsername(username);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);
  
    // Check if any of the input fields are invalid
    if (!emailValid || !usernameValid || !passwordValid || !confirmPasswordValid) {
      return;
    }
  
    setErrors([]);
    return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) {
          data.errors.forEach((error) => {
            if (error.includes("Email")) {
              setEmailError(error);
              setEmailValid(false);
            } else if (error.includes("Username")) {
              setUsernameError(error);
              setUsernameValid(false);
            } else if (error.includes("Password")) {
              setPasswordError(error);
              setPasswordValid(false);
            }
          });
        } else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create your TubeYou Account</h2>
        <h3 className="signup-continue">to continue to TubeYou</h3>
        <form onSubmit={handleSubmit}>
          {/* <div className="name-container">
            <div className="inputBox">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label>
                First Name
              </label>
            </div>

            <div className="inputBox">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label>
                Last Name
              </label>
            </div>
          </div> */}
          <div className="inputBox">
          <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onInput={() => validateUsername(username)}
                required
              />
              {usernameValidationMessage && <div className={`validation-message ${usernameValid ? 'valid' : 'invalid'}`}>{usernameValidationMessage}</div>}
            <label>
              Username
            </label>
          </div>
          <div className="inputBox">
            <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onInput={() => validateEmail(email)}
                  required
                />
                {emailValidationMessage && <div className={`validation-message ${emailValid ? 'valid' : 'invalid'}`}>{emailValidationMessage}</div>}
            <label>
              Your email address
            </label>
          </div>
          <div className="password-container">
            <div className="inputBox">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={() => validatePassword(password)}
                required
              />
              {passwordValidationMessage && <div className={`validation-message ${passwordValid ? 'valid' : 'invalid'}`}>{passwordValidationMessage}</div>}
              <label>
                Password
              </label>
            </div>

            <div className="inputBox">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onInput={(e) => validateConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordValidationMessage && <div className={`validation-message ${confirmPasswordValid ? 'valid' : 'invalid'}`}>{confirmPasswordValidationMessage}</div>}
              <label>
                Confirm Password
              </label>
            </div>
          </div>
          <button type="submit">Sign Up</button>
          <div className="signInInstead">
            <Link to="/login">
              <button type="submit">Sign in instead</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
