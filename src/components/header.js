import React from 'react';
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { ContextFunction } from './../context/ContextProvider';
import Contact from "./../pages/contact/contact";
import Dashboard from "./../pages/dashboard/dashboard";
import Home from "./../pages/home/home";
import Login from "./../pages/login/login";
import Register from "./../pages/register/register";
import PageNotFound from "./../pages/notfound";
import ProtectedRoute from './../utils/ProtectedRoute';
import styles from './header.module.css';

export function Header() {
    const obj = ContextFunction();
    const { user, LogoutUser } = obj;
    return (
        <div>
            <nav>
                <ul className={styles.ulClass}>
                    <li className={styles.liClass}>
                        <Link className={styles.linkClass} to={"/"}>Home</Link>
                    </li>
                    <li className={styles.liClass}>
                        <Link className={styles.linkClass} to={"/contact"}>Contact Us</Link>
                    </li>
                    <li className={`${styles.liClass} ${styles.alignCenter}`}>
                        {user ? <Link className={styles.linkClass} to={"/dashboard"}>Dashboard</Link> : <></>}
                    </li>
                    <li className={`${styles.liClass} ${styles.alignRight}`}>
                        {user ? <Link className={styles.linkClass} to={'/'} onClick={LogoutUser}>Logout</Link> : <Link className={styles.linkClass} to={'/login'}>Login</Link>}
                    </li>
                    <li className={`${styles.liClass} ${styles.alignRight}`}>
                        {user ? <></> : <Link className={styles.linkClass} to={'/register'}>Register</Link>}
                    </li>
                </ul>
            </nav>
            {/* All possible routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
                <Route path="/contact" element={<Contact />} />
                {/* Protected routes with children inside*/}
                <Route element={<ProtectedRoute user={user} />}>
                    <Route path={"/dashboard"} element={<Dashboard />}></Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}