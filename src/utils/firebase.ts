// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3FcxrXC9pBGajDTSIGfzYFDB-JdWb-tY",
  authDomain: "anime-gallery-98971.firebaseapp.com",
  projectId: "anime-gallery-98971",
  storageBucket: "anime-gallery-98971.appspot.com",
  messagingSenderId: "240408259511",
  appId: "1:240408259511:web:cf1fe5d9cf68b9c84a9632",
  measurementId: "G-FP8VB4P9R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app.name && typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
  logEvent(analytics, 'notification_received');
}
export const storage = getStorage();