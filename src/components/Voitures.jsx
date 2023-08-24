import React, { useState } from 'react';
import '../css/Voitures.css'; // Assurez-vous d'importer correctement votre fichier CSS
import { optionsSportives, optionsUtilitaires, optionsCitadines } from './optionsData';

const Voitures = () => {
  const [carOptions] = useState([...optionsSportives, ...optionsUtilitaires, ...optionsCitadines]);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarClick = (car) => {
    setSelectedCar(car);
  };

  const handleCloseClick = () => {
    setSelectedCar(null);
  };

  return (
    <div className="voitures-page">
      <h1>Voitures</h1>
      <div className="carousel-container">
        <div className="carousel">
          <div className="carousel-slide">
            {carOptions.map((car) => (
              <div
                key={car.value}
                className={`carousel-item ${selectedCar === car ? 'active' : ''}`}
                onClick={() => handleCarClick(car)}
              >
                <img src={car.image} alt={car.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedCar && (
        <div className="car-details">
          <div className="car-details-content">
            <h2>{selectedCar.label}</h2>
            <p>Année : {selectedCar.year}</p>
            <p>Type : {selectedCar.type}</p>
            <button onClick={handleCloseClick}>Fermer</button>
            <br /><br />
            <button>Louez-là !</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Voitures;
