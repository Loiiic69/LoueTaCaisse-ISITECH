import React from 'react';
import '../css/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 LoueTaCaisse</p>
        <ul className="footer-links">
          <li><a href="/#">Accueil</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/voitures">Voitures</a></li>
          <li><a href="/contact">Aide </a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
