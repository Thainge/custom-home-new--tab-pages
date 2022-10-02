import React, { useState } from 'react';
import { ContextFunction } from './../../context/ContextProvider';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from './login.module.css';

function Login() {
    const obj = ContextFunction();
    const navigate = useNavigate();

    // States
    const [formValues, setFormValues] = useState({ username: "", password: "", })
    const [loading, setLoader] = useState(false);
    const [badValue, setBadValue] = useState('');
    const { username, password } = formValues;

    // Handles input change
    function handleChange(e) {
        const value = e.target.value;
        setFormValues({
            ...formValues,
            [e.target.name]: value
        });
    }

    // On submit, send data to firebase to login user
    async function handleSubmit(e) {
        e.preventDefault();
        setLoader(true);
        await login(username, password);
        setLoader(false);
    }

    // Request to firebase to login existing user
    const auth = getAuth();
    const login = async (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
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
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <h1 className={styles.headerH1}>Login</h1>
                    <div>
                        <label>
                            Email:
                            <input className={styles.inputField} type="text" value={username} name="username" onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input type={'password'} className={styles.inputField} value={password} name="password" onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.red}>{badValue}</div>
                    {loading ? <div className={styles.loadingText}>Signing In...</div> : <></>}
                    <div>
                        <input className={styles.submitButton} type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
