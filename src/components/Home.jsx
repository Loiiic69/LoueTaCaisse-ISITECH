import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import voitureCitadines from '../img/voiture-citadines.jpg';
import utilitaires from '../img/utilitaires.jpg';
import sportives from '../img/sportives.png';
import firebase from './firebase';

function Home() {
  const [location, setLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate('/vehicleslist', {
          state: { location, departureDate, returnDate },
        });
      } else {
        alert("Vous devez être connecté pour voir les véhicules.");
        navigate('/login');
      }
    });
  };

  return (
    <div className="home">
      <div className="top-rectangle">
        <div className="top-left-rectangle">
          <h2>Explorez notre gamme de véhicules</h2>
          <form className='car-form' onSubmit={handleSubmit}>
            <p>Découvrez une sélection exceptionnelle de véhicules pour tous vos besoins</p>
            <button type="submit">Voir nos véhicules</button>
          </form>
        </div>
        <div className="top-right-rectangle">
          <div className="text">
            <span>Explorez notre univers de véhicules et laissez vos rêves prendre le volant ! 🚀</span>
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
