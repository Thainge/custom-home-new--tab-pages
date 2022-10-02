import React, { useState } from 'react';
import { ContextFunction } from './../../context/ContextProvider';
import { getAuth, updateProfile } from "firebase/auth";
import styles from './dashboard.module.css';

function Dashboard() {
    const obj = ContextFunction();
    const { user } = obj;

    // States
    const [formValues, setFormValues] = useState({ name: '' })
    const { name } = formValues;

    // Handles input change
    function handleChange(e) {
        const value = e.target.value;
        setFormValues({
            ...formValues,
            [e.target.name]: value
        });
    }

    // On submit, send data to firebase to register user
    async function handleSubmit() {
        updateUserInfo();
    }

    // Update user profile
    const auth = getAuth();
    const updateUserInfo = () => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
    }

    return (
        <div>
            <h1 className={styles.headerH1}>Welcome to the portal</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <h1 className={styles.headerH1}>Dashboard</h1>
                    <div>
                        <label>
                            Name:
                            <input type='text' className={styles.inputField} name="name" onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <input className={styles.submitButton} type="submit" value="Apply" />
                    </div>
                </div>
            </form>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <h1>Name: {user.displayName}</h1>
                </div>
            </form >
        </div >
    )
}

export default Dashboard;