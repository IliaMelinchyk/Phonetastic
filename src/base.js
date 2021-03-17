import firebase from "firebase";
import "firebase/storage";

const app = firebase.initializeApp({
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: "https://phone-market-76651-default-rtdb.firebaseio.com",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  locationId: "europe-west",
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export default app;
