import React, {useState} from 'react';
import {Link, Navigate, NavLink} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [error, setError] = useState('');
    const [newUserId, setNewUserId] = useState(null);
    const [succes, setSucces] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const post = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                "email": `${emailValue}`,
                "password": `${passwordValue}`,
                "username": `${usernameValue}`,
                "roles": [''],
            }, {
                headers: {
                    'novi-education-project-id': '268aff3c-ae58-411a-a55f-e0c1ec05146d'
                }
            })
            console.log(post)
            setNewUserId(post.data.id);
            setSucces(true);
        } catch (error) {
            setError('Het is niet gelukt om te registreren. Probeer het later opnieuw.');
        }
    }


    return (
        <>
            <h1>Registreren</h1>
            {succes === true ? (
                <p>Je bent succesvol geregistreerd. Klik <NavLink to="/Signin">hier</NavLink> om in te loggen</p>
            ) : (
                <>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                    eligendiharum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                    deserunt doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

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
                    <label htmlFor="username">
                        <p>Gebruikersnaam:</p>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={usernameValue}
                            onChange={(e) => setUsernameValue(e.target.value)}
                        />
                    </label>
                    <button
                        type="submit"
                        name="send"
                        value="send"
                    >
                        Registreren
                    </button>
                </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
                    </>
            )
        }
</>
)
;
}

export default SignUp;