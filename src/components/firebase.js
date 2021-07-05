import firebase from "firebase/app";
import "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAi1CpXDVNwnueo6aU5h-sJQTgkIFiR5L8",
    authDomain: "loginproject-c8a72.firebaseapp.com",
    projectId: "loginproject-c8a72",
    storageBucket: "loginproject-c8a72.appspot.com",
    messagingSenderId: "1097190166111",
    appId: "1:1097190166111:web:a1d336b323f456c26a95ea",
    measurementId: "G-FJ8BCXJDRL"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);