import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyATgToZFSp-TEtlo1PVGAHY69zcx-WmdvM",
  authDomain: "louetacaisse-7b4b9.firebaseapp.com",
  databaseURL: "https://louetacaisse-7b4b9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "louetacaisse-7b4b9",
  storageBucket: "louetacaisse-7b4b9.appspot.com",
  messagingSenderId: "651821711871",
  appId: "1:651821711871:web:1cf6ae4907de02e252e7ca",
  measurementId: "G-S4TKGSL3V8"
};
firebase.initializeApp(firebaseConfig);

export default firebase;

export { firebaseConfig };
