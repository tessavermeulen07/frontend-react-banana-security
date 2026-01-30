import React, {createContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(
        {
            isAuth: false,
            user: null,
            status: 'pending'
        });
    const navigate = useNavigate();



// Zet de state op true;
// Logt 'Gebruiker is ingelogd!' in de console
// Stuurt de gebruiker door naar de profielpagina

function login(token) {
        toggleIsAuth({isAuth: true, user: ''});
        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
        localStorage.setItem('JWT', token);

        const tokenId = jwtDecode(token);
        console.log(tokenId.userId);
        getProfile(tokenId.userId);
    }

    async function getProfile(id) {
        const token = localStorage.getItem('JWT');
        console.log(token, id);
        try {
            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'novi-education-project-id': '268aff3c-ae58-411a-a55f-e0c1ec05146d'
                }
            })
            console.log(response);

        } catch (e) {
            console.error(e);
        }
    }

// Zet de state op false;
// Logt 'Gebruiker is uitgelogd!' in de console
// Stuurt de gebruiker door naar de homepagina
function logout() {
    localStorage.removeItem('JWT');
    toggleIsAuth({
        isAuth: false,
        user: null,
        status: 'done'
    });
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