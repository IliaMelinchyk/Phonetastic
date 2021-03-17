import firebase from "firebase";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_KEY,
  authDomain: "phone-market-76651.firebaseapp.com",
  databaseURL: "https://phone-market-76651-default-rtdb.firebaseio.com",
  projectId: "phone-market-76651",
  storageBucket: "phone-market-76651.appspot.com",
  messagingSenderId: "21635168216",
  appId: "1:21635168216:web:2f796ff557552d49f7e4ad",
  measurementId: "G-39FHEHZWXJ",
});

export default app;
