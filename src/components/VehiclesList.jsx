import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import 'firebase/compat/database';

import '../css/VehiclesList.css'; // Assurez-vous d'ajouter le fichier CSS pour les styles

function VehiclesList() {
  const [vehicleData, setVehicleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  useEffect(() => {
    const vehiclesRef = firebase.database().ref('/carOptions');
    vehiclesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVehicleData(data);
        setLoading(false);
      }
    });

    return () => {
      vehiclesRef.off('value');
    };
  }, []);

  useEffect(() => {
    if (selectedCity !== '') {
      const filtered = Object.keys(vehicleData).filter((key) => {
        return vehicleData[key].location === selectedCity;
      });
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles(Object.keys(vehicleData));
    }
  }, [selectedCity, vehicleData]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="vehicle-list">
      <h2>Liste des véhicules</h2>
      <div className="city-selector">
        <label htmlFor="city">Sélectionnez une ville :</label>
        <select id="city" onChange={handleCityChange}>
          <option value="">Toutes les villes</option>
          <option value="Lyon">Lyon</option>
          <option value="Paris">Paris</option>
          <option value="Marseille">Marseille</option>
        </select>
      </div>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <ul className="vehicle-ul">
          {filteredVehicles.map((key) => (
            <li key={key} className="vehicle-li">
              <h3>{vehicleData[key].label}</h3>
              <div className='info'>
                <div className='one'>
                <p>Type: {vehicleData[key].type}</p>
                <p>Prix: {vehicleData[key].price}€ / jours</p>
                <p>Ville: {vehicleData[key].location}</p>
                </div>
                <div className='two'>
              
                <div className="phone-info">
                  <img
                    src="https://www.icone-png.com/png/6/5532.png" 
                    alt="Téléphone"
                    className="phone-icon"
                  />
                  <p className="phone-number">07 99 99 99 99</p>
                </div>
                <div className="phone-info">
                  <img
                    src="https://www.icone-png.com/png/10/10073.png" // Ajoutez l'URL de votre icône de téléphone
                    alt="Téléphone"
                    className="phone-icon"
                  />
                  <p className="phone-number">Ou par mail : reservation@louetacaisse.fr</p>
                </div>
                </div>
              </div>
              <img
                src={vehicleData[key].image}
                alt={vehicleData[key].label}
                className="vehicle-image"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VehiclesList;