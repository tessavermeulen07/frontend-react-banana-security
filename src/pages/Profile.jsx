import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";



function Profile() {

  const {user, isAuth} = useContext(AuthContext);
  const [privateContent, setPrivateContent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    async function fetchPrivateContent(){
     try {
       const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets`, {
         headers: {
           'novi-education-project-id': '268aff3c-ae58-411a-a55f-e0c1ec05146d'
         }
       });
       console.log(response);
       setPrivateContent(response.data);
     } catch (e) {
       console.error ('Fout bij het ophalen van private content', e);
     }
    }
    if (token) {
      void fetchPrivateContent();
    }
  }, []);

    return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> user.username - deze kan ik niet ophalen, staat niet in de swagger genoteerd.</p>
        <p><strong>Email:</strong> {user.email} </p>
      </section>
      {privateContent ? (
          <section>
            <h2>Afgeschermde content voor ingelogde gebruikers</h2>
            <p>{privateContent}</p>
          </section>
      ) : (
          <p>Private content kan niet geladen worden.</p>
      )}
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;