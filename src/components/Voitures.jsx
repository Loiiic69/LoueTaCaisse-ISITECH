import React, { useState, useEffect } from 'react';
import { optionsSportives, optionsUtilitaires, optionsCitadines } from './optionsData';

const Voitures = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide => (currentSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide => (currentSlide - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide => (currentSlide + 1) % slides.length);
  };

  useEffect(() => {
    // Combining all options into a single array for the carousel
    setSlides([...optionsSportives, ...optionsUtilitaires, ...optionsCitadines]);
  }, []);

  return (
    <div>
      <h1>Voitures</h1>

      <div>
        <h2>Véhicules sportifs</h2>
        <div className="carousel-container">
          <button className="carousel-button prev-button" onClick={handlePrevSlide}>&#8249;</button>
          <div className="carousel">
            {slides.map((slide, index) => (
              <div key={slide.value} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                <img src={slide.image} alt={slide.label} />
                <p>{slide.label}</p>
              </div>
            ))}
          </div>
          <button className="carousel-button next-button" onClick={handleNextSlide}>&#8250;</button>
        </div>
      </div>
    </div>
  );
};

export default Voitures;
