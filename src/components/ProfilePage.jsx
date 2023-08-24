import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from './firebase';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false); // Nouvel état pour gérer l'erreur de correspondance des mots de passe
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMismatchError(true); // Afficher l'erreur de correspondance des mots de passe
      return;
    }

    try {
      await user.updatePassword(newPassword);
      setPasswordUpdated(true);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMismatchError(false); // Réinitialiser l'état de l'erreur de correspondance des mots de passe
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-content">
          <h1>Bienvenue, {user.displayName}!</h1>
          <p>Email: {user.email}</p>

          <div className="password-change-container">
            <h2>Changer le mot de passe</h2>
            {passwordUpdated && <p className="success-message">Mot de passe mis à jour avec succès!</p>}
            {passwordMismatchError && <p className="error-message">Les mots de passe ne correspondent pas.</p>}
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmer le nouveau mot de passe"
            />
            <button onClick={handleChangePassword}>Changer le mot de passe</button>
          </div>

          <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProfilePage;
