// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import * as firebase from "firebase/analytics";
import { getStorage } from "firebase/storage";
// import { logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "anime-gallery-98971.firebaseapp.com",
  projectId: "anime-gallery-98971",
  storageBucket: "anime-gallery-98971.appspot.com",
  messagingSenderId: "240408259511",
  appId: "1:240408259511:web:cf1fe5d9cf68b9c84a9632",
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const storage = getStorage();