import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import '../css/Admin.css';

const Admin = () => {
  const [carOptions, setCarOptions] = useState([]);
  const [newDispos, setNewDispos] = useState([]);
  const [newPrices, setNewPrices] = useState([]);

  const fetchCarOptions = () => {
    const db = firebase.database();
    const carOptionsRef = db.ref('carOptions');

    carOptionsRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const options = [];
        snapshot.forEach((childSnapshot) => {
          const option = childSnapshot.val();
          options.push({ id: childSnapshot.key, ...option });
        });
        setCarOptions(options);

        // Initialise les tableaux d'états pour les nouvelles disponibilités et prix
        setNewDispos(new Array(options.length).fill(''));
        setNewPrices(new Array(options.length).fill(''));
      }
    });
  };

  const updateCarOption = (id, index) => {
    const db = firebase.database();
    const carOptionRef = db.ref('carOptions').child(id);

    carOptionRef.update({
      dispo: newDispos[index],
      price: newPrices[index],
    });

    // Efface les champs après la mise à jour
    setNewDispos((prevDispos) => {
      const newDisposCopy = [...prevDispos];
      newDisposCopy[index] = '';
      return newDisposCopy;
    });

    setNewPrices((prevPrices) => {
      const newPricesCopy = [...prevPrices];
      newPricesCopy[index] = '';
      return newPricesCopy;
    });
  };

  useEffect(() => {
    fetchCarOptions();
  }, []);

  const user = firebase.auth().currentUser;
  const authorizedUserId = '9yeVP3O407R26SJpjaDgS6AbYBh1'; // Remplacez par l'UID de l'utilisateur autorisé

  if (user && user.uid === authorizedUserId) {
    return (
      <div className="container">
        <h2>Liste des options de voiture</h2>
        <ul>
          {carOptions.map((option, index) => (
            <li key={option.id}>
              {option.label} - Disponibilité : {option.dispo}, Prix : {option.price}
              <label>
                Nouvelle disponibilité :
                <input
                  type="text"
                  value={newDispos[index]}
                  onChange={(e) => {
                    const newDisposCopy = [...newDispos];
                    newDisposCopy[index] = e.target.value;
                    setNewDispos(newDisposCopy);
                  }}
                />
              </label>
              <label>
                Nouveau prix :
                <input
                  type="text"
                  value={newPrices[index]}
                  onChange={(e) => {
                    const newPricesCopy = [...newPrices];
                    newPricesCopy[index] = e.target.value;
                    setNewPrices(newPricesCopy);
                  }}
                />
              </label>
              <button onClick={() => updateCarOption(option.id, index)}>Mettre à jour</button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p className="access-denied">Accès refusé. Vous n'êtes pas autorisé à accéder au panel admin.</p>;
  }
};

export default Admin;
