import React, {createContext, useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import Profile from "../pages/Profile";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
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

// Zet de state op false;
// Logt 'Gebruiker is uitgelogd!' in de console
// Stuurt de gebruiker door naar de homepagina
function logout() {
    toggleIsAuth(false);
    console.log('Gebruiker is uitgelogd!');
    navigate('/');
    }

    const data = {
        isAuth: isAuth,
        login: login,
        logout:  logout
    }

    if (isAuth) {
        console.log('test 1');
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