import React, {createContext, useState} from "react";
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(
        {
            isAuth: false,
            user: ''
        });
    const navigate = useNavigate();

// Zet de state op true;
// Logt 'Gebruiker is ingelogd!' in de console
// Stuurt de gebruiker door naar de profielpagina
function login() {
        toggleIsAuth({isAuth: true, user: ''});
        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
    }

// Zet de state op false;
// Logt 'Gebruiker is uitgelogd!' in de console
// Stuurt de gebruiker door naar de homepagina
function logout() {
    toggleIsAuth({isAuth: false, user: ''});
    console.log('Gebruiker is uitgelogd!');
    navigate('/');
    }

    const data = {
        isAuth: isAuth,
        login: login,
        logout:  logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;