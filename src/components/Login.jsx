import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import GT from '../img/GT.jpg';
import "../css/LoginPage.css";
import firebase from './firebase';
import { firebaseConfig } from './firebase';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [resetPasswordClicked, setResetPasswordClicked] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); 
    const [resetSuccessMessage, setResetSuccessMessage] = useState(""); 
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

    const handleForgotPassword = async () => {
        if (!username) {
            setErrorMessage("Veuillez entrer votre adresse e-mail pour réinitialiser le mot de passe.");
            return; 
        }

        setResetPasswordClicked(true);

        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            await firebase.auth().sendPasswordResetEmail(username);
            setResetSuccessMessage("E-mail de réinitialisation du mot de passe envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail de réinitialisation du mot de passe :", error.message);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            await firebase.auth().signInWithEmailAndPassword(username, password);
            console.log("Utilisateur connecté avec succès !");
            navigate("/profil");
        } catch (error) {
            console.error("Erreur lors de la connexion de l'utilisateur :", error.message);
            setErrorMessage("Email ou mot de passe incorrect.");
        }
    };

    const handleCloseSuccessMessage = () => {
        setResetSuccessMessage(""); // Cette fonction sera appelée pour fermer la boîte de dialogue de succès
    };

    return (
        <div className="login-page-container">
            <img src={GT} alt="GT" />
            <div className="login-page">
                <h2>Connecte-toi à ton compte</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {resetSuccessMessage && (
                    <div className="success-message">
                        {resetSuccessMessage}
                        <button onClick={handleCloseSuccessMessage}>Fermer</button>
                    </div>
                )}
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
                            disabled={resetPasswordClicked}
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
                    <button type="button" onClick={handleForgotPassword}>
                        Mot de passe oublié ?
                    </button>

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
