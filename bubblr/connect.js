// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2BkiRwgu8RHo1OFWYyVB0ySbJetnPqbo",
  authDomain: "web-app-57597.firebaseapp.com",
  projectId: "web-app-57597",
  storageBucket: "web-app-57597.appspot.com",
  messagingSenderId: "952311391960",
  appId: "1:952311391960:web:5b9091ff999ab79c05d9ad",
  measurementId: "G-WNHDR9BRHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);