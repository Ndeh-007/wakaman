// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC_PFoYlp874jOdCTC3lRL1GkveE2wwojo",
    authDomain: "wakaman-ebb7e.firebaseapp.com",
    projectId: "wakaman-ebb7e",
    storageBucket: "wakaman-ebb7e.appspot.com",
    messagingSenderId: "128192160010",
    appId: "1:128192160010:web:b3220649732245432f5af3",
    measurementId: "G-WWZP2QNTGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const FIRESTORE =  getFirestore(app);

export {app, analytics, FIRESTORE}