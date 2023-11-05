const admin = require("firebase-admin");

// Initialisation du SDK avec la clé privée
const serviceAccount = require("./components/firebase");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://louetacaisse-7b4b9-default-rtdb.europe-west1.firebasedatabase.app"
});

// ID de l'utilisateur que vous souhaitez définir comme administrateur
const userId = "0RXMMXd3ydhQ8x1z6hADReOaaLD2";

// Définition de l'utilisateur comme administrateur
admin.auth().setCustomUserClaims(userId, { isAdmin: true })
  .then(() => {
    console.log("Utilisateur défini comme administrateur avec succès");
  })
  .catch((error) => {
    console.error("Erreur lors de la définition de l'utilisateur comme administrateur :", error);
  });
