const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors'); // Module CORS
const serviceAccount = require('./serviceAccountKey.json');
const vehiculesData = require('./vehicules.json'); // Charger les données JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://louetacaisse-7b4b9-default-rtdb.europe-west1.firebasedatabase.app/', // Remplacez par l'URL de votre base de données Firebase
});

const app = express();
const port = 3001;

// Activer CORS pour autoriser toutes les origines (à ajuster en production)
app.use(cors());

app.use(express.json());

app.post('/api/afficher-vehicules', async (req, res) => {
  const { location, departureDate, returnDate } = req.body;

  // Vérifiez la disponibilité des véhicules pour les dates spécifiées
  const db = admin.database();
  const vehiculesRef = db.ref('vehicules');

  try {
    const snapshot = await vehiculesRef.orderByChild('location').equalTo(location).once('value');

    const vehiculesDisponibles = [];
    
    snapshot.forEach((vehiculeSnapshot) => {
      console.log(vehiculeSnapshot)
      const vehicule = vehiculeSnapshot.val();

      const availableDates = vehicule.availableDates;
      let isAvailable = true;

      const firstDisponobilityDate = new Date(availableDates[0]);
      const lastDisponobilityDate = new Date(availableDates[1]);
      const expectedDepartureDate = new Date(departureDate);

      if(expectedDepartureDate < firstDisponobilityDate || expectedDepartureDate > lastDisponobilityDate){
        isAvailable = false;
      }

      // for (let date = new Date(departureDate); date <= new Date(returnDate); date.setDate(date.getDate() + 1)) {
      //   if (!availableDates[date.toISOString().split('T')[0]]) {
      //     isAvailable = false;
      //     break;
      //   }
      // }

      if (isAvailable) {
        vehiculesDisponibles.push({
          id: vehiculeSnapshot.key,
          label: vehicule.label,
          price: vehicule.price,
          type: vehicule.type,
          year: vehicule.year,
          image: vehiculesData.carOptions[vehiculeSnapshot.key].image,
          disp: vehiculesData.carOptions[vehiculeSnapshot.key].disp,
        });
      }
    });

    if (vehiculesDisponibles.length > 0) {
      res.status(200).json({ message: 'Véhicules disponibles :', vehicules: vehiculesDisponibles });
    } else {
      res.status(404).json({ message: 'Aucun véhicule disponible pour les dates spécifiées.' });
    }
  } catch (error) {
    console.error('Erreur lors de la recherche des véhicules :', error);
    res.status(500).json({ message: 'Erreur lors de la recherche des véhicules.' });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
