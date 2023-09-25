import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import 'firebase/compat/database';

import '../css/VehiclesList.css'; // Ajoutez le fichier CSS pour les styles

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
      // Filtrer les véhicules en fonction de la ville sélectionnée
      const filtered = Object.keys(vehicleData).filter((key) => {
        return vehicleData[key].location === selectedCity;
      });
      setFilteredVehicles(filtered);
    } else {
      // Si aucune ville n'est sélectionnée, afficher tous les véhicules
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
          <option value="Paris">Paris</option>
          <option value="AutreVille">Lyon</option>
          <option value="AutreVille">Marseille</option>

          {/* Ajoutez d'autres options de ville au besoin */}
        </select>
      </div>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <ul className="vehicle-ul">
          {filteredVehicles.map((key) => (
            <li key={key} className="vehicle-li">
              <h3>{vehicleData[key].label}</h3>
              <p>Type: {vehicleData[key].type}</p>
              <p>Prix: {vehicleData[key].price}</p>
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