import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCdGANamrn1eqhGSgJUlWTI8S26gHkkR9k",
  authDomain: "images-83737.firebaseapp.com",
  projectId: "images-83737",
  storageBucket: "images-83737.appspot.com",
  messagingSenderId: "496702536217",
  appId: "1:496702536217:web:bfcae304fb36248c08c888",
  measurementId: "G-VLPD38NPTG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

