import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import firebase from './components/firebase'; // Le chemin doit être correct pour le fichier firebase.js dans src/
import 'firebase/auth';
import 'firebase/compat/database';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import Header from './components/Header';
import NewProfilPage from './components/ProfilPageNew';
import BlogPage from './components/blog';
import VehiclesList from './components/VehiclesList';
import Footer from './components/footer';
import AvisClient from './components/avisclient';

import './css/App.css';
import Faq from './components/faq';

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path='/profil' element= {<NewProfilPage/>}/>
        <Route path='/vehicleslist' element= {<VehiclesList/>}/>
        {/* Ajoutez ce Route pour AvisClient après la page d'accueil */}
        <Route path='/avisclient' element= {<AvisClient/>}/>
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
