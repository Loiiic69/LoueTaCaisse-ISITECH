import React from 'react';
import '../css/Contact.css';

function Contact() {
  return (
    <div className="page-content">
      <section className="contact-section">
        <h3 className="contact-title">Assistance</h3>
        <p className="contact-text">
          Contactez notre équipe d'assistance pour résoudre votre problème, par téléphone au&nbsp;
          <span className="contact-phone">01 53 40 95 35</span> ou en envoyant un mail à{' '}
          <a href="mailto:support@loc.fr">support@louetacaisse.fr</a>.
        </p>
        <p className="contact-info">
          Du lundi au vendredi de 7h à minuit. Samedi, dimanche et jours fériés de 9h à 19h.
        </p>
      </section>

      <section className="contact-section">
        <h3 className="contact-title">Suggestions ?</h3>
        <p className="contact-text">
          Si vous avez des idées d'améliorations, merci de nous le faire savoir par mail à{' '}
          <a href="mailto:support@loc.fr">support@louetacaisse.fr</a>.
        </p>
      </section>
    </div>
  );
}

export default Contact;