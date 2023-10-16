import { useState } from "react";
import '../css/faq.css'

function Faq() {
  const [activeQ, setActiveQ] = useState("q1");

  const openQ = (id) => {
    setActiveQ(activeQ === id ? "" : id);
  };

  const getClassAnswer = (id) => {
    return activeQ === id ? "active-answer" : "";
  };

  const getClassQuestion = (id) => {
    return activeQ === id ? "active-question" : "";
  };

  return (
    <>
      <section className="faq-section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-content__title">
              <h5>FAQ</h5>
              <h2>Questions fréquement reçus</h2>
              <p>
              Questions fréquemment posées sur le processus de réservation de location de voitures sur notre site Web : Réponses aux préoccupations et questions courantes.
              </p>
            </div>

            <div className="all-questions">
              <div className="faq-box">
                <div
                  id="q1"
                  onClick={() => openQ("q1")}
                  className={`faq-box__question  ${getClassQuestion("q1")}`}
                >
                  <p>1. Qu'est-ce qui est spécial à propos de la comparaison des offres de location de voitures?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q1"
                  onClick={() => openQ("q1")}
                  className={`faq-box__answer ${getClassAnswer("q1")}`}
                >
                  La comparaison des offres de location de voitures est importante car elle vous aide à trouver la meilleure offre qui correspond à votre budget et à vos besoins, garantissant ainsi que vous en tirerez le meilleur rapport qualité-prix. En comparant différentes options, vous pouvez trouver des offres proposant des prix plus bas, des services supplémentaires ou de meilleurs modèles de voitures. Vous pouvez trouver des offres de location de voitures en effectuant des recherches en ligne et en comparant les prix proposés par différentes entreprises de location.
                </div>
              </div>
              <div className="faq-box">
                <div
                  id="q2"
                  onClick={() => openQ("q2")}
                  className={`faq-box__question ${getClassQuestion("q2")}`}
                >
                  <p>2. Comment puis-je trouver les offres de location de voitures ?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q2"
                  onClick={() => openQ("q2")}
                  className={`faq-box__answer ${getClassAnswer("q2")}`}
                >
                Vous pouvez trouver des offres de location de voitures en effectuant des recherches en ligne et en comparant les prix de différentes entreprises de location. Des sites web tels qu'Expedia, Kayak et Travelocity vous permettent de comparer les prix et de voir les options de location disponibles. Il est également recommandé de vous inscrire aux newsletters par e-mail et de suivre les entreprises de location de voitures sur les réseaux sociaux pour être informé de toute offre spéciale ou promotion.
                </div>
              </div>
              <div className="faq-box">
                <div
                  id="q3"
                  onClick={() => openQ("q3")}
                  className={`faq-box__question ${getClassQuestion("q3")}`}
                >
                  <p>3. Comment puis-je trouver de tels prix bas pour la location de voitures ?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q3"
                  onClick={() => openQ("q3")}
                  className={`faq-box__answer ${getClassAnswer("q3")}`}
                >
                  Réservez à l'avance : Réserver votre voiture de location à l'avance peut souvent entraîner des prix plus bas. Comparez les prix de plusieurs entreprises : Utilisez des sites Web comme Kayak, Expedia ou Travelocity pour comparer les prix de plusieurs entreprises de location de voitures. Recherchez des codes de réduction et des coupons : Recherchez des codes de réduction et des coupons que vous pouvez utiliser pour réduire le prix de la location. La location depuis un emplacement hors aéroport peut parfois entraîner des prix plus bas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;