import React from 'react';
import '../css/Home.css';
import voitureCitadines from '../img/voiture-citadines.png';
import utilitaires from '../img/utilitaires.png';
import sportives from '../img/sportives.png';

function Home() {
  return (
    <div className="home">
      <div className="top-rectangle">
        <div className="top-left-rectangle">
          <h2>Trouver un véhicule</h2>
          <form className='car-form'>
            <label htmlFor="location"> Retrait & Retour :  </label>
            <input type="text" id="location" name="location" />

            <label htmlFor="departure-date"> Date de départ :  </label>
            <input type="date" id="departure-date" name="departure-date" />

            <label htmlFor="return-date"> Date de retour :  </label>
            <input type="date" id="return-date" name="return-date" />

            <button type="submit">Voir les véhicules</button>
          </form>
        </div>
        <div className="top-right-rectangle">
          <div className="message-container">
            <div className="message-left">
              <h2>+250 Véhicules disponibles</h2>
              <p>Lorem ipsum dolor sit amet concecteur adipiscing exit.</p>
            </div>
            <div className="message-right">
              <h2>+250 Véhicules disponibles</h2>
              <p>Lorem ipsum dolor sit amet concecteur adipiscing exit.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-rectangle">
        <div className="bottom-left-rectangle">
          <h2>Quel type de véhicules?</h2>
        </div>
        <div className="bottom-right-rectangle">
          <div className="vehicle-type">
            <img src={voitureCitadines} />
            <h2>La location citadines</h2>
            <p>Prenez vos rêves pour des réalités, louez une belle voiture pour un mois et plus.</p>
          </div>
          <div className="vehicle-type">
            <img src={utilitaires}/>
            <h2>Nos solutions utilitaires</h2>
            <p>Du 3m3 au 20m3, choisissez celui qui vous correspond le plus.</p>
          </div>
          <div className="vehicle-type">
            <img src={sportives}/>
            <h2>La location SPORTIVES</h2>
            <p>Prenez vos rêves pour des réalités, louez une voiture sportive pour quelque jours ou plus.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
