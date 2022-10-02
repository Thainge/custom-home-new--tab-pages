import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ContextFunction } from './../../context/ContextProvider';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../hooks/firebase";
import styles from './register.module.css';

function Register() {
  const navigate = useNavigate();
  const obj = ContextFunction();

  // States
  const [formValues, setFormValues] = useState({ username: "", password: "", verifyPassword: "", })
  const [loading, setLoader] = useState(false);
  const [badValue, setBadValue] = useState('');
  const { username, password, verifyPassword } = formValues;

  // Handles input change
  function handleChange(e) {
    const value = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: value
    });
  }

  // On submit, send data to firebase to register user
  async function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    await register(username, password, verifyPassword);
    setLoader(false);
  }

  // Request to firebase to register new user
  const register = async (email, password, verifyPassword) => {
    // Check for password again to make sure they match
    if (password === verifyPassword) {
      createUserWithEmailAndPassword(auth, email, password, verifyPassword)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          obj.setUser(user)
          // also update localstorage to store user to stay signed in
          obj.setUserObject({ currentUser: user })
          navigate("/dashboard")
        })
        .catch((error) => {
          let ErrorMessage = error.toString();
          setBadValue(ErrorMessage)
        });
    } else {
      setBadValue('Different password values, please enter the same value in both password fields.')
    }

  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <h1 className={styles.headerH1}>Register</h1>
          <div>
            <label>
              Username:
              <input className={styles.inputField} type="text" value={username} name="username" onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type={'password'} className={styles.inputField} value={password} name="password" onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Verify Password:
              <input type={'password'} className={styles.inputField} value={verifyPassword} name="verifyPassword" onChange={handleChange} />
            </label>
          </div>
          <div className={styles.red}>{badValue}</div>
          {loading ? <div className={styles.loadingText}>Registering...</div> : <></>}
          <div>
            <input className={styles.submitButton} type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;