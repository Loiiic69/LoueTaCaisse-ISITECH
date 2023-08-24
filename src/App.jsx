import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import firebase from './components/firebase'; // Le chemin doit être correct pour le fichier firebase.js dans src/
import 'firebase/auth';


import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import Voitures from './components/Voitures';
import Header from './components/Header';
import { Blog } from './components/blog';

import './css/App.css';
import ProfilePage from './components/ProfilePage';

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
        <Route path="/voitures" element={<Voitures />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profil" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
