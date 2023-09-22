import React, { useState, useEffect } from 'react';
import '../css/AfficherVehicules.css'; // Importez le fichier CSS

function AfficherVehicules() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Effectuez une demande pour obtenir la liste des véhicules disponibles depuis votre serveur
    fetch('/api/afficher-vehicules', { // Utilisez l'URL de votre serveur
      method: 'GET', // Utilisez la méthode GET pour obtenir des données
    })
      .then((response) => response.json())
      .then((data) => {
        setVehicules(data.vehicules);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la demande :', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="afficher-vehicules-container">
      {vehicules.map((vehicule) => (
        <div className="vehicule" key={vehicule.id}>
          <img src={vehicule.image} alt={vehicule.label} />
          <h2>{vehicule.label}</h2>
        </div>
      ))}
    </div>
  );
}

export default AfficherVehicules;
