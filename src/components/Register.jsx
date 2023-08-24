import React, { useState } from "react";
import { Link } from 'react-router-dom';
import GT from '../img/GT.jpg';
import "../css/RegisterPage.css"; // Import de la feuille de style
import firebase from './firebase'; // Importez l'instance Firebase configurée

// Importez "firebaseConfig" depuis firebase.js
import { firebaseConfig } from './firebase';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Nouvel état pour la confirmation du mot de passe
    const [rememberMe, setRememberMe] = useState(false); // Etat de la checkbox
    const [confirmationMessage, setConfirmationMessage] = useState(""); // Etat du message de confirmation
    const [showPopup, setShowPopup] = useState(false); // Etat pour contrôler l'affichage de la popup
    const [errorMessage, setErrorMessage] = useState(""); // Etat pour afficher le message d'erreur

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Gérer le changement du champ "Confirmer le Mot de passe"
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked); // Changement de l'état de la checkbox
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Vérifiez si Firebase est déjà initialisé
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            // Vérifier si les mots de passe correspondent
            if (password !== confirmPassword) {
                setErrorMessage("Les mots de passe ne correspondent pas.");
                return;
            } else {
                setErrorMessage("");
            }

            // Création d'un nouvel utilisateur avec l'email et le mot de passe
            await firebase.auth().createUserWithEmailAndPassword(username, password);
            console.log("Utilisateur créé avec succès !");
          
            // Afficher le message de confirmation dans la popup
            setConfirmationMessage("Votre compte a été créé avec succès !");
            setShowPopup(true);
          
            // Réinitialiser les champs après la création du compte
            setUsername("");
            setPassword("");
            setConfirmPassword("");
          
            // Vous pouvez ajouter ici une redirection vers une autre page si nécessaire
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Cet email est déjà utilisé. Veuillez en choisir un autre.");
            } else {
                setErrorMessage("Erreur lors de la création de l'utilisateur : " + error.message);
            }
        }
    };

    return (
        <div className="login-page-container">
            <img src={GT}/>
            <div className="login-page">
                <h2>Inscription sur le site</h2>
                <form className="login-form" onSubmit={handleSubmit}>
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
                    <label htmlFor="password">Confirmer le Mot de passe :</label>
                    <div>
                        <input
                            className="login-form-input box"
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirmer le mot de passe ..."
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit">Créer mon compte</button>

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
                            <p className="clique-ici">Déjà un compte ?</p>
                            <Link to="/login">
                                <button className="join-button active">Se connecter</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span onClick={() => setShowPopup(false)} className="close-btn">&times;</span>
                        <p>{confirmationMessage}</p>
                        <Link to="/login">Se connecter</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
