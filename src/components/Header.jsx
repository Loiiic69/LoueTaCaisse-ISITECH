import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase'; // Importez l'instance Firebase configurée

// Importez "firebaseConfig" depuis firebase.js
import { firebaseConfig } from './firebase';
import Navbar from './Navbar';
import '../css/Header.css';
import vago from '../img/vago.jpg';

function Header() {
  // Étape 2 : Créez un état pour suivre l'état de connexion de l'utilisateur
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Étape 3 : Mettez à jour l'état en fonction de l'état de connexion de l'utilisateur
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsUserLoggedIn(!!user);
    });

    // Nettoyez l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);

  return (
    <header className='head'>
      <nav className="main-nav">
        <div className="dropdown">
          <div className="dropdown-content">
            <Navbar />
          </div>
        </div>
        <div className="logo-name">
          <Link to="/">
            <img src={vago} alt="Logo" />
          </Link>
          <h1>LoueTaCaisse</h1>
        </div>
        <div className="auth-buttons">
          {isUserLoggedIn ? ( // Étape 4 : Utilisez une condition pour afficher les boutons appropriés
            <button onClick={() => firebase.auth().signOut()}>Se déconnecter</button>
          ) : (
            <>
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
              <Link to="/register">
                <button className="join-button active">↗️ REJOINDRE</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
