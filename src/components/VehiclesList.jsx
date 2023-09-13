import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import 'firebase/compat/database';
import 'firebase/compat/firestore'

function VehiclesList() {
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    const vehiclesRef = firebase.database().ref('/vehiclesList/rs3');
    vehiclesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVehicleData(data);
      }
    });
  
    return () => {
      vehiclesRef.off('value');
    };
  }, []);

  return (
    <div className="vehicle-detail">
      <h2>Détails du véhicule RS3</h2>
      {vehicleData ? (
        <div>
          <h3>{vehicleData.name}</h3>
          <p>Type: {vehicleData.type}</p>
          <p>Prix: {vehicleData.price}</p>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}

export default VehiclesList;
