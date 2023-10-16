import React from "react";
import "../css/avisclient.css";

import avatar1 from "../img/avatar1.jpg"; // Importez vos images d'avatar
import avatar2 from "../img/avatar2.jpg"; // Importez vos images d'avatar

function AvisClient() {
  return (
    <>
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-content">
            <div className="testimonials-content__title">
              <h2>Avis clients</h2>
              <p>
                Découvrez l'impact positif que nous avons eu sur nos clients en lisant leurs témoignages. Nos clients ont vécu notre service et les résultats, et ils sont impatients de partager leurs expériences positives avec vous.
              </p>
            </div>

            <div className="all-testimonials">
              <div className="all-testimonials__box">
                <span className="quotes-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p>
                  "Nous avons loué une voiture sur ce site web et avons eu une expérience incroyable ! La réservation était facile et les tarifs de location étaient très abordables."
                </p>
                <div className="all-testimonials__box__name">
                  <div className="all-testimonials__box__name__profile">
                    <img src={avatar1} alt="Avatar de Jones Mbogholi" />
                    <span>
                      <h4>Jones Mbogholi</h4>
                      <p>Lyon</p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="all-testimonials__box box-2">
                <span className="quotes-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p>
                  "La voiture était en excellente condition et a rendu notre voyage encore meilleur. Je recommande vivement ce site de location de voitures !"
                </p>
                <div className="all-testimonials__box__name">
                  <div className="all-testimonials__box__name__profile">
                    <img src={avatar2} alt="Avatar de Solomon Odingo" />
                    <span>
                      <h4>Solomon Odingo</h4>
                      <p>Paris</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AvisClient;
