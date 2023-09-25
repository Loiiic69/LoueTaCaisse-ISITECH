import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import voitureCitadines from '../img/voiture-citadines.jpg';
import utilitaires from '../img/utilitaires.jpg';
import sportives from '../img/sportives.png';

function Home() {
  const [location, setLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const navigate = useNavigate(); // Initialisez useNavigate pour gérer la redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirigez l'utilisateur vers la page "AfficherVehicules" avec les données du formulaire.
    navigate('/vehicleslist', {
      state: { location, departureDate, returnDate },
    });
  };

  return (
    <div className="home">
      <div className="top-rectangle">
        <div className="top-left-rectangle">
          <h2>Trouver un véhicule</h2>
          <form className='car-form' onSubmit={handleSubmit}>
            <p>Vous trouverez nos véhicules</p>
            <button type="submit">Voir les véhicules</button>
          </form>
        </div>
        <div className="top-right-rectangle">
          {/* Affichage de véhicules ici */}
          <div className="vehicle-list">
            {/* Vos véhicules seront affichés ici */}
          </div>
        </div>
      </div>

      <div className="bottom-rectangle">
        <div className="bottom-left-rectangle">
          <h2>Quel type de véhicules?</h2>
        </div>
        <div className="bottom-right-rectangle">
          <div className="vehicle-type citadines">
            <img src={voitureCitadines} alt="Voiture Citadines" />
            <h2>La location citadines</h2>
            <p>Prenez vos rêves pour des réalités, louez une belle voiture pour un mois et plus.</p>
          </div>
          <div className="vehicle-type utilitaires">
            <img src={utilitaires} alt="Utilitaires" />
            <h2>Nos utilitaires</h2>
            <p>Du 3m3 au 20m3, choisissez celui qui vous correspond le plus.</p>
          </div>
          <div className="vehicle-type sportives">
            <img src={sportives} alt="Sportives" />
            <h2>La location SPORTIVES</h2>
            <p>Prenez vos rêves pour des réalités, louez une voiture sportive pour quelques jours ou plus.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
