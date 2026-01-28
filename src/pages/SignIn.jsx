import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(emailValue, passwordValue);
        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                email: emailValue,
                password: passwordValue,
            },
        {
            headers: {
                'novi-education-project-id': '268aff3c-ae58-411a-a55f-e0c1ec05146d'
            }
        })
            console.log(response);
            login(response.data.token);
        } catch (error) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    <p>E-mailadres:</p>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    <p>Wachtwoord:</p>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                </label>

                <button
                    type="submit"
                >Inloggen
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;