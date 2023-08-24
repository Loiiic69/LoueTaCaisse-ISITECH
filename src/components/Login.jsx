import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import GT from '../img/GT.jpg';
import "../css/LoginPage.css";
import firebase from './firebase';
import { firebaseConfig } from './firebase';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // État pour gérer le message d'erreur
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            await firebase.auth().signInWithEmailAndPassword(username, password);
            console.log("Utilisateur connecté avec succès !");
            navigate("/profil"); // Redirection vers la page de profil
        } catch (error) {
            console.error("Erreur lors de la connexion de l'utilisateur :", error.message);
            setErrorMessage("Email ou mot de passe incorrect."); // Définir le message d'erreur
        }
    };

    return (
        <div className="login-page-container">
            <img src={GT}/>
            <div className="login-page">
                <h2>Connecte-toi à ton compte</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Afficher le message d'erreur */}
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="username">Email :</label>
                    <div>
                        <input
                            className="login-form-input box"
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Adresse mail ..."
                        />
                    </div>
                    <label htmlFor="password">Mot de passe :</label>
                    <div>
                        <input
                            className="login-form-input box"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Mot de passe ..."
                        />
                    </div>

                    <button type="submit">Connexion</button>

                    <div>
                        <label htmlFor="remember-me" className="remember-me-label">
                        </label>
                        <div className="remember-me-container">
                            <label htmlFor="remember-me" className="remember-me-label">
                                Se souvenir de moi
                            </label>
                            <input
                                type="checkbox"
                                id="remember-me"
                                className="checkbox-custom"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                        </div>
                        <div className="join-container">
                            <p className="clique-ici">Pas encore de compte ?</p>
                            <Link to="/inscription">
                                <button className="join-button active">Rejoindre</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
