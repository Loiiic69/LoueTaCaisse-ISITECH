import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour gérer la redirection
import '../css/Home.css';
import voitureCitadines from '../img/voiture-citadines.jpg';
import utilitaires from '../img/utilitaires.jpg';
import sportives from '../img/sportives.png';

function Home() {
  const [location, setLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialisez useNavigate pour gérer la redirection

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Effectuez une demande pour afficher les véhicules disponibles en utilisant les valeurs actuelles du formulaire (location, departureDate, returnDate).
    // Vous pouvez utiliser fetch() ou une bibliothèque comme Axios pour cela.
    // Par exemple :
    fetch('http://localhost:3001/api/afficher-vehicules', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location, departureDate, returnDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Traitez les données de réponse ici.
        // Redirigez l'utilisateur vers la page "AfficherVehicules" avec les données du formulaire.
        navigate('/afficher-vehicules', {
          state: { vehicules: data.vehicules, location, departureDate, returnDate },
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la demande :', error);
        setLoading(false);
      });
  };

  return (
    <div className="home">
      <div className="top-rectangle">
        <div className="top-left-rectangle">
          <h2>Trouver un véhicule</h2>
          <form className='car-form' onSubmit={handleSubmit}>
            <label htmlFor="location"> Retrait & Retour :  </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label htmlFor="departure-date"> Date de départ :  </label>
            <input
              type="date"
              id="departure-date"
              name="departure-date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />

            <label htmlFor="return-date"> Date de retour :  </label>
            <input
              type="date"
              id="return-date"
              name="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />

            <button type="submit">Voir les véhicules</button>
          </form>
        </div>
        <div className="top-right-rectangle">
          {/* Affichage de véhicules ici */}
          {loading ? (
            <p>Chargement en cours...</p>
          ) : (
            <div className="vehicle-list">
              {/* Vos véhicules seront affichés ici */}
            </div>
          )}
        </div>
      </div>
      <div className="bottom-rectangle">
        <div className="bottom-left-rectangle">
          <h2>Quel type de véhicules?</h2>
        </div>
        <div className="bottom-right-rectangle">
          <div className="vehicle-type">
            <img src={voitureCitadines} alt="Voiture Citadines" />
            <h2>La location citadines</h2>
            <p>Prenez vos rêves pour des réalités, louez une belle voiture pour un mois et plus.</p>
          </div>
          <div className="vehicle-type">
            <img src={utilitaires} alt="Utilitaires" />
            <h2>Nos utilitaires</h2>
            <p>Du 3m3 au 20m3, choisissez celui qui vous correspond le plus.</p>
          </div>
          <div className="vehicle-type">
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
