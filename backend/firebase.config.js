// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Import dotenv
import * as dotenv from "dotenv";
dotenv.config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "umat-venue-booking-system.firebaseapp.com",
  projectId: "umat-venue-booking-system",
  storageBucket: "umat-venue-booking-system.appspot.com",
  messagingSenderId: "637972070476",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-1S1HD3LB4M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
