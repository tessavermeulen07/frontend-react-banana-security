import React, {createContext, useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import Profile from "../pages/Profile";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
const [isAuth, toggleIsAuth] = useState(false);
const navigate = useNavigate();

    // Zet de state op true;
    // Logt 'Gebruiker is ingelogd!' in de console
    // Stuurt de gebruiker door naar de profielpagina

function login() {
    toggleIsAuth(true);
    console.log('Gebruiker is ingelogd!');
    navigate('/profile');
}

    const data = {
        isAuth: isAuth,
        login: login
    }

    if (isAuth) {
        console.log ('test 1');
    } else {
        console.log('test 2');
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;