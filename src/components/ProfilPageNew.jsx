import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from './firebase';
import '../css/Profil.css'; 

const NewProfilPage = () => {
  const [user, setUser] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
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

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);

      const userCredential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );

      user.reauthenticateWithCredential(userCredential)
        .then(() => {
          return user.updatePassword(newPassword);
        })
        .then(() => {
          setPasswordUpdated(true);
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setShowPasswordFields(false);
          setPasswordMismatchError(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du mot de passe:', error);
          setPasswordMismatchError(true); 
        });
    }
  };

  const handleClosePasswordChange = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordFields(false);
    setPasswordMismatchError(false);
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-content">
          <h1>Bienvenue {user.displayName}!</h1>
          <p>Email: {user.email}</p>

          <div className="password-change-container">
            <h2>Changer le mot de passe</h2>
            {passwordUpdated && <p className="success-message">Mot de passe mis à jour avec succès!</p>}
            {passwordMismatchError && <p className="error-message">L'ancien mot de passe est incorrect.</p>}
            {!showPasswordFields ? (
              <button className="password-button" onClick={() => setShowPasswordFields(true)}>
                Changer mon mot de passe
              </button>
            ) : (
              <div className="password-change">
                <input
                  type="password"
                  placeholder="Ancien mot de passe"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirmer le nouveau mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && <p className="password-error">Les mots de passe ne correspondent pas</p>}
                <button className="conf" onClick={handlePasswordChange}>Confirmer le changement</button>
                <button className="conf" onClick={handleClosePasswordChange}>Fermer</button>
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NewProfilPage;