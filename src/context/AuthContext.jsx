import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(
        {
            isAuth: false,
            user: null,
            status: 'pending'
        });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('JWT');
        if (token) {
            const tokenId = jwtDecode(token);
                if (isTokenValid(tokenId)) {
                    toggleIsAuth({
                        isAuth: true,
                        status: 'done',
                        user: {
                            email: tokenId.email,
                            roles: tokenId.role,
                        },
                    });
            } else {
                    toggleIsAuth({
                        isAuth: false,
                        status: 'done',
                        user: null,
                    });
                }
            } else toggleIsAuth({
            isAuth: false,
            status: 'done',
            user: null,
        });
    }, []);




    async function getProfile(id) {
        const token = localStorage.getItem('JWT');
        // console.log(token, id);
        try {
            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'novi-education-project-id': '268aff3c-ae58-411a-a55f-e0c1ec05146d'
                }
            })
            // console.log(response);
        } catch (e) {
            // console.error(e);
        }
    }

    // Zet de state op true;
    // Logt 'Gebruiker is ingelogd!' in de console
    // Stuurt de gebruiker door naar de profielpagina

    function login(token) {
        localStorage.setItem('JWT', token);
        // console.log('Gebruiker is ingelogd!');
        toggleIsAuth({
            isAuth: true,
            status: 'done',
            user: {
                email: token.user.email,
                roles: token.user.role
            }
        });

        useEffect( () => {
            if (isAuth) {
                navigate('/profile');
            }
        }, [isAuth]);



        // const tokenId = jwtDecode(token);
        // console.log(tokenId.userId);
        getProfile(tokenId.userId);
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
    // console.log('Gebruiker is uitgelogd!');
    navigate('/');
    }

    const data = {
        isAuth: isAuth,
        login: login,
        logout:  logout
    }

    return (
        <AuthContext.Provider value={data}>
            {/*{children}*/}
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
            {/*Ik krijg nu alleen loading te zien. Wat gaat er mis?*/}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;