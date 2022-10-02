import React, { useContext, useState, useEffect } from 'react';

const Context = React.createContext();

// Shortcut way to access state
export function ContextFunction() {
    return useContext(Context)
}

// Export provider container to wrap app in so children can access
export function InputProvider({ children }) {
    // Initial value for localstorage
    const storedObject = JSON.parse(localStorage.getItem("items")) || [];
    const [UserObject, setUserObject] = useState(storedObject);

    // All states
    const [user, setUser] = useState(null);

    // Logs out user if logout clicked
    let LogoutUser = () => {
        localStorage.removeItem('items');
        obj.setUser(null)
    }

    // On UserObject change, update local storage as well
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(UserObject));
    }, [UserObject]);

    // On page load, get and set local storage values
    useEffect(() => {
        if (UserObject) {
            setUserObject(storedObject)
            setUser(UserObject.currentUser)
        }
    }, []);

    let obj = {
        user: user,
        setUser: setUser,
        LogoutUser: LogoutUser,
        UserObject: UserObject,
        setUserObject: setUserObject,
    }

    return (
        <Context.Provider value={obj}>
            {children}
        </Context.Provider>
    )
}