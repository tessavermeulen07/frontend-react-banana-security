import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [emailValue, setEmailValue] = useState ('');
  const [passwordValue, setPasswordValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');


    return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form>
        <p>*wachtwoord gebruikersnaam*</p>
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
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;