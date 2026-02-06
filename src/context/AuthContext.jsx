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
                void getProfile(tokenId.userId);
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
        try {
            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'novi-education-project-id': '268aff3c-ae58-411a-a55f-e0c1ec05146d'
                }
            });
            console.log('Profiel opgehaald');
            console.log(isAuth);
            toggleIsAuth({
                isAuth: true,
                status: 'done',
                user: response.data.user
                // user: {
                //     email: response.data.email,
                //     roles: response.data.role,
                // },
            });
        } catch (e) {
            console.error(e);
        }
    }


    function login(token) {
        localStorage.setItem('JWT', token.token);

        toggleIsAuth({
            isAuth: true,
            status: 'done',
            user: token.user
        });
        console.log('ingelogd');
        console.log(isAuth);
       navigate('/profile');
    }

    console.log(isAuth);

    function logout() {
        localStorage.removeItem('JWT');
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        console.log('uitgelogd');
        console.log(isAuth);
        navigate('/');
    }

    const data = {
        isAuth: isAuth,
        user: isAuth.user,
        status: isAuth.status,
        login: login,
        logout:  logout
    }

    return (
        <AuthContext.Provider value={data}>
           {isAuth.status === 'done' ? children : <p>Loading...</p>}
       </AuthContext.Provider>
    )
}

export default AuthContextProvider;
