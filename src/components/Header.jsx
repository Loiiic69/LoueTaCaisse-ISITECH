import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';
import { firebaseConfig } from './firebase';
import Navbar from './Navbar';
import '../css/Header.css';
import vago from '../img/vago.jpg';

function Header() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className='head'>
      <nav className="main-nav">
        <div className="logo-name">
          <Link to="/">
            <img src={vago} alt="Logo" />
          </Link>
          <h1>LoueTaCaisse</h1>
        </div>
        <div className="auth-buttons">
          {isUserLoggedIn ? (
            <>
              <button onClick={() => firebase.auth().signOut()}>Se déconnecter</button>
              <button onClick={() => { window.location.href = '/profil'; }}>
                Profil
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
              <Link to="/register">
                <button className="join-button active">REJOINDRE</button>
              </Link>
            </>
          )}
        </div>
        <div className="dropdown">
          <div className="dropdown-content">
            <Navbar />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
